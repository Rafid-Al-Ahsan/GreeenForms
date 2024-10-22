import { FaChevronUp, FaChevronDown } from 'react-icons/fa';
import img1 from '../assets/Assessment.png';
import img2 from '../assets/ContactInformation.png';
import img3 from '../assets/CustomerFeedback.png';
import img4 from '../assets/RSVP.png';
import styles from '../templateStyles.json';
import { v4 as uuidv4 } from 'uuid';
import { useNavigate } from 'react-router-dom';

const Header = () => {
  const navigate = useNavigate();

  const handleTemplateClick = (templateId) => {
    const id = uuidv4();
    const selectedStyle = styles[templateId];
    navigate(`/form/${templateId}/${id}`, { state: { selectedStyle } });
  };

  return (
    <div className="relative w-full sm:h-auto bg-[#F1F3F4] flex items-center">
      <div className="flex flex-wrap justify-center gap-4 lg:gap-20 w-full p-4">
        <div className="flex flex-col items-center w-[120px] sm:w-[140px] md:w-[160px]">
          <button
            onClick={() => handleTemplateClick('assessment')}
            className="w-full bg-white rounded-md shadow-md hover:shadow-lg transform hover:scale-105 transition-transform duration-200"
          >
            <img src={img1} alt="Assessment form" className="w-full h-[80px] sm:h-[100px] object-cover rounded-t-md" />
          </button>
          <p className="text-xs sm:text-sm md:text-base text-gray-700 font-medium mt-2">Assessment</p>
        </div>
        <div className="flex flex-col items-center w-[120px] sm:w-[140px] md:w-[160px]">
          <button
            onClick={() => handleTemplateClick('contact-info')}
            className="w-full bg-white rounded-md shadow-md hover:shadow-lg transform hover:scale-105 transition-transform duration-200"
          >
            <img src={img2} alt="Contact Information form" className="w-full h-[80px] sm:h-[100px] object-cover rounded-t-md" />
          </button>
          <p className="text-xs sm:text-sm md:text-base text-gray-700 font-medium mt-2">Contact Info</p>
        </div>
        <div className="flex flex-col items-center w-[120px] sm:w-[140px] md:w-[160px]">
          <button
            onClick={() => handleTemplateClick('customer-feedback')}
            className="w-full bg-white rounded-md shadow-md hover:shadow-lg transform hover:scale-105 transition-transform duration-200"
          >
            <img src={img3} alt="Customer Feedback form" className="w-full h-[80px] sm:h-[100px] object-cover rounded-t-md" />
          </button>
          <p className="text-xs sm:text-sm md:text-base text-gray-700 font-medium mt-2">Customer Feedback</p>
        </div>
        <div className="flex flex-col items-center w-[120px] sm:w-[140px] md:w-[160px]">
          <button
            onClick={() => handleTemplateClick('rsvp')}
            className="w-full bg-white rounded-md shadow-md hover:shadow-lg transform hover:scale-105 transition-transform duration-200"
          >
            <img src={img4} alt="RSVP form" className="w-full h-[80px] sm:h-[100px] object-cover rounded-t-md" />
          </button>
          <p className="text-xs sm:text-sm md:text-base text-gray-700 font-medium mt-2">RSVP</p>
        </div>
      </div>
      {/* Chevron icons placed at the top-right */}
      <div className="absolute top-[15%] right-0 flex flex-col p-1">
        <button className="p-1 bg-white rounded-full shadow-md hover:bg-gray-200 transition-all">
          <FaChevronUp className="h-6 w-6 text-gray-500" />
        </button>
        <button className="p-1 bg-white rounded-full shadow-md hover:bg-gray-200 transition-all mt-2">
          <FaChevronDown className="h-6 w-6 text-gray-500" />
        </button>
      </div>
    </div>
  );
};

export default Header;
