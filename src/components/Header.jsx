import { useState, useEffect, useContext } from 'react';
import { FaChevronUp, FaChevronDown } from 'react-icons/fa';
import img1 from '../assets/quizheader.png';
import img2 from '../assets/surveyheader.png';
import img3 from '../assets/feedbackheader.png';
import img4 from '../assets/analyticsheader.png';
import img5 from '../assets/invitationheader.jpg.png';
import img6 from '../assets/eventheader.png';
import styles from '../templateStyles.json';
import { v4 as uuidv4 } from 'uuid';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../provider/AuthProvider';
import axios from 'axios';

const Header = () => {
    const navigate = useNavigate();
    const { user } = useContext(AuthContext);
    const [likeStatuses, setLikeStatuses] = useState({});
    const [likeCounts, setLikeCounts] = useState({});  // New state for like counts
    const [showAllTemplates, setShowAllTemplates] = useState(false);

    const templates = [
        { id: 'quiz', img: img1, label: 'Quiz' },
        { id: 'survey', img: img2, label: 'Survey' },
        { id: 'feedback', img: img3, label: 'Feedback' },
        { id: 'analytics', img: img4, label: 'Analytics' },
        { id: 'invitation', img: img5, label: 'Invitation' },
        { id: 'event', img: img6, label: 'Event' }
    ];

    useEffect(() => {
        // Fetch like statuses and counts for each template
        const fetchLikesData = async () => {
            try {
                const promises = templates.map(async (template) => {
                    const response = await axios.get(`http://localhost:5000/template/like/${template.id}`);
                    const templateData = response.data[0] || { likeCount: 0 };
                    return { templateId: template.id, likeCount: templateData.likeCount };
                });

                const results = await Promise.all(promises);
                const likeCounts = results.reduce((acc, { templateId, likeCount }) => {
                    acc[templateId] = likeCount;
                    return acc;
                }, {});

                setLikeCounts(likeCounts);

                const response = await axios.get(`http://localhost:5000/api/like-status/${user.email}`);
                const likedTemplates = response.data[0]?.likedTemplates || [];

                // Create an object mapping each template to its liked status
                const likeStatuses = templates.reduce((acc, template) => {
                    acc[template.id] = likedTemplates.includes(template.id);
                    return acc;
                }, {});

                setLikeStatuses(likeStatuses);
            } catch (error) {
                console.error('Error fetching like counts:', error);
            }
        };

        if (user) {
            fetchLikesData();
        }
    }, [user, templates]);

    const handleLikeClick = async (templateId) => {
        if (!user) return;

        try {
            if (likeStatuses[templateId]) {
                // Unlike the template
                await axios.post('http://localhost:5000/api/unlike', { templateId, email: user.email });
                setLikeStatuses((prev) => ({ ...prev, [templateId]: false }));
                setLikeCounts((prev) => ({ ...prev, [templateId]: prev[templateId] - 1 }));
            } else {
                // Like the template
                await axios.post('http://localhost:5000/api/like', { templateId, email: user.email });
                setLikeStatuses((prev) => ({ ...prev, [templateId]: true }));
                setLikeCounts((prev) => ({ ...prev, [templateId]: prev[templateId] + 1 }));
            }
        } catch (error) {
            console.error('Error updating like status:', error);
        }
    };

    const handleTemplateClick = (templateId) => {
        const id = uuidv4();
        const selectedStyle = styles[templateId];
        navigate(`/form/${templateId}/${id}`, { state: { selectedStyle } });
    };

    const displayedTemplates = showAllTemplates ? templates : templates.slice(0, 4);

    return (
        <div className="relative w-full sm:h-auto bg-[#F1F3F4] flex items-center">
            <div className="flex flex-wrap justify-center gap-4 lg:gap-20 lg:w-[60%] mx-auto p-4">
                {displayedTemplates.map((template) => (
                    <div key={template.id} className="flex flex-col items-center w-[120px] sm:w-[140px] md:w-[160px]">
                        <button
                            onClick={() => handleTemplateClick(template.id)}
                            className="w-full bg-white rounded-md shadow-md hover:shadow-lg transform hover:scale-105 transition-transform duration-200"
                        >
                            <img src={template.img} alt={`${template.label} form`} className="w-full h-[80px] sm:h-[100px] object-cover rounded-t-md" />
                        </button>
                        <p className="text-xs sm:text-sm md:text-base text-gray-700 font-medium mt-2">{template.label}</p>
                        {/* <p className="text-sm text-gray-600">Likes: {likeCounts[template.id] || 0}</p> Display like count */}
                        <button
                            className={`mt-2 px-4 py-2 rounded-md ${likeStatuses[template.id] ? 'bg-blue-600 text-white' : 'bg-gray-300 text-gray-700'}`}
                            onClick={() => handleLikeClick(template.id)}
                        >
                             {likeStatuses[template.id] ? 'Liked' : 'Like'} ({likeCounts[template.id] || 0})
                        </button>
                    </div>
                ))}
            </div>

            <div className="absolute top-[15%] right-0 flex flex-col p-1">
                {showAllTemplates ? (
                    <button
                        onClick={() => setShowAllTemplates(false)}
                        className="p-1 bg-white rounded-full shadow-md hover:bg-gray-200 transition-all"
                    >
                        <FaChevronUp className="h-6 w-6 text-gray-500" />
                    </button>
                ) : (
                    <button
                        onClick={() => setShowAllTemplates(true)}
                        className="p-1 bg-white rounded-full shadow-md hover:bg-gray-200 transition-all mt-2"
                    >
                        <FaChevronDown className="h-6 w-6 text-gray-500" />
                    </button>
                )}
            </div>
        </div>
    );
};

export default Header;
