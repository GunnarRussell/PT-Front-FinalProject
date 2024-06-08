import React from 'react'
import './footer.css';

export default function footer() {
  return (
    <div className="footer">
        <ul>
            <li>made by gunnar russell, {new Date().getFullYear()}</li>
        </ul>
    </div>
  )
}
