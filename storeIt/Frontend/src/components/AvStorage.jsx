import React from 'react'
import { useState, useEffect } from 'react'

const AvStorage = () => {
    const [score, setScore] = useState(0);        // Fetched score
    const [displayScore, setDisplayScore] = useState(0);  // For animation

    // Simulated fetch from backend
    useEffect(() => {
        const fetchScore = async () => {
            // Simulate a backend response
             const response = await new Promise((res) => setTimeout(() => res(75), 300));
      setScore(response);
        };

        fetchScore();
    }, []);

    // Animate from 0 to score
    useEffect(() => {
        let animationFrame;
        let start = 0;

        const animate = () => {
            start += 1;
            if (start <= score) {
                setDisplayScore(start);
                animationFrame = requestAnimationFrame(animate);
            } else {
                cancelAnimationFrame(animationFrame);
            }
        };

        animate();

        return () => cancelAnimationFrame(animationFrame);
    }, [score]);

    // Convert score (0–100) to stroke-dasharray format
    const dash = `${(displayScore * 0.75).toFixed(2)} 100`; // Max 75% fill

    return (
        <section className='flex justify-center items-center gap-4'>
            <div className="relative size-40">
                <svg className="rotate-[135deg] size-full" viewBox="0 0 36 36" xmlns="http://www.w3.org/2000/svg">
                    {/* Background Circle */}
                    <circle
                        cx="18"
                        cy="18"
                        r="16"
                        fill="none"
                        className="stroke-current text-green-200 dark:text-neutral-700"
                        strokeWidth="2"
                        strokeDasharray="75 100"
                        strokeLinecap="round"
                    />

                    {/* Gauge Progress */}
                    <circle
                        cx="18"
                        cy="18"
                        r="16"
                        fill="none"
                        className="stroke-current text-indigo-500 dark:text-indigo-500 transition-all duration-300"
                        strokeWidth="3"
                        strokeDasharray={dash}
                        strokeLinecap="round"
                    />
                </svg>

                {/* Score Text */}
                <div className="absolute top-1/2 start-1/2 transform -translate-x-1/2 -translate-y-1/2 text-center">
                    <span className="text-4xl font-bold text-indigo-600 dark:text-indigo-500">{displayScore}</span>
                    <span className="text-indigo-600 dark:text-indigo-500 block">Score</span>
                </div>
            </div>
            <div>
                <p>Available Storage</p>
                <p>82GB / 128GB</p>
            </div>
        </section>
    )
}

export default AvStorage
