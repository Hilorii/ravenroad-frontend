import React, { useEffect } from 'react';

const AnimatedBackground = () => {
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

        // Aktualizacja pozycji myszy
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
                this.originalSpeedX = speedX; // Zapamiętaj początkową prędkość
                this.originalSpeedY = speedY;
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

                // Teleportacja w poziomie (wrap-around)
                if (this.x + this.size < 0) {
                    // Jeżeli cząstka wyszła poza lewą krawędź,
                    // to przenieś ją na prawą z uwzględnieniem promienia
                    this.x = canvas.width + this.size;
                } else if (this.x - this.size > canvas.width) {
                    // Jeżeli cząstka wyszła poza prawą krawędź,
                    // to przenieś ją na lewą
                    this.x = -this.size;
                }

                // Teleportacja w pionie (wrap-around)
                if (this.y + this.size < 0) {
                    // Jeżeli cząstka wyszła poza górną krawędź,
                    // to przenieś ją na dół
                    this.y = canvas.height + this.size;
                } else if (this.y - this.size > canvas.height) {
                    // Jeżeli cząstka wyszła poza dolną krawędź,
                    // to przenieś ją na górę
                    this.y = -this.size;
                }

                // Interakcja z myszką (pozostaje bez zmian)
                const dx = mouse.x - this.x;
                const dy = mouse.y - this.y;
                const distance = Math.sqrt(dx * dx + dy * dy);

                if (distance < mouse.radius) {
                    const angle = Math.atan2(dy, dx);
                    const force = (mouse.radius - distance) / mouse.radius;
                    const forceX = Math.cos(angle) * force * 0.5;
                    const forceY = Math.sin(angle) * force * 0.5;
                    this.speedX -= forceX;
                    this.speedY -= forceY;
                } else {
                    // Powrót do pierwotnej prędkości
                    this.speedX += (this.originalSpeedX - this.speedX) * 0.05;
                    this.speedY += (this.originalSpeedY - this.speedY) * 0.05;
                }
            }


        }

        function initParticles() {
            particlesArray.length = 0;
            const numberOfParticles = 30; // Liczba cząstek
            for (let i = 0; i < numberOfParticles; i++) {
                const size = Math.random() * 5 + 2;
                const x = Math.random() * canvas.width;
                const y = Math.random() * canvas.height;
                const color = 'white'; // Kolor cząstek
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
        <>
            {/*
        1) Style wstrzyknięte w <style>, aby nie potrzebować osobnego pliku CSS.
        2) Poza tym można tu również usunąć zbędne selektory (np. .pixel, fadeOut),
           jeśli nie korzystasz już z efektu pikseli.
      */}
            <style>{`
        /* RESET */
        
        
        * {
          margin: 0;
          padding: 0;
          box-sizing: border-box;
        }

        /* Kontener z animacją */
        #animation-container {
          position: relative;
          width: 100%;
          height: 100%;
          background: #000; /* Tło czarne */
          overflow: hidden; /* Blokuj przewijanie */
        }

        /* Canvas pełnoekranowe w tle */
        #background-canvas {
          position: fixed; 
          top: 0; 
          left: 0;
          width: 100vw;
          height: 100vh;
          z-index: -1; /* <- KLUCZOWE */
          background: #000; /* czarne tło */
        }


        /* Jeśli masz główną treść na tej samej stronie: */
        .main-content {
          position: relative;
          z-index: 1;
          color: white;
        }

        /* --- Resztę stylów (np. .pixel, fadeOut) usuń lub zostaw, 
               jeśli kiedyś będziesz chciał użyć pikseli. --- */
      `}</style>

            {/*
        1) Zamiast #animation-container + .pixel, wystarczy nam sam <canvas>.
        2) Możesz też opakować <canvas> w <div id="animation-container">,
           jeśli gdzieś w kodzie się do niego odwołujesz.
      */}
            <div id="animation-container">
                <canvas id="background-canvas"></canvas>
            </div>
        </>
    );
};

export default AnimatedBackground;
