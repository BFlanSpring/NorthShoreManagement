import React, { useEffect, useRef, useState } from 'react';
import './LoadUpPage.css';

const LoadUpPage = ({ onVideoEnd }) => {
    const videoRef = useRef(null);
    const [showButton, setShowButton] = useState(false);

    useEffect(() => {
        const video = videoRef.current;

        const handleVideoEnd = () => {
            setShowButton(true);
        };

        const adjustPlaybackSpeed = () => {
            if (video) {
                const duration = video.duration;
                const interval = 50; // Interval in milliseconds
                const speedChangeRate = 0.05; // Amount by which the speed changes per interval
                const endSpeed = 1; // Final speed at the end of the video

                // Calculate when to start slowing down
                const slowdownStart = duration - 2;

                const intervalId = setInterval(() => {
                    const currentTime = video.currentTime;
                    
                    if (currentTime >= slowdownStart) {
                        // Calculate the new playback rate
                        const progress = (currentTime - slowdownStart) / 2; // 2 seconds to slow down
                        const newPlaybackRate = Math.max(endSpeed, 1.5 - progress * speedChangeRate);
                        
                        video.playbackRate = newPlaybackRate;
                    } else {
                        video.playbackRate = 1.5; // Normal speed
                    }

                    if (currentTime >= duration) {
                        clearInterval(intervalId);
                    }
                }, interval);
            }
        };

        const resetVideo = () => {
            if (video) {
                video.currentTime = 0;
                video.play().catch(error => {
                    console.error("Video playback error:", error);
                });
                adjustPlaybackSpeed();
            }
        };

        // Reset video on mount
        resetVideo();

        if (video) {
            video.addEventListener('ended', handleVideoEnd);
        }

        return () => {
            if (video) {
                video.removeEventListener('ended', handleVideoEnd);
            }
        };
    }, []);

    return (
        <div className="intro-video-container">
            <video
                ref={videoRef}
                src="/StartUpScreen.mov"
                autoPlay
                muted
                className="intro-video"
            />
            {showButton && (
                <button className="enter-button" onClick={onVideoEnd}>
                    <span className="text-elevate visible">Amplify Your Strategy</span>
                    <span className="text-started hidden">Embrace Your Future</span>
                </button>
            )}
        </div>
    );
};

export default LoadUpPage;
