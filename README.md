# Twitch Vod Stats

## How to use: 

1.) Get the vod ID through twitch.tv, normally a 9 digit number at the end of the URL of the vod

2.) Copy and paste it into the input of the home page

3.) Click 'get stats' and wait for the server to retrieve the chat log and generate the information

4.) See some statistics of your vod!

## API Usage

For a JSON object of all the information generated, add '/api' right before vod, but before '/vods'.

For example, if your normal URL is 

`http://twitch-vod-stats.herokuapp.com/vods/409570359`

then to get the API info, change it to: 

`http://twitch-vod-stats.herokuapp.com/api/vods/409570359`

You can also leave the page and press the back button to get the normal JSON object. Simply reload the page to get rid of it. Why did I keep this feature in? Because this is an information tool, and the information should be freely used by all.

## How to run locally

You cannot. While the front-end is open-source, I have decided to make a seperate, private repo for the server.

## Built with

    bootstrap: 4.3.1,
    chart.js: 2.8.0,
    react: 16.8.6,
    react-bootstrap: 1.0.0-beta.8,
    react-chartkick: 0.3.0,
    react-dom: 16.8.6,
    react-router-dom: ^5.0.0,
    react-scripts: 2.1.8,
    react-spring: 8.0.19

## Contributing

Simply make a pull request. If you have ideas for how to make the server-side better, contact me personally via my email found on my profile.

## Acknowledgments

Made for the Fall-Spring UCF Bootcamp final project