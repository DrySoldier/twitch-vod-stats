import React, { Component } from 'react';

import Row from 'react-bootstrap/Row'

export default class TableCard extends Component {

    render() {
        return (
            <Row className='box-shadow card row-style'>
                <h3>{this.props.title}</h3>
                <div>
                    {this.props.children}
                </div>

            </Row>
        );
    }
}

