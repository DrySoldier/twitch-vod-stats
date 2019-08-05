import React, { Component } from 'react';
import ProgressBar from 'react-bootstrap/ProgressBar';
import Button from 'react-bootstrap/Button';
import Spinner from 'react-bootstrap/Spinner';

import TableCard from './TableCard';
import ContentCard from './ContentCard';

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
            progress: 0,
            vodID: null,
            toVod: false,
            previews: [],

            valueSubmitted: null,

            hasError: false,
            error: null,
            errorTitle: '',

            disabled: false,
        };

        this.done = false;
        this.err = null;
    }

    componentDidMount() {
        this.setState({
            previews: [
                <Spinner key={'spinner'} animation="border" role="status">
                    <span className="sr-only margin">Loading...</span>
                </Spinner>
            ]
        });

        this.recentStats();
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

                this.createStatsFunc(finalVodID);
            } else {
                this.createStatsFunc(urlParam);
            }
        } else {
            this.createStatsFunc(userInput);
        }
    }

    createStatsFunc = id => {

        this.setState({ valueSubmitted: id });

        setInterval(() => {
            this.areStatsCreated(this.state.valueSubmitted);
        }, 60000);

        setInterval(() => {
            if (!this.done) {
                if (this.state.progress <= 70) {
                    this.setState({ progress: this.state.progress + .1 });
                } else if (this.state.progress <= 95) {
                    this.setState({ progress: this.state.progress + .01 });
                }
            }

        }, 100);

        API.createStats(id)
            .then((res) => {
                if (res.data.error) {
                    this.setState({ hasError: true, error: res.data.error, disabled: false, loading: false, errorTitle: 'Error' });
                } else {
                    this.done = true;
                    this.setState({ progress: 100 });
                    delay(1000).then(() => window.location.href = encodeURI(`/vods/${res.data}`));
                }
            })
            .catch(err => this.err = err);
    }

    areStatsCreated = id => {
        API.areStatsCreated(id)
            .then((res) => {
                if(res.data !== false){
                    this.done = true;
                    this.setState({ progress: 100 });
                    delay(1000).then(() => window.location.href = encodeURI(`/vods/${res.data}`));
                }
            })
    }

    recentStats = () => {
        API.getRecentStats()
            .then((res) => {

                let { previewArr, titleArr, vodIDArr } = res.data;
                let dupeArr = [];
                let previews = [];

                for (let i = 0; i < previewArr.length; i++) {
                    if (!dupeArr.includes(vodIDArr[i])) {
                        dupeArr.push(vodIDArr[i]);
                        previews.push(
                            <a key={i} href={`/vods/${vodIDArr[i]}`}>
                                <ContentCard title={titleArr[i]} >
                                    <img src={previewArr[i]} className='preview-img box-shadow' alt='preview'></img>
                                </ContentCard>
                            </a>
                        )
                    }
                }

                this.setState({ previews });

            }).catch(err => { });
    }

    handlePreviewClick = (event, vodID) => {
        event.preventDefault();

        window.location.href = encodeURI(`/vods/${vodID}`)
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
                                <ContentCard title={this.state.errorTitle}>
                                    {this.state.error}
                                </ContentCard>
                            }
                        </div>
                        <div style={{ marginTop: 25, marginBottom: 25 }}>
                            {this.state.loading &&
                                <div>
                                    <h5>Loading vod chat data. This may take around ~5 minutes for longer vods.</h5>
                                    Subsequent load times will be much faster.
                                        <ProgressBar animated min={0} max={100} now={this.state.progress} />
                                </div>
                            }
                        </div>
                    </div>
                </TableCard>


                <TableCard title={'Recently Created Stats'}>
                    <div className='preview-div'>
                        {this.state.previews}
                    </div>
                </TableCard>
            </div>

        );
    }
}

export default HomePage;
