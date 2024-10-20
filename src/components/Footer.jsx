import { useState } from 'react';

export default function Footer() {
    const [openSection, setOpenSection] = useState(null);

    const toggleSection = (section) => {
        setOpenSection(openSection === section ? null : section);
    };

    return (
        <footer className="bg-white text-gray-800 p-6 md:px-10 lg:px-20">
            {/* Desktop View */}
            <div className="hidden md:grid md:grid-cols-5 md:gap-8">
                <div>
                    <h4 className="font-bold mb-3">Product</h4>
                    <ul className="space-y-1">
                        <li>Overview</li>
                        <li>Surveys</li>
                        <li>Online Forms</li>
                        <li>Market Research</li>
                        <li>Integrations</li>
                        <li>SurveyMonkey Genius</li>
                        <li>Enterprise</li>
                        <li>Pricing</li>
                    </ul>
                </div>
                <div>
                    <h4 className="font-bold mb-3">Popular Templates</h4>
                    <ul className="space-y-1">
                        <li>Customer Satisfaction</li>
                        <li>Employee Engagement</li>
                        <li>Event Feedback</li>
                        <li>Product Testing</li>
                        <li>Net Promoter Score (NPS)</li>
                        <li>Course Evaluation</li>
                        <li>All Templates</li>
                    </ul>
                </div>
                <div>
                    <h4 className="font-bold mb-3">Resources</h4>
                    <ul className="space-y-1">
                        <li>Customers</li>
                        <li>Blog</li>
                        <li>Resource Center</li>
                        <li>Support</li>
                        <li>Contact Sales</li>
                    </ul>
                </div>
                <div>
                    <h4 className="font-bold mb-3">Learn</h4>
                    <ul className="space-y-1">
                        <li>How to create surveys</li>
                        <li>NPS calculator</li>
                        <li>Margin of error calculator</li>
                        <li>Sample size calculator</li>
                        <li>AB test significance calculator</li>
                        <li>Likert scale</li>
                        <li>Online quizzes</li>
                        <li>Survey best practices</li>
                    </ul>
                </div>
                <div>
                    <h4 className="font-bold mb-3">About</h4>
                    <ul className="space-y-1">
                        <li>Leadership Team</li>
                        <li>Newsroom</li>
                        <li>Vision and Mission</li>
                        <li>Diversity, Equity & Inclusion</li>
                        <li>Careers <span className="bg-green-200 text-green-800 px-2 rounded-md">Hiring</span></li>
                        <li>Locations</li>
                        <li>Imprint</li>
                        <li>Log in</li>
                        <li>Sign up</li>
                    </ul>
                </div>
            </div>

            {/* Mobile View */}
            <div className="md:hidden">
                {['Product', 'Popular Templates', 'Resources', 'Learn', 'About'].map((section) => (
                    <div key={section} className="mb-4">
                        <button
                            className="flex justify-between items-center w-full font-bold text-left"
                            onClick={() => toggleSection(section)}
                        >
                            {section}
                            <span>{openSection === section ? '-' : '+'}</span>
                        </button>
                        {openSection === section && (
                            <ul className="mt-2 space-y-1">
                                {section === 'Product' && (
                                    <>
                                        <li>Overview</li>
                                        <li>Surveys</li>
                                        <li>Online Forms</li>
                                        <li>Market Research</li>
                                        <li>Integrations</li>
                                        <li>SurveyMonkey Genius</li>
                                        <li>Enterprise</li>
                                        <li>Pricing</li>
                                    </>
                                )}
                                {section === 'Popular Templates' && (
                                    <>
                                        <li>Customer Satisfaction</li>
                                        <li>Employee Engagement</li>
                                        <li>Event Feedback</li>
                                        <li>Product Testing</li>
                                        <li>Net Promoter Score (NPS)</li>
                                        <li>Course Evaluation</li>
                                        <li>All Templates</li>
                                    </>
                                )}
                                {section === 'Resources' && (
                                    <>
                                        <li>Customers</li>
                                        <li>Blog</li>
                                        <li>Resource Center</li>
                                        <li>Support</li>
                                        <li>Contact Sales</li>
                                    </>
                                )}
                                {section === 'Learn' && (
                                    <>
                                        <li>How to create surveys</li>
                                        <li>NPS calculator</li>
                                        <li>Margin of error calculator</li>
                                        <li>Sample size calculator</li>
                                        <li>AB test significance calculator</li>
                                        <li>Likert scale</li>
                                        <li>Online quizzes</li>
                                        <li>Survey best practices</li>
                                    </>
                                )}
                                {section === 'About' && (
                                    <>
                                        <li>Leadership Team</li>
                                        <li>Newsroom</li>
                                        <li>Vision and Mission</li>
                                        <li>Diversity, Equity & Inclusion</li>
                                        <li>Careers <span className="bg-green-200 text-green-800 px-2 rounded-md">Hiring</span></li>
                                        <li>Locations</li>
                                        <li>Imprint</li>
                                        <li>Log in</li>
                                        <li>Sign up</li>
                                    </>
                                )}
                            </ul>
                        )}
                    </div>
                ))}
            </div>

            <div className="mt-6 flex justify-between items-center">
                <div className="flex space-x-4">
                    {/* Social Icons */}
                    <a href="#" className="text-gray-600"><i className="fab fa-linkedin"></i></a>
                    <a href="#" className="text-gray-600"><i className="fab fa-youtube"></i></a>
                    <a href="#" className="text-gray-600"><i className="fab fa-instagram"></i></a>
                    <a href="#" className="text-gray-600"><i className="fab fa-facebook"></i></a>
                    <a href="#" className="text-gray-600"><i className="fab fa-twitter"></i></a>
                </div>
                <div className="text-sm text-gray-500">
                    © 1999-2024 SurveyMonkey
                </div>
            </div>
        </footer>
    );
}
