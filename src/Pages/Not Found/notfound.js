import React from 'react'
import "./notfound.css"
import { Link } from 'react-router-dom';


function Notfound() {
  return (
    <div>
       <div className="not-found-container">
      <h1 className="not-found-heading">404</h1>
      <h2 className="not-found-subheading">Page not found</h2>
      <p className="not-found-message">We're sorry, the page you requested could not be found.</p>
      <div className="not-found-actions">
        <Link to="/home" className="not-found-homepage-link">Go to Homepage</Link>
      </div>
    </div>
    </div>
  )
}

export default Notfound
