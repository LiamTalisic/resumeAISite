import React, { useEffect } from 'react';

const Background = () => {

    useEffect(() => {
        const interBubble = document.querySelector('.interactive');

        if (!interBubble) return;

        let curX = 0, curY = 0, tgx = 0, tgy = 0;   
        let easing = 20; // larger value = slower movement 

        function move() {
            curX += (tgx - curX) / easing;
            curY += (tgy - curY) / easing;

            interBubble.style.transform = `translate(${Math.round(curX)}px, ${Math.round(curY)}px)`;
            requestAnimationFrame(() => { move(); });
        }

        const handleMouseMove = (e) => {
            tgx = e.clientX;
            tgy = e.clientY;
        };

        window.addEventListener('mousemove', handleMouseMove);
        move();
        return () => {
            window.removeEventListener('mousemove', handleMouseMove);
        };
    }, []);

    return (
        <div className="gradient-bg">
            <svg xmlns="http://www.w3.org/2000/svg">
                <defs>
                    <filter id="goo">
                        <feGaussianBlur in="SourceGraphic" stdDeviation="10" result="blur" />
                        <feColorMatrix in="blur" mode="matrix" values="
                            1 0 0 0 0  
                            0 1 0 0 0  
                            0 0 1 0 0  
                            0 0 0 18 -8" result="goo" />
                        {/* mult 18, -8 are the most important as they represent alpha channels  */}

                        <feBlend in="SourceGraphic" in2="goo" />

                    </filter>
                </defs>
                
            </svg>

            <div className="gradients-container">
                <div className="g1"></div>
                <div className="g2"></div>
                <div className="g3"></div>
                <div className="g4"></div>
                <div className="g5"></div>

                <div className="interactive"></div>
            </div>
        </div>
    );
};

export default Background;
