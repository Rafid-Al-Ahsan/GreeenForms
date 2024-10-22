import { useLocation } from 'react-router-dom';
import { useState } from 'react';
import quiz from '../assets/quiz.jpg'
import survey from '../assets/survey.jpg';
import feedback from '../assets/feedback.jpg';
import analytics from '../assets/analytics.jpg';
import invitation from "../assets/invitation.jpg"
import event from "../assets/event.jpg"

const Form = () => {
  const location = useLocation();
  const { selectedStyle } = location.state || {};
  const [questions, setQuestions] = useState([]);
  const [isPreview, setIsPreview] = useState(false);
  const [previewResponses, setPreviewResponses] = useState({});
  const [title, setTitle] = useState('Untitled Form');  // Add state for title

  const imageMap = {
    "quiz.jpg": quiz,
    "survey.jpg": survey,
    "feedback.jpg": feedback,
    "analytics.jpg": analytics,
    "invitation.jpg": invitation,
    "event.jpg": event,
  };


  // Function to handle adding a new question
  const handleAddQuestion = () => {
    setQuestions([
      ...questions,
      {
        question: '',
        options: ['Option 1', 'Option 2'],
        type: 'multipleChoice',
        multipleAnswers: false,
        isRequired: false,
      },
    ]);
  };

  // Function to delete a question
  const handleDeleteQuestion = (index) => {
    const updatedQuestions = questions.filter((_, qIndex) => qIndex !== index);
    setQuestions(updatedQuestions);
  };

  // Function to move a question up
  const handleMoveUp = (index) => {
    if (index === 0) return; // Cannot move the first question up
    const updatedQuestions = [...questions];
    const temp = updatedQuestions[index - 1];
    updatedQuestions[index - 1] = updatedQuestions[index];
    updatedQuestions[index] = temp;
    setQuestions(updatedQuestions);
  };

  // Function to move a question down
  const handleMoveDown = (index) => {
    if (index === questions.length - 1) return; // Cannot move the last question down
    const updatedQuestions = [...questions];
    const temp = updatedQuestions[index + 1];
    updatedQuestions[index + 1] = updatedQuestions[index];
    updatedQuestions[index] = temp;
    setQuestions(updatedQuestions);
  };

  // Function to update a specific question
  const handleQuestionChange = (index, value) => {
    const updatedQuestions = [...questions];
    updatedQuestions[index].question = value;
    setQuestions(updatedQuestions);
  };

  // Function to update options for a specific question
  const handleOptionChange = (qIndex, oIndex, value) => {
    const updatedQuestions = [...questions];
    updatedQuestions[qIndex].options[oIndex] = value;
    setQuestions(updatedQuestions);
  };

  // Function to add an option to a specific question
  const handleAddOption = (qIndex) => {
    const updatedQuestions = [...questions];
    updatedQuestions[qIndex].options.push(`Option ${updatedQuestions[qIndex].options.length + 1}`);
    setQuestions(updatedQuestions);
  };

  // Function to delete a specific question
  const handleDeleteOption = (qIndex, oIndex) => {
    const updatedQuestions = [...questions];
    updatedQuestions[qIndex].options = updatedQuestions[qIndex].options.filter((_, i) => i !== oIndex);
    setQuestions(updatedQuestions);
  };

  const handleTypeChange = (qIndex, type) => {
    const updatedQuestions = [...questions];
    updatedQuestions[qIndex].type = type;

    if (type === 'text') {
      updatedQuestions[qIndex].options = [];
    } else if (type === 'multipleChoice' || type === 'checkbox' || type === 'dropdown') {
      updatedQuestions[qIndex].options = ['Option 1', 'Option 2'];
    }

    setQuestions(updatedQuestions);
  };

  const toggleIsRequired = (qIndex) => {
    const updatedQuestions = [...questions];
    updatedQuestions[qIndex].isRequired = !updatedQuestions[qIndex].isRequired;
    setQuestions(updatedQuestions);
  };


  // Function to handle preview responses change
  const handlePreviewResponseChange = (qIndex, value) => {
    setPreviewResponses({
      ...previewResponses,
      [qIndex]: value,
    });
  };

  const handleCheckboxChange = (qIndex, option) => {
    const selectedOptions = previewResponses[qIndex] || [];
    const newSelectedOptions = selectedOptions.includes(option)
      ? selectedOptions.filter((opt) => opt !== option)
      : [...selectedOptions, option];

    setPreviewResponses({
      ...previewResponses,
      [qIndex]: newSelectedOptions,
    });
  };

  return (
    <div
      className="p-6"
      style={{
        backgroundImage: `url(${imageMap[selectedStyle?.backgroundImage] || ''})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }}
    >
      <div className="flex justify-between mb-4">
        <button
          onClick={handleAddQuestion}
          className={`p-4 rounded-md shadow-md ${selectedStyle?.buttonStyle || 'bg-gray-200 hover:bg-gray-300'}`}
        >
          Add another question
        </button>
        <button
          onClick={() => setIsPreview(!isPreview)}
          className={`p-4 rounded-md shadow-md ${selectedStyle?.buttonStyle || 'bg-gray-200 hover:bg-gray-300'}`}
        >
          {isPreview ? 'Switch to Edit Mode' : 'Preview'}
        </button>
      </div>



      {/* Wrapping container for the form */}
      <div className="bg-[rgba(255,255,255,.8)] p-6 rounded-lg shadow-lg w-[66%] mx-auto">

        {/* Form Title - inside the form */}
        <div className="mb-6">
          {!isPreview ? (
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}  // Editable title in edit mode
              placeholder="Form Title"
              className="text-2xl font-bold border-b-2 w-full p-2 mb-4"
            />
          ) : (
            <h2 className="text-2xl font-bold mb-4">{title}</h2>
          )}
        </div>




        {questions.map((q, qIndex) => (
          <div key={qIndex} className="p-4 rounded-lg shadow-md mb-4 relative">


            {!isPreview ? (
              <>

               {/* Question Control Buttons (Delete and Swap) */}
               <div className="absolute top-0 right-0 flex space-x-2">
                    <button onClick={() => handleMoveUp(qIndex)} className="p-1 text-gray-500 hover:text-gray-700">
                      ▲
                    </button>
                    <button onClick={() => handleMoveDown(qIndex)} className="p-1 text-gray-500 hover:text-gray-700">
                      ▼
                    </button>
                    <button onClick={() => handleDeleteQuestion(qIndex)} className="p-1 text-red-500 hover:text-red-700">
                      🗑
                    </button>
                  </div> 

                {/* Edit Mode */}
                <div className="flex items-center space-x-2 mb-4">
                  <select
                    value={q.type}
                    onChange={(e) => handleTypeChange(qIndex, e.target.value)}
                    className="border p-2 rounded"
                  >
                    <option value="multipleChoice">Multiple Choice (Radio)</option>
                    <option value="checkbox">Checkbox</option>
                    <option value="text">Text</option>
                    <option value="dropdown">Dropdown</option>
                  </select>
                </div>

                <input
                  type="text"
                  value={q.question}
                  onChange={(e) => handleQuestionChange(qIndex, e.target.value)}
                  placeholder="Question"
                  className="border-b-2 w-full p-2 mb-4"
                />

                {(q.type === 'multipleChoice' || q.type === 'checkbox' || q.type === 'dropdown') && (
                  <div className="space-y-2">
                    {q.options.map((option, oIndex) => (
                      <div key={oIndex} className="flex items-center space-x-2">
                        <input
                          type={q.type === 'checkbox' ? 'checkbox' : 'radio'}
                          className="form-radio bg-[rgba(255,255,255,.1)]"
                          name={`option-${qIndex}`}
                          disabled
                        />
                        <input
                          type="text"
                          value={option}
                          onChange={(e) => handleOptionChange(qIndex, oIndex, e.target.value)}
                          className="border-b-2 flex-grow p-2 "
                        />
                        <button
                          onClick={() => handleDeleteOption(qIndex, oIndex)}
                          className="text-red-500 hover:text-red-700"
                        >
                          🗑️
                        </button>
                      </div>
                    ))}
                    <button
                      onClick={() => handleAddOption(qIndex)}
                      className="text-blue-600 mt-2"
                    >
                      + Add option
                    </button>
                  </div>
                )}

                {q.type === 'text' && (
                  <input
                    type="text"
                    placeholder="User's answer"
                    disabled
                    className="border-b-2 w-full p-2 mt-2"
                  />
                )}

                <label className="flex items-center space-x-2 mt-2">
                  <input
                    type="checkbox"
                    checked={q.isRequired}
                    onChange={() => toggleIsRequired(qIndex)}
                    className="form-checkbox"
                  />
                  <span>Required</span>
                </label>
              </>
            ) : (
              <>
                {/* Preview Mode */}
                <h4 className="font-bold mb-2">
                  {q.question} {q.isRequired && <span className="text-red-500">*</span>}
                </h4>
                {(q.type === 'multipleChoice') && (
                  <div className="space-y-2">
                    {q.options.map((option, oIndex) => (
                      <div key={oIndex} className="flex items-center space-x-2">
                        <input
                          type="radio"
                          name={`preview-option-${qIndex}`}
                          onChange={() => handlePreviewResponseChange(qIndex, option)}
                          checked={previewResponses[qIndex] === option}
                          value={option}
                          className="form-radio"
                        />
                        <span>{option}</span>
                      </div>
                    ))}
                  </div>
                )}

                {q.type === 'checkbox' && (
                  <div className="space-y-2">
                    {q.options.map((option, oIndex) => (
                      <div key={oIndex} className="flex items-center space-x-2">
                        <input
                          type="checkbox"
                          name={`preview-checkbox-${qIndex}`}
                          onChange={() => handleCheckboxChange(qIndex, option)}
                          checked={(previewResponses[qIndex] || []).includes(option)}
                          className="form-checkbox"
                        />
                        <span>{option}</span>
                      </div>
                    ))}
                  </div>
                )}

                {q.type === 'dropdown' && (
                  <select
                    value={previewResponses[qIndex] || ''}
                    onChange={(e) => handlePreviewResponseChange(qIndex, e.target.value)}
                    className="border p-2 rounded w-full"
                  >
                    <option value="" disabled>Select an option</option>
                    {q.options.map((option, oIndex) => (
                      <option key={oIndex} value={option}>
                        {option}
                      </option>
                    ))}
                  </select>
                )}

                {q.type === 'text' && (
                  <input
                    type="text"
                    value={previewResponses[qIndex] || ''}
                    onChange={(e) => handlePreviewResponseChange(qIndex, e.target.value)}
                    placeholder="User's answer"
                    className="border-b-2 w-full p-2 mt-2"
                  />
                )}
              </>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Form;
