import {
  Button,
  Center,
  MantineProvider,
  Modal,
  TextInput,
} from '@mantine/core';
import { useInputState } from '@mantine/hooks';
import { useState, useEffect } from 'react';
import SingleCard from '../components/SingleCard';

export default function Home() {
  const [cards, setCards] = useState([]);
  const [turns, setTurns] = useState(0);
  const [choiceOne, setChoiceOne] = useState(null);
  const [choiceTwo, setChoiceTwo] = useState(null);
  const [disabled, setDisabled] = useState(false);
  const [opened, setOpened] = useState(false);
  const [name, setName] = useInputState(null);

  let cardImages = [
    { src: '/static/img/helmet-1.png', matched: false },
    { src: '/static/img/potion-1.png', matched: false },
    { src: '/static/img/ring-1.png', matched: false },
    { src: '/static/img/scroll-1.png', matched: false },
    { src: '/static/img/shield-1.png', matched: false },
    { src: '/static/img/sword-1.png', matched: false },
  ];

  const shuffleCards = () => {
    let shuffledCards = [...cardImages, ...cardImages]
      .sort(() => Math.random() - 0.5)
      .map((card) => ({ ...card, id: Math.random() }));

    setChoiceOne(null);
    setChoiceTwo(null);
    setCards(shuffledCards);
    setTurns(0);
  };

  const handleChoice = (card) => {
    choiceOne ? setChoiceTwo(card) : setChoiceOne(card);
  };

  useEffect(() => {
    if (choiceOne && choiceTwo) {
      setDisabled(true);
      if (choiceOne.src === choiceTwo.src) {
        setCards((prevState) => {
          return prevState.map((card) => {
            return card.src === choiceOne.src
              ? { ...card, matched: true }
              : card;
          });
        });
        resetTurns();
      } else {
        setTimeout(() => {
          resetTurns();
        }, 1000);
      }
    }
  }, [choiceOne, choiceTwo]);

  const resetTurns = () => {
    setChoiceOne(null);
    setChoiceTwo(null);
    setTurns((prevState) => prevState + 1);
    setDisabled(false);
  };

  const closeModalHandler = () => {
    shuffleCards();
    setOpened(false);
  };

  useEffect(() => {
    shuffleCards();
  }, []);

  useEffect(() => {
    let matchedElements = [];

    cards.map((card) => {
      matchedElements.push(card.matched);
    });

    if (matchedElements.length > 0) {
      let checker = (arr) => arr.every((v) => v === true);
      setOpened(checker(matchedElements));
    }
  }, [choiceOne, choiceTwo]);

  return (
    <>
      <div className='app'>
        <h1>Quazza</h1>
        <button className='button' style={{ marginBottom: '2rem' }}>
          New Game
        </button>
        <Center>
          <MantineProvider theme={{ colorScheme: 'light' }}>
            <TextInput
              value={name}
              onChange={setName}
              sx={{ width: '50%' }}
              placeholder='اسمتو وارد کن'
            />
          </MantineProvider>
        </Center>

        <div className='card-grid'>
          {cards.map((card) => (
            <SingleCard
              key={card.id}
              card={card}
              handleChoice={handleChoice}
              flipped={card === choiceOne || card === choiceTwo || card.matched}
              disabled={disabled}
            />
          ))}
        </div>
        <p>Turnes = {turns}</p>
      </div>

      <Modal
        opened={opened}
        onClose={() => setOpened(false)}
        title={`${turns} Turns!`}
      >
        <h1>آفرین {name}</h1>
        <Button
          className='modal-button'
          size='lg'
          variant='gradient'
          gradient={{ from: 'pink', to: 'grape' }}
          onClick={closeModalHandler}
        >
          Play Again
        </Button>
      </Modal>
    </>
  );
}
