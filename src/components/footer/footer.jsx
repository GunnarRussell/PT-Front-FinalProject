import React from 'react'
import './footer.css';

export default function footer() {
  return (
    <div className="footer">
        <ul>
            <li>Gunnar Russell, {new Date().getFullYear()}</li>
            <li>Contact</li>
        </ul>
    </div>
  )
}
