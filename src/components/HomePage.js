import React, { Component } from 'react';
import ProgressBar from 'react-bootstrap/ProgressBar';
import Button from 'react-bootstrap/Button';

import TableCard from './TableCard';
import InfoCard from './ContentCard';

import API from '../utils/API';

import '../App.css';

/*window.onbeforeunload = function () {
  return "Are you sure you want to navigate away?";
}*/

const delay = t => new Promise(resolve => setTimeout(resolve, t));

class HomePage extends Component {

    constructor(props) {
        super(props);
        this.state = {
            currentValue: '',
            loading: false,
            vodID: null,
            toVod: false,

            valueSubmitted: null,

            hasError: false,
            error: null,
            errorTitle: '',

            disabled: false,
        };
    }

    handleInputChange = event => {
        let { value } = event.target;

        this.setState({ currentValue: value });
    }

    handleClick = event => {
        event.preventDefault();

        this.setState({ loading: true, hasError: false, disabled: true });

        let userInput = this.state.currentValue.trim();

        if (userInput.includes('/')) {
            let urlParam = userInput.split('/');

            urlParam = urlParam[urlParam.length - 1];

            if (urlParam.includes('?')) {
                let finalVodID = urlParam.split('?');
                finalVodID = finalVodID[0];

                console.log('Sending id:', finalVodID);
                this.createStatsFunc(finalVodID);
            } else {
                console.log('Sending id:', urlParam);
                this.createStatsFunc(urlParam);
            }
        } else {
            console.log('Sending id:', userInput);
            this.createStatsFunc(userInput);
        }
    }

    createStatsFunc = id => {

        this.setState({ valueSubmitted: id });

        setInterval(() => {
            this.areStatsCreated(this.state.valueSubmitted);
        }, 90000);

        API.createStats(id)
            .then((res) => {

                console.log('data:', res.data);

                if (res.data.error) {
                    this.setState({ hasError: true, error: res.data.error, disabled: false, loading: false, errorTitle: 'Error' });
                }
            })
            .catch(err => {
            });
    }

    areStatsCreated = id => {
        console.log('Checking if object with id: ' + id + ' is created')
        API.areStatsCreated(id)
            .then((res) => {
                delay(1000).then(() => window.location.href = encodeURI(`/vods/${res.data}`));
            })
    }

    render() {

        return (

            <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
                <TableCard title={'Enter vod ID or vod URL to get statistics'}>
                    <h5>(Vod ID is normally a 9 digit number found at the end of the vod URL)</h5>
                    <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
                        <input style={{ width: 300, marginTop: 25, textAlign: 'center', borderColor: 'gray', borderWidth: 1, borderStyle: 'solid' }} value={this.state.currentValue} onChange={text => this.handleInputChange(text)}></input>
                        <Button style={{ width: 200, marginTop: 50 }} disabled={this.state.disabled} onClick={event => this.handleClick(event)}>Generate Stats</Button>
                        <div style={{ marginTop: 50 }}>
                            {this.state.hasError &&
                                <InfoCard title={this.state.errorTitle}>
                                    {this.state.error}
                                </InfoCard>
                            }
                        </div>
                        <div style={{ marginTop: 25, marginBottom: 25 }}>
                            {this.state.loading &&
                                <div>
                                    <h5>Loading vod chat data. This may take around ~5 minutes for longer vods.</h5>
                                    Subsequent load times will be much faster.
                                        <ProgressBar animated now={100} />
                                </div>
                            }
                        </div>
                    </div>
                </TableCard>
            </div>

        );
    }
}

export default HomePage;
