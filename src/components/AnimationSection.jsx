import { motion } from 'framer-motion';


const AnimationSection = () => {

    return (
        <div className="flex flex-row w-[80%] mx-auto items-center justify-center min-h-screen py-10 bg-white gap-6">

            {/* <div className="w-[50%] flex items-center justify-center gap-6">
                    {['Survey 1', 'Survey 2', 'Survey 3'].map((text, index) => (
                        <motion.div
                            key={index}
                            initial={{ scale: 1 }}
                            animate={{ scale: [1, 0, 1] }} // Scale down and back up
                            transition={{
                                duration: 2, // Adjust the duration for slower or faster animation
                                repeat: Infinity,
                                repeatType: 'mirror',
                            }}
                            className="rounded-md shadow-lg"
                        >
                            <img
                                src={`https://via.placeholder.com/200x100?text=${text}`}
                                alt={text}
                                className="rounded-md"
                            />
                        </motion.div>
                    ))}
                </div> */}
            {/* <div className="w-[50%] relative flex items-center justify-center">
                {['Survey 1', 'Survey 2', 'Survey 3'].map((text, index) => (
                    <motion.div
                        key={index}
                        initial={{ scale: 1 }}
                        animate={{ scale: [1, 0.9, 1] }} // Scale down slightly and back up
                        transition={{
                            duration: 2, // Adjust the duration for slower or faster animation
                            repeat: Infinity,
                            repeatType: 'mirror',
                            delay: index * 0.5, // Add delay to each for staggered animations
                        }}
                        className={`absolute rounded-md shadow-lg`}
                        style={{
                            top: `${index * 50}px`, // Adjust the top position to create a wider vertical gap
                            left: `${index * 60}px`, // Adjust the left position to create a wider horizontal gap
                            zIndex: index, // Control the stacking order
                        }}
                    >
                        <img
                            src={`https://via.placeholder.com/200x100?text=${text}`}
                            alt={text}
                            className="rounded-md"
                        />
                    </motion.div>
                ))}
            </div> */}

<div className="w-[50%] relative flex items-center justify-center">
    {['Survey 1', 'Survey 2', 'Survey 3'].map((text, index) => (
        <motion.div
            key={index}
            initial={{ scale: 1 }}
            animate={{ scale: [1, 0.95, 1] }} // Slight animation scale effect
            transition={{
                duration: 2,
                repeat: Infinity,
                repeatType: 'mirror',
                delay: index * 0.5, // Stagger the animation
            }}
            className={`absolute rounded-md shadow-lg`}
            style={{
                top: `${index * 10}px`,  // Closer vertical stacking
                left: `${index * 30}px`, // Small horizontal offset for layering
                zIndex: index,           // Stack in correct order
            }}
        >
            <div className="bg-gray-200 p-4">{text}</div> {/* Sample content */}
        </motion.div>
    ))}
</div>



            <div className="w-[50%] mt-12 text-left">
                <h2 className="text-3xl md:text-5xl font-bold text-gray-900">
                    The all-in-one platform for surveys, forms, and market research
                </h2>
                <p className="mt-4 text-lg text-gray-600">
                    Green Forms makes it quick and easy to ask the right questions the right way, and get fast and powerful insights that help you delight your customers, build a happy and productive workforce, and win in your market.
                </p>
                <button className="mt-6 px-5 py-3 text-sm font-medium text-white bg-gray-800 rounded-full hover:bg-gray-700 transition">
                    Get product overview
                </button>
            </div>
        </div>

    );
};

export default AnimationSection;