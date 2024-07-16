import { useEffect, useRef } from 'react';
import styles from '..game.module.css';

const Game = () => {
    const canvasRef = useRef<HTMLCanvasElement>(null);
  
    useEffect(() => {
      const canvas = canvasRef.current;
      const context = canvas!.getContext('2d');
  
      if (!context) {
        return;
      }
  
      const width = canvas!.width;
      const height = canvas!.height;
  
      // Game variables
      interface Ship {
        x: number;
        y: number;
        angle: number;
      }
  
      let ship: Ship = { x: width / 2, y: height / 2, angle: 0 };
      let asteroids: Array<{ x: number; y: number }> = []; // Adjust the type based on your needs
      let bullets: Array<{ x: number; y: number }> = []; // Adjust the type based on your needs
  
      // Game functions
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
  
      const draw = () => {
        context.clearRect(0, 0, width, height);
        drawShip(ship.x, ship.y, ship.angle);
        requestAnimationFrame(draw);
      };
  
      draw();
    }, []);
  
    return <canvas ref={canvasRef} className={styles.canvas} width={800} height={600} />;
  };
  
  export default Game;