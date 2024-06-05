import React from 'react'
import './life-container.css';
import Life from '../life/life.jsx';

export default function LifeContainer(props) {
    const { lives } = props;
    const lifeArray = [];

    for (let i = 0; i < lives; i++)
    {
        lifeArray.push(<Life key={i}/>);
    }

  return (
    <>
        Lives:
        {lifeArray}
    </>
  )
}
