import { useEffect, useState } from "react";
import "./App.css";
import Card from "./components/Card";
import ModalWinner from "./components/ModalWinner";

let cardImages = [
  { src: "./img/helmet-1.png", match: false },
  { src: "./img/potion-1.png", match: false },
  { src: "./img/ring-1.png", match: false },
  { src: "./img/scroll-1.png", match: false },
  { src: "./img/shield-1.png", match: false },
  { src: "./img/sword-1.png", match: false },
];
function App() {
  let [choice1, setChoice1] = useState(null);
  let [choice2, setChoice2] = useState(null);

  let [turns, setTurns] = useState(0);

  let [numOfMatches, setNumOfMatches] = useState(0);

  let [disabled, setDisabled] = useState(false);

  let [cards, setCards] = useState([]);

  function shuffleCards() {
    const shuffeldCards = [...cardImages, ...cardImages]
      .sort(() => Math.random() - 0.5)
      .map((card) => ({ ...card, id: Math.random() }));
      resetTurns();
      setCards(shuffeldCards);
      setTurns(0);
      setNumOfMatches(0);
  }

  function handleChoice(card) {
    if (choice1) {
      setChoice2(card);
    } else {
      setChoice1(card);
    }
  }

  useEffect(() => {
    if (choice1 && choice2) {
      setTurns(++turns);
      setDisabled(true);
      if (choice1.src == choice2.src) {
        setNumOfMatches(++numOfMatches);
        // setCards()
        let tempCards = cards.map((card) => {
          if (card.src === choice1.src) {
            return { ...card, match: true };
          } else {
            return card;
          }
        });
        setCards(tempCards);
        resetTurns();
      } else {
        setTimeout(() => {
          resetTurns();
        }, 1000);
      }
    }
  }, [choice1, choice2]);

  useEffect(() => {
    shuffleCards();
  }, [])

  console.log(turns);

  function resetTurns() {
    setChoice1(null);
    setChoice2(null);
    setDisabled(false);
  }
console.log({matches: numOfMatches, cards: cards.length});
  return (
    <div className="App">
      <h1>Magic Cards</h1>
      <button onClick={shuffleCards}>New Game</button>
      <div className="card-grid">
        {cards.map((card) => (
          <Card
            key={card.id}
            card={card}
            handleChoice={handleChoice}
            flipped={card === choice1 || card === choice2 || card.match}
            disabled={disabled}
          />
        ))}
      </div> 

      { (numOfMatches*2) === cards.length && <ModalWinner title={"Winner!"} children={turns} shuffeldCards={shuffleCards} />}
      <p>Turns: {turns}</p>
    </div>
  );
}

export default App;
