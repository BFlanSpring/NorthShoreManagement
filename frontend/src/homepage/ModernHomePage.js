import React, { useEffect, useState } from 'react';
import './ModernHomePage.css';
import TrendingStocks from './TrendingStocks';

const ModernHomePage = () => {
    const [bgOpacity, setBgOpacity] = useState(0);

    useEffect(() => {
        const handleScroll = () => {
            const scrollPosition = window.scrollY;
            const maxScroll = document.documentElement.scrollHeight - window.innerHeight; // Maximum scroll distance
            const newOpacity = Math.min(scrollPosition / maxScroll, 0.7); 
            setBgOpacity(newOpacity);
        };

        window.addEventListener('scroll', handleScroll);
        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);

    return (
        <div>
            <div className="video-container">
                <video autoPlay muted loop>
                    <source src="/HomePageAnimation.mp4" type="video/mp4" />
                    Your browser does not support the video tag.
                </video>
            </div>
            <div className="gradient-overlay"></div>
            <div
                className="content"
                style={{ backgroundColor: `rgba(0, 0, 0, ${bgOpacity})` }}
            >
                <h1 className="company-motto">Harness Data, Unlock Potential</h1>
                <p className="company-motto-p">Scroll down to see more content...</p>
            </div>
            <TrendingStocks />
        </div>
    );
};

export default ModernHomePage;