import React from 'react';
import '../App.css'; // Import your CSS file for styling

function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="footer">
      <div className="footer-container">
        <p className="copyright">&copy; {currentYear} All Rights Reserved</p>
      </div>
    </footer>
  );
}

export default Footer;
