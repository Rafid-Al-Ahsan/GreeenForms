import { useState } from 'react';

const Form = () => {
  const [questions, setQuestions] = useState([]);
  const [isPreview, setIsPreview] = useState(false);
  const [previewResponses, setPreviewResponses] = useState({});

  const handleAddQuestion = () => {
    setQuestions([
      ...questions,
      {
        question: '',
        options: ['Option 1', 'Option 2'],
        type: 'multipleChoice', // Default to 'multipleChoice'
        multipleAnswers: false,
        isRequired: false,
      },
    ]);
  };

  const handleQuestionChange = (index, value) => {
    const updatedQuestions = [...questions];
    updatedQuestions[index].question = value;
    setQuestions(updatedQuestions);
  };

  const handleOptionChange = (qIndex, oIndex, value) => {
    const updatedQuestions = [...questions];
    updatedQuestions[qIndex].options[oIndex] = value;
    setQuestions(updatedQuestions);
  };

  const handleAddOption = (qIndex) => {
    const updatedQuestions = [...questions];
    updatedQuestions[qIndex].options.push(`Option ${updatedQuestions[qIndex].options.length + 1}`);
    setQuestions(updatedQuestions);
  };

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
    <div className="p-6">
      <div className="flex justify-between mb-4">
        <button
          onClick={handleAddQuestion}
          className="bg-gray-100 p-4 rounded-md shadow-md hover:bg-gray-200"
        >
          Add another question
        </button>
        <button
          onClick={() => setIsPreview(!isPreview)}
          className={`p-4 rounded-md shadow-md ${isPreview ? 'bg-blue-100 hover:bg-blue-200' : 'bg-gray-100 hover:bg-gray-200'}`}
        >
          {isPreview ? 'Switch to Edit Mode' : 'Preview'}
        </button>
      </div>

      {questions.map((q, qIndex) => (
        <div key={qIndex} className="bg-white p-4 rounded-lg shadow-md mb-4">
          {!isPreview ? (
            <>
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
                        className="form-radio"
                        name={`option-${qIndex}`}
                        disabled
                      />
                      <input
                        type="text"
                        value={option}
                        onChange={(e) => handleOptionChange(qIndex, oIndex, e.target.value)}
                        className="border-b-2 flex-grow p-2"
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
  );
};

export default Form;
