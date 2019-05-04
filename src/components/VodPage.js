import React, { Component } from 'react';

import Spinner from 'react-bootstrap/Spinner';

import TableCard from './TableCard';
import InfoCard from './InfoCard';
import ContentCard from './ContentCard';

import API from '../utils/API';

import ReactChartkick, { LineChart } from 'react-chartkick';
import Chart from 'chart.js'

import '../App.css';

ReactChartkick.addAdapter(Chart)

class VodPage extends Component {

    constructor(props) {
        super(props);
        this.state = {
            topTenChatters: null,
            topTenMessages: null,
            totalMessages: null,
            totalUniqueChatters: null,
            countsTimeStamps: null,

            data: null,
            vodTitle: null,
            vodURL: null,
            previewURL: null,
            broadcasterName: null,
            broadcasterChannel: null,

            loading: false,

            value: '',
        };
    }

    componentDidMount() {

        console.log('Component Mounted');

        this.setState({ loading: true });

        API.getStats(this.props.match.params.id).then(res => {

            console.log(res.data);

            let { topTenChatters, topTenMessages, totalMessages, totalUniqueChatters, countsTimeStamps } = res.data;

            this.setState({
                topTenChatters,
                topTenMessages,
                totalMessages,
                totalUniqueChatters,
                data: countsTimeStamps,
                vodTitle: res.data.obj[0].vodTitle,
                vodURL: res.data.obj[0].vodURL,
                previewURL: res.data.obj[0].previewURL,
                broadcasterName: res.data.obj[0].broadcasterName,
                broadcasterChannel: res.data.obj[0].broadcasterChannel,

                loading: false,
            });

        })
            .catch(err => console.log(err));
    }

    handleChange = (event) => {
        event.preventDefault();
        this.setState({ value: event.target.value });
    }

    handleSubmit = () => {

        console.log(this.state.data);
    }

    render() {

        return (

            <div style={{ display: 'flex', flex: 1, flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
                <TableCard title={'General Data'}>

                    <div style={{ display: 'flex', flex: 1, flexDirection: 'row', justifyContent: 'center', alignItems: 'center', flexWrap: 'wrap' }}>

                        <InfoCard title={'Users with Most Messages'} data={this.state.topTenChatters} />

                        <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
                            <ContentCard title={'Total Messages'}>
                                <h3>{this.state.totalMessages}</h3>
                                {this.state.loading &&
                                    <Spinner animation="border" role="status">
                                        <span className="sr-only">Loading...</span>
                                    </Spinner>
                                }
                            </ContentCard>

                            <ContentCard title={'Broadcaster Info'}>
                                <div>
                                    <h5>{this.state.broadcasterName}</h5>
                                    <a href={this.state.broadcasterChannel}>{this.state.broadcasterChannel}</a>
                                </div>
                            </ContentCard>

                            <ContentCard title={'Vod Info'}>
                                <div>
                                    <h5>{this.state.vodTitle}</h5>
                                    <a href={this.state.vodURL}>{this.state.vodURL}</a>
                                </div>
                            </ContentCard>

                        </div>

                        <InfoCard title={'Most Copied Messages'} data={this.state.topTenMessages} />

                    </div>

                </TableCard>

                <ContentCard title={'Search Graph for Specific Word'} style={{ marginTop: 50 }}>
                    <form onSubmit={this.handleSubmit}>
                        <input type="text" value={this.state.value} onChange={this.handleChange} />
                        <input type="submit" value="Submit" />
                    </form>
                </ContentCard>

                <TableCard style={{ flexWrap: 'wrap', overflow: 'auto' }} title={'Message Frequency / Notable spikes in messages'}>
                    <LineChart data={this.state.data} />
                </TableCard>
            </div>
        );
    }
}

export default VodPage;
