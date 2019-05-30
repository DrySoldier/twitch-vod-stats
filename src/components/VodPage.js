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
            messagesOnly: null,
            timeStampsOnly: null,

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

        this.setState({ loading: true });

        API.getStats(this.props.match.params.id).then(res => {

            console.log(res.data);

            let { topTenChatters, topTenMessages, totalMessages, totalUniqueChatters, countsTimeStamps, messagesOnly, timeStampsOnly } = res.data;

            this.setState({
                topTenChatters,
                topTenMessages,
                totalMessages,
                totalUniqueChatters,
                messagesOnly,
                timeStampsOnly,
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
        this.setState({ value: event.target.value });
    }

    handleSubmit = event => {
        event.preventDefault();

        let indexes = [];
        let newTimestamps = [];
        let timestampObject = {};

        let keywords = this.state.value.split(' ');
    
        for (let i = 0; i < this.state.messagesOnly.length; i++) {
            for (let j = 0; j < keywords.length; j++) {
                if(this.state.messagesOnly[i].includes(keywords[j])){
                    indexes.push(i)
                } 
            }
        }

        for (let i = 0; i < this.state.timeStampsOnly.length; i++) {
            for (let j = 0; j < indexes.length; j++) {
                if(i === indexes[j]){
                    newTimestamps.push(this.state.timeStampsOnly[i]);
                }
            }
        }
        newTimestamps.forEach(function (x) { timestampObject[x] = (timestampObject[x] || 0) + 1; });

        this.setState({ data: timestampObject });
    }

    render() {

        return (

            <div className='vod-page-container'>
                <TableCard title={'General Data'}>

                    <div className='main-content'>

                        <InfoCard title={'Users with Most Messages'} data={this.state.topTenChatters} />

                        <div className='broadcaster-info'>
                            <ContentCard title={'Total Messages'}>
                                <h3>{this.state.totalMessages}</h3>
                                {this.state.loading &&
                                    <Spinner animation="border" role="status">
                                        <span className="sr-only margin">Loading...</span>
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

                <ContentCard title={'Search Graph for Specific Word'} className='margin-50'>
                    <form onSubmit={this.handleSubmit}>
                        <input type="text" value={this.state.value} onChange={this.handleChange} />
                        <input type="submit" value="Submit" />
                    </form>
                </ContentCard>

                <TableCard className='chart-div' title={'Message Frequency / Notable spikes in messages'}>
                    <LineChart data={this.state.data} />
                </TableCard>
            </div>
        );
    }
}

export default VodPage;
