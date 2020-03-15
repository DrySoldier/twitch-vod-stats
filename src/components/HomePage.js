import React, { Component } from 'react';
import ProgressBar from 'react-bootstrap/ProgressBar';
import Button from 'react-bootstrap/Button';
import Spinner from 'react-bootstrap/Spinner';

import TableCard from './TableCard';
import ContentCard from './ContentCard';

import API from '../utils/API';

import videoTab from '../assets/images/video_tab.png';
import urlPic from '../assets/images/url.png';
import loading from '../assets/images/loading.png';

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

      disabled: false
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
  };

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
  };

  createStatsFunc = id => {
    this.setState({ valueSubmitted: id });

    setInterval(() => {
      this.areStatsCreated(this.state.valueSubmitted);
    }, 60000);

    setInterval(() => {
      if (!this.done) {
        if (this.state.progress <= 70) {
          this.setState({ progress: this.state.progress + 0.1 });
        } else if (this.state.progress <= 95) {
          this.setState({ progress: this.state.progress + 0.01 });
        }
      }
    }, 100);

    API.createStats(id)
      .then(res => {
        if (res.data.error) {
          this.setState({
            hasError: true,
            error: res.data.error,
            disabled: false,
            loading: false,
            errorTitle: 'Error'
          });
        } else {
          this.done = true;
          this.setState({ progress: 100 });
          delay(1000).then(
            () => (window.location.href = encodeURI(`/vods/${res.data}`))
          );
        }
      })
      .catch(err => (this.err = err));
  };

  areStatsCreated = id => {
    API.areStatsCreated(id).then(res => {
      if (res.data !== false) {
        this.done = true;
        this.setState({ progress: 100 });
        delay(1000).then(
          () => (window.location.href = encodeURI(`/vods/${res.data}`))
        );
      }
    });
  };

  recentStats = () => {
    API.getRecentStats()
      .then(res => {
        let { previewArr, titleArr, vodIDArr } = res.data;
        let dupeArr = [];
        let previews = [];

        for (let i = 0; i < previewArr.length; i++) {
          if (!dupeArr.includes(vodIDArr[i])) {
            dupeArr.push(vodIDArr[i]);
            previews.push(
              <a key={i} href={`/vods/${vodIDArr[i]}`}>
                <ContentCard title={titleArr[i]}>
                  <img
                    src={previewArr[i]}
                    className="preview-img box-shadow"
                    alt="preview"
                  ></img>
                </ContentCard>
              </a>
            );
          }
        }

        this.setState({ previews });
      })
      .catch(err => {});
  };

  handlePreviewClick = (event, vodID) => {
    event.preventDefault();

    window.location.href = encodeURI(`/vods/${vodID}`);
  };

  render() {
    return (
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center'
        }}
      >
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center'
          }}
        >
          <input
            style={{
              width: 300,
              marginTop: 25,
              textAlign: 'center',
              borderColor: 'gray',
              borderWidth: 1,
              borderStyle: 'solid',
              borderRadius: 4
            }}
            value={this.state.currentValue}
            onChange={text => this.handleInputChange(text)}
          />
          <Button
            style={{ width: 200, marginTop: 50 }}
            disabled={this.state.disabled}
            onClick={event => this.handleClick(event)}
          >
            Generate Stats
          </Button>
          <div style={{ marginTop: 50 }}>
            {this.state.hasError && (
              <ContentCard title={this.state.errorTitle}>
                {this.state.error}
              </ContentCard>
            )}
          </div>
          {this.state.loading && (
            <TableCard>
              <h5>
                Loading vod chat data. This may take around ~5 minutes for
                longer vods.
              </h5>
              <span>Loading this vod in the future will be much faster</span>
              <ProgressBar
                animated
                min={0}
                max={100}
                now={this.state.progress}
              />
            </TableCard>
          )}
        </div>

        <TableCard title="How do I use this?">
          <div className="tutorial">
            <div className="tutorial-content">
              <img className="tutorial-image" alt="video tab" src={videoTab} />
              <span>Go to a streamer and click on the "videos" tab</span>
            </div>
            <div className="tutorial-content">
              <img className="tutorial-image" alt="url" src={urlPic} />
              <span>Copy the URL on the top to your clipboard</span>
            </div>
            <div className="tutorial-content">
              <span>Let the vod data load! </span>
            </div>
          </div>
        </TableCard>

        <TableCard title={'Recently Created Stats'}>
          <div className="preview-div">{this.state.previews}</div>
        </TableCard>

        <TableCard>
          <div className="tutorial-content">
            <span>There are a couple of caveats to be aware of:</span>
            <span>
              1. The entire chat log is given through the console, so vods with
              a very large amount of messsages might not load
            </span>
            <span>
              2. Clips cannot be loaded, make sure it's a vod! Vods always have
              an 9-digit number at the end of the URL
            </span>
            <span>Thanks for using Twitch Vod Stats!</span>
            <a href="https://github.com/DrySoldier/twitch-vod-stats">
              Github Repo
            </a>
          </div>
        </TableCard>
      </div>
    );
  }
}

export default HomePage;
