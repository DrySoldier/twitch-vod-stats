import axios from "axios";

export default {
  createStats: function (id) {
    console.log('create stats');

    return axios.get(`https://ngo9nlp0nf.execute-api.us-east-1.amazonaws.com/dev/${id}`);
  },
  getStats: function (id) {
    console.log('get stats')
    return axios.get(`https://ngo9nlp0nf.execute-api.us-east-1.amazonaws.com/dev/vods/${id}`)
  }
};
