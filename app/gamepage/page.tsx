
import styles from '../styles/gamepage.module.css'; // Ensure the path is correct
import Game from '../components/Game';



const GamePage = () => {
  return (
    <div className={styles.container}>
      <Game />
    </div>
  );
};

export default GamePage;
