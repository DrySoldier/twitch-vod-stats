import React, { Component } from 'react';

import Col from 'react-bootstrap/Col';

export default class ContentCard extends Component {

    render() {
        return (
            <Col style={{ minHeight: 200, maxWidth: 350, overflow: 'auto' }}>
                <div className='card text-center box-shadow'>
                    <div style={{ marginTop: 15 }} className='card-title'><h4>{this.props.title}</h4></div>
                    <div className="card-body d-flex align-items-center flex-column justify-content-md-center">
                        {this.props.children}
                    </div>
                </div>
            </Col>
        );
    }
}

