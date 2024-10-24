import img1 from "../assets/surveyheader.png";
import img2 from "../assets/invitationheader.jpg.png";
import img3 from "../assets/analyticsheader.png";

const AnimationSection = () => {
    return (
        <div className="flex flex-col md:flex-row w-[90%] lg:w-[80%] mx-auto items-center justify-center min-h-screen py-10 bg-white gap-6">
            <div className="w-full md:w-[50%]">
                <div className="relative w-full h-[200px] sm:h-[250px] md:w-[400px] md:h-[300px] lg:w-[510px] lg:h-[320px] overflow-hidden">
                    <img
                        src={img1}
                        alt="Image 1"
                        className="absolute top-0 left-0 w-full h-full object-cover opacity-0 animate-cycle"
                        style={{ animationDelay: "0s" }}
                    />
                    <img
                        src={img2}
                        alt="Image 2"
                        className="absolute top-0 left-0 w-full h-full object-cover opacity-0 animate-cycle"
                        style={{ animationDelay: "3s" }}
                    />
                    <img
                        src={img3}
                        alt="Image 3"
                        className="absolute top-0 left-0 w-full h-full object-cover opacity-0 animate-cycle"
                        style={{ animationDelay: "6s" }}
                    />
                </div>
            </div>

            <div className="w-full md:w-[50%] mt-6 md:mt-0 text-left">
                <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900">
                    The all-in-one platform for surveys, forms, and market research
                </h2>
                <p className="mt-4 text-base sm:text-lg text-gray-600">
                    Green Forms makes it quick and easy to ask the right questions the right way, and get fast and powerful insights that help you delight your customers, build a happy and productive workforce, and win in your market.
                </p>
                <button className="mt-6 px-4 py-2 sm:px-5 sm:py-3 text-xs sm:text-sm font-medium text-white bg-gray-800 rounded-full hover:bg-gray-700 transition">
                    Get product overview
                </button>
            </div>
        </div>
        
    );
};

export default AnimationSection;
