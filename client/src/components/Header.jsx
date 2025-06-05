import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './Header.css';

const Header = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <header className="header">
      <div className="container">
        <div className="logo">
        Driving Theory Prep
        </div>
        <nav className={isMobileMenuOpen ? "nav open" : "nav"}>
          <Link to="/" className="nav-link" onClick={() => setIsMobileMenuOpen(false)}>Home</Link>
          <Link to="/" className="nav-link" onClick={() => setIsMobileMenuOpen(false)}>Practice Test</Link>
          <Link to="/" className="nav-link" onClick={() => setIsMobileMenuOpen(false)}>About</Link>
        </nav>
        <div className="hamburger" onClick={toggleMenu}>
          <div className={`line ${isMobileMenuOpen ? 'open' : ''}`}></div>
          <div className={`line ${isMobileMenuOpen ? 'open' : ''}`}></div>
          <div className={`line ${isMobileMenuOpen ? 'open' : ''}`}></div>
        </div>
      </div>
    </header>
  );
};

export default Header;
