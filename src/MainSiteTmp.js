import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Footer, Possibility, Features, WhatRR, Header } from './containers';
import { Ad } from './components';
import NavbarTmp from './components/navbar/NavbarTmp';
import RotatingIcons from './components/rotatingIcons/RotatingIcons';
import InfoContainer from './components/infoContainer/InfoContainer';
import InfoContainer2 from './components/infoContainer2/InfoContainer2';
import { ProCard } from './components/tamagui/pro-card';
import './App.css';

const MainSite = () => {
    const navigate = useNavigate();

    useEffect(() => {
        const canvas = document.getElementById('background-canvas');
        const ctx = canvas.getContext('2d');

        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;

        const particlesArray = [];
        const mouse = {
            x: null,
            y: null,
            radius: 100, // Promień wpływu myszy
        };

        // Update mouse position
        window.addEventListener('mousemove', (event) => {
            mouse.x = event.x;
            mouse.y = event.y;
        });

        class Particle {
            constructor(x, y, size, color, speedX, speedY) {
                this.x = x;
                this.y = y;
                this.size = size;
                this.color = color;
                this.speedX = speedX;
                this.speedY = speedY;
                this.originalSpeedX = speedX; // Zapamiętaj pierwotną prędkość
                this.originalSpeedY = speedY; // Zapamiętaj pierwotną prędkość
            }

            draw() {
                ctx.beginPath();
                ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
                ctx.fillStyle = this.color;
                ctx.shadowBlur = 20;
                ctx.shadowColor = this.color;
                ctx.fill();
            }

            update() {
                this.x += this.speedX;
                this.y += this.speedY;

                // Bounce off edges
                if (this.x < 0 || this.x > canvas.width) this.speedX *= -1;
                if (this.y < 0 || this.y > canvas.height) this.speedY *= -1;

                // Interactivity with mouse
                const dx = mouse.x - this.x;
                const dy = mouse.y - this.y;
                const distance = Math.sqrt(dx * dx + dy * dy);

                if (distance < mouse.radius) {
                    const angle = Math.atan2(dy, dx);
                    const force = (mouse.radius - distance) / mouse.radius;
                    const forceX = Math.cos(angle) * force * 0.5; // Siła odpychania w X
                    const forceY = Math.sin(angle) * force * 0.5; // Siła odpychania w Y
                    this.speedX -= forceX;
                    this.speedY -= forceY;
                } else {
                    // Powrót do pierwotnej prędkości
                    this.speedX += (this.originalSpeedX - this.speedX) * 0.05; // Powolny powrót do X
                    this.speedY += (this.originalSpeedY - this.speedY) * 0.05; // Powolny powrót do Y
                }
            }
        }

        function initParticles() {
            particlesArray.length = 0;
            const numberOfParticles = 15; // Liczba cząstek
            for (let i = 0; i < numberOfParticles; i++) {
                const size = Math.random() * 5 + 2;
                const x = Math.random() * canvas.width;
                const y = Math.random() * canvas.height;
                const color = 'white'; // Stały kolor (biały)
                const speedX = Math.random() * 1 - 0.5;
                const speedY = Math.random() * 1 - 0.5;
                particlesArray.push(new Particle(x, y, size, color, speedX, speedY));
            }
        }

        function animateParticles() {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            particlesArray.forEach((particle) => {
                particle.update();
                particle.draw();
            });
            requestAnimationFrame(animateParticles);
        }

        initParticles();
        animateParticles();

        // Resize canvas on window resize
        window.addEventListener('resize', () => {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
            initParticles();
        });
    }, []);


    return (
        <div id="animation-container">
            <canvas id="background-canvas"></canvas>
            <div className="main-content">
                <NavbarTmp />
                <Header />
                <RotatingIcons />
                <InfoContainer2 />
                <WhatRR />
                <Ad />
                <div className="middle yes" id="pro">
                    <ProCard />
                </div>
                <Features />
                <InfoContainer />
                <Possibility />
                <Footer />
            </div>
        </div>
    );
};

export default MainSite;
