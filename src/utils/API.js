import axios from "axios";

let localHost = 'http://localhost:3000/';
let api = 'https://ngo9nlp0nf.execute-api.us-east-1.amazonaws.com/dev'

export default {
  createStats: function (id) {
    console.log('create stats');

    return axios.get(`${api}/${id}`);
  },
  getStats: function (id) {
    console.log('get stats')
    return axios.get(`${api}/vods/${id}`)
  },
  areStatsCreated: function(id){
    console.log('are stats created');
    return axios.get(`${api}/statTest/${id}`)
  }
};
