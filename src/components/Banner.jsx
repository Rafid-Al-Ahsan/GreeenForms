import { useEffect } from 'react';
import AOS from 'aos';
import 'aos/dist/aos.css';
import img1 from '../assets/slider4.jpg';
import { IoMdCheckmarkCircleOutline } from "react-icons/io";
import { Link } from 'react-router-dom';

const Banner = () => {
    useEffect(() => {
        AOS.init({
            disable: false,
            startEvent: 'DOMContentLoaded',
            initClassName: 'aos-init',
            animatedClassName: 'aos-animate',
            useClassNames: false,
            disableMutationObserver: false,
            debounceDelay: 50,
            throttleDelay: 99,
            offset: 120,
            delay: 500,
            duration: 900,
            easing: 'ease',
            once: true,
            mirror: false,
            anchorPlacement: 'top-bottom',
        });
    }, []);

    return (
        <div className='relative h-[600px] md:h-[500px] lg:h-[600px] flex items-center'>
            <img src={img1} alt="banner picture" className='w-full h-full object-cover' />
            <div className='absolute inset-0 flex items-start justify-start px-10 mt-16'>
                <div
                    className='bg-teal-500 bg-opacity-90 text-white p-8 md:p-10 rounded-lg space-y-5 max-w-md'
                    data-aos="fade-right"
                >
                    <h2 className='text-3xl md:text-4xl font-bold'>Green Forms</h2>
                    <p className='text-sm md:text-lg'>
                        Get your surveys, quizzes, and registration forms done with one click.
                    </p>
                    <p className='text-sm md:text-base'>Simple and easy to use.</p>
                    <div className='flex gap-3'>
                        <p className="font-semibold py-2 rounded-lg sm:text-sm md:text-md flex items-center gap-2"><IoMdCheckmarkCircleOutline className='h-8 w-8' />100% User Satisfaction</p>
                        <p className="font-semibold py-2 rounded-lg sm:text-sm md:text-md flex items-center gap-2"><IoMdCheckmarkCircleOutline className='h-8 w-8' />Great User Experience</p>
                    </div>

                    <div>
                        <Link to="/registration">  <button className="bg-white text-teal-600 font-semibold px-5 py-2 rounded hover:bg-gray-100 transition-all duration-300">
                            Try for free
                        </button>
                        </Link>
                    </div>

                </div>
            </div>
        </div>
    );
};

export default Banner;
