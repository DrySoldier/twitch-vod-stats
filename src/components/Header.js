import React from 'react';
import { Navbar, Nav } from 'react-bootstrap';

const Header = (props) => {

    return (
        <div style={{ width: '100%' }}>
            <Navbar expand="lg" style={{ backgroundColor: '#6441a4', justifyContent: 'space-between' }}>
                <Navbar.Brand href="/" style={{ color: 'white' }}>Twitch Vod Stats</Navbar.Brand>
                <Nav.Link style={{ color: 'white' }} href="https://github.com/DrySoldier/twitch-vod-stats">Github Repo</Nav.Link>
            </Navbar>
        </div>
    );
}

export default Header;
