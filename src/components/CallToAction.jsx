import { Link } from "react-router-dom";

const CallToAction = () => {
    return (
        <div className="bg-teal-900 text-white py-16 px-6 flex flex-col items-center text-center">
            <h2 className="text-4xl font-bold mb-4">Ready to get started?</h2>
            <p className="text-lg max-w-xl mb-8">
                Join the 300K+ organizations using Green Forms globally to get game-changing insights.
            </p>
            <Link to="/registration"> <button className="bg-teal-500 hover:bg-teal-600 text-white font-semibold py-3 px-6 rounded-md transition duration-300">
                Sign up free
            </button></Link>
        </div>
    );
};

export default CallToAction;
