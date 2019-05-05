import React from 'react';
import { Navbar, Nav } from 'react-bootstrap';

const Header = (props) => {

    return (
        <div className='header-div'>
            <Navbar expand="lg" className='header-nav'>
                <Navbar.Brand href="/" style={{ color: 'white' }}>Twitch Vod Stats</Navbar.Brand>
                <Nav.Link className='white' href="https://github.com/DrySoldier/twitch-vod-stats">Github Repo</Nav.Link>
            </Navbar>
        </div>
    );
}

export default Header;
