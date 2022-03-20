import Image from 'next/image';

const SingleCard = ({ card, handleChoice, flipped, disabled }) => {
  const handleClick = () => {
    !disabled && handleChoice(card);
  };

  return (
    <div className='card'>
      <div className={flipped ? 'flipped' : ''}>
        <img className='front' src={card.src} alt='card front' />
        <img
          className='back'
          src='/static/img/cover.png'
          alt='card back'
          onClick={handleClick}
        />
      </div>
    </div>
  );
};

export default SingleCard;
