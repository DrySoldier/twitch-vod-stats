import axios from "axios";

//let localHost = 'http://localhost:3000';
let api = 'https://ngo9nlp0nf.execute-api.us-east-1.amazonaws.com/dev'

export default {
  createStats: function (id) {
    return axios.get(`${api}/${id}`);
  },
  getStats: function (id) {
    return axios.get(`${api}/vods/${id}`)
  },
  areStatsCreated: function(id){
    return axios.get(`${api}/statTest/${id}`)
  },
  getRecentStats: function(){
    return axios.get(`${api}/recentStats/recentStats`)
  }
};
