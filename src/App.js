import { useEffect, useState } from 'react';
import './App.css';
import SingleCard from './components/SingleCard';
import doraemon from './img/doraemon.png';
import nobita from './img/nobita.png';
import shizuka from './img/shizuka.png';
import gian from './img/gian.png';
import suneo from './img/suneo.png';
import dorami from './img/dorami.png';


const cardImages =[
  { "src": doraemon, matched: false },
  { "src": nobita, matched: false },
  { "src": shizuka, matched: false },
  { "src": gian , matched: false},
  { "src": suneo, matched: false},
  { "src": dorami, matched: false }
]

function App() {
  const [cards, setCards] = useState([])
  const [turns, setTurns] = useState(0)
  const [choiceOne, setChoiceOne] = useState(null)
  const [choiceTwo, setChoiceTwo] = useState(null)
  const [disabled, setDisabled] = useState(false)

//shuffle cards
const shuffleCards =() => {
  const shuffledCards = [...cardImages, ...cardImages]
  .sort(() => Math.random() - 0.5)
  .map((card) => ({ ...card, id: Math.random() }))

setChoiceOne(null)
setChoiceTwo(null) 
setCards(shuffledCards)
setTurns(0)
}
//handle a choice
const handleChoice = (card) => {

    choiceOne ? setChoiceTwo(card) : setChoiceOne(card)
}

//compare 2 selected cards
useEffect(() => {
  if (choiceOne && choiceTwo){    
    setDisabled(true)
    if (choiceOne.src === choiceTwo.src) {
      setCards(prevCards => {return prevCards.map(card => {
        if (card.src === choiceOne.src) {
          return { ...card, matched: true }
         } else {
            return card
          }
      })

      })
      resetTurn()
    } else {
     setTimeout(() => resetTurn(), 1000)
    }
  }
}, [choiceOne, choiceTwo])

//reset choice & increase turn
const resetTurn = () => {
  setChoiceOne(null)
  setChoiceTwo(null)
  setTurns(prevTurns => prevTurns + 1)
  setDisabled(false)
}

useEffect(() => {
  shuffleCards()
}, [])

  return (
    <div className="App">
      <h1>Magic Match <span>Doraemon Game</span></h1>
      <button className='button' onClick={shuffleCards}><span>New Game</span></button>

      <div className='card-grid'>
        {cards.map(card => (
          <SingleCard 
            key={card.id} 
            card={card}
            handleChoice={handleChoice} 
            flipped={card === choiceOne || card === choiceTwo || card.matched}
            disabled={disabled}
          />
        ))}
      </div>
      <p>Turns: {turns}</p>
    </div>
  );
}

export default App;
