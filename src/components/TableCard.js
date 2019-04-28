import React, { Component } from 'react';

import Row from 'react-bootstrap/Row'

export default class TableCard extends Component {

    render() {
        return (
            <Row className='box-shadow card' style={{ marginTop: 25, width: '85%' }}>
                <h3>{this.props.title}</h3>
                <div>
                    {this.props.children}
                </div>

            </Row>
        );
    }
}

