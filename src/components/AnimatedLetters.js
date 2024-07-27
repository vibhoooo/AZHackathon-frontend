import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet';

const AnimatedLetters = ({ text }) => {
    const [displayedText, setDisplayedText] = useState('');
    const [index, setIndex] = useState(0);

    useEffect(() => {
        const interval = setInterval(() => {
            setDisplayedText((prev) => prev + text[index]);
            setIndex((prevIndex) => prevIndex + 1);
        }, 100);

        if (index >= text.length) {
            clearInterval(interval);
        }

        return () => clearInterval(interval);
    }, [index, text]);

    return (
        <div className="animated-letters-container">
            <Helmet>
                <link rel="preconnect" href="https://fonts.googleapis.com" />
                <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin />
                <link href="https://fonts.googleapis.com/css2?family=League+Gothic&family=Oswald:wght@200..700&display=swap" rel="stylesheet" />
            </Helmet>
            <h1 className="animated-letters">
                {displayedText}
                <span className="cursor">|</span>
            </h1>
        </div>
    );
};

export default AnimatedLetters;
