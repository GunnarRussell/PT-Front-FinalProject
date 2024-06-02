import React from 'react'
import './pages.css';
import Card from 'react-bootstrap/Card';
import ScoreList from '../score-list/score-list';

export default function Scores() {
  return (
    <div className="page">
          <ScoreList />
    </div>
  )
}
