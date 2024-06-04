import React from 'react'
import './pages.css';
import Card from 'react-bootstrap/Card';
import ScoreList from '../high score components/score-list/score-list.jsx';

export default function Scores() {
  return (
    <div className="page">
          <ScoreList />
    </div>
  )
}
