import axios from 'axios'

const services = {
  getCoins: async (key: string) => {
    const res = await axios.get("http://api.coinlayer.com/api/list", {
      params: {
        access_key: key
      }
    });
    return res.data;
  },
}

export default services;

