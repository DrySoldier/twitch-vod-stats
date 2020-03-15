import React from 'react';
import { Navbar } from 'react-bootstrap';

const Header = props => {
  return (
    <div className="header-div">
      <Navbar expand="lg" className="header-nav">
        <Navbar.Brand href="/">
          <div className="header-text">Twitch Vod Stats</div>
        </Navbar.Brand>
      </Navbar>
    </div>
  );
};

export default Header;
