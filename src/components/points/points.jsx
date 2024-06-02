import React from 'react'
import './points.css';

export default function Points(props) {

  console.log("Points component: " + props.points);

  return (
    <div className="points">
        {props.points}
    </div>
  )
}
