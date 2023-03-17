import patternDiv from '../images/pattern-divider-desktop.svg';
import buttonImg from '../images/icon-dice.svg';
import '../Components/Container.css';
import {useState } from 'react';

const Container = () => {

  const defaultAdvice = {id: 0, advice: 'Press the button below if you need an advice'}

  const [advice, setAdvice] = useState(defaultAdvice);
  const [animationOn, setAnimationOn] = useState(null);

  const AdviceRequestHandler = async() => {

    setAnimationOn(true);

    try{
      const answer = await fetch('https://api.adviceslip.com/advice');

      const data = await answer.json();

      const adviceObj = {
        id: data.slip.id,
        advice: data.slip.advice,
      }

      setAdvice(adviceObj);


    } catch (error) {}

    setAnimationOn(null);

  }


  return (
    <div className='advice-container'>
      <p className='advice-container__id'>Advice #{advice.id}</p>
      <p className={'advice-container__advice'}>{`"${advice.advice}"`}</p>
      <img src={patternDiv} alt='pattern icon'></img>
      <button className={`${'advice-container__actions'} ${animationOn && 'button-animation'}`} onClick={AdviceRequestHandler}>
        <img src={buttonImg} alt='dice icon'></img>
      </button>
    </div>
  )
}

export default Container;