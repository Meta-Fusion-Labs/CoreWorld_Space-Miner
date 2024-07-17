"use client";

import { useEffect, useRef, useState } from 'react';
import styles from '../styles/game.module.css';

const Game = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [ship, setShip] = useState({ x: 400, y: 300, angle: 0 });
  const bulletsRef = useRef<Array<{ x: number; y: number; angle: number }>>([]);
  const [dummyState, setDummyState] = useState(0); // To force re-render when bullets change

  useEffect(() => {
    const canvas = canvasRef.current;
    const context = canvas!.getContext('2d');

    if (!context) {
      return;
    }

    const width = canvas!.width;
    const height = canvas!.height;

    const handleKeyDown = (event: KeyboardEvent) => {
      switch (event.key) {
        case 'w':
          setShip((prev) => ({
            ...prev,
            x: prev.x + 5 * Math.cos(prev.angle - Math.PI / 2),
            y: prev.y + 5 * Math.sin(prev.angle - Math.PI / 2),
          }));
          break;
        case 'a':
          setShip((prev) => ({ ...prev, angle: prev.angle - 0.1 }));
          break;
        case 'd':
          setShip((prev) => ({ ...prev, angle: prev.angle + 0.1 }));
          break;
        case ' ':
          bulletsRef.current.push({ x: ship.x, y: ship.y, angle: ship.angle });
          setDummyState((prev) => prev + 1); // Force re-render to update bullets
          break;
      }
    };

    window.addEventListener('keydown', handleKeyDown);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [ship]);

  useEffect(() => {
    const canvas = canvasRef.current;
    const context = canvas!.getContext('2d');

    if (!context) {
      return;
    }

    const width = canvas!.width;
    const height = canvas!.height;

    const drawShip = (x: number, y: number, angle: number) => {
      context.save();
      context.translate(x, y);
      context.rotate(angle);
      context.beginPath();
      context.moveTo(0, -10);
      context.lineTo(5, 10);
      context.lineTo(-5, 10);
      context.closePath();
      context.strokeStyle = 'white';
      context.stroke();
      context.restore();
    };

    const drawBullet = (x: number, y: number) => {
      context.save();
      context.translate(x, y);
      context.beginPath();
      context.arc(0, 0, 2, 0, 2 * Math.PI);
      context.fillStyle = 'white';
      context.fill();
      context.restore();
    };

    const update = () => {
      context.clearRect(0, 0, width, height);

      // Draw the ship
      drawShip(ship.x, ship.y, ship.angle);

      // Update and draw bullets
      bulletsRef.current = bulletsRef.current
        .map((bullet) => ({
          ...bullet,
          x: bullet.x + 0.1 * Math.cos(bullet.angle - Math.PI / 2), // Reduced speed
          y: bullet.y + 0.1 * Math.sin(bullet.angle - Math.PI / 2), // Reduced speed
        }))
        .filter(
          (bullet) =>
            bullet.x > 0 && bullet.x < width && bullet.y > 0 && bullet.y < height
        );

      bulletsRef.current.forEach((bullet) => drawBullet(bullet.x, bullet.y));

      requestAnimationFrame(update);
    };

    update();
  }, [ship, dummyState]);

  return (
    <div className={styles.container}>
      <canvas ref={canvasRef} className={styles.canvas} width={800} height={600} />
    </div>
  );
};

export default Game;

