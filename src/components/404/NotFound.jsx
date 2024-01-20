import React from "react";
import "./NotFound.css";

const NotFound = () => {
  return (
    <div className="not-found-container">
      <div className="not-found">
        <div className="error-icon">
          <i className="fas fa-exclamation-triangle"></i>
        </div>
        <h1>404</h1>
        <p className="not-found-message">Page Not Found</p>
        <p>Oops! Looks like you took a wrong turn.</p>
        <a href="/" className="back-to-home-link">
          Go back to Home
        </a>
      </div>
    </div>
  );
};

export default NotFound;
