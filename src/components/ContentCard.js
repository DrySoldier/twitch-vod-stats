import React, { Component } from 'react';

export default class ContentCard extends Component {

    render() {
        return (
            <div className='content-card'>
                <div className='card text-center box-shadow'>
                    <div className='card-title'><h4>{this.props.title}</h4></div>
                    <div className="card-body d-flex align-items-center flex-column justify-content-md-center">
                        {this.props.children}
                    </div>
                </div>
            </div>
        );
    }
}

