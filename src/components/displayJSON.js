import React, { Component } from 'react';

import Spinner from 'react-bootstrap/Spinner';

import API from '../utils/API';

class displayJSON extends Component {

    constructor(props) {
        super(props);
        this.state = {
            data: null,
            loading: false
        }
    }

    componentDidMount() {

        console.log('Component Mounted')

        this.setState({ loading: true });

        API.getStats(this.props.match.params.id)
            .then(res => {

                this.setState({ data: JSON.stringify(res.data), loading: false });

            })
            .catch(err => console.log(err));
    }

    render() {
        return (
            <div style={{ backgroundColor: 'white' }}>
                {this.state.loading ? <Spinner animation="border" role="status">
                    <span className="sr-only">Loading...</span>
                </Spinner> : this.state.data}
            </div>
        );
    }
}

export default displayJSON;
