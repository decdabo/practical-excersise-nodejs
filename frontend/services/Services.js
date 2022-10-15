import axios from "axios";

class Services {
  constructor() {
    this.HTTP = axios.create({
      baseURL: '/game/',
      timeout: 5000,
      headers:{
        'Content-Type':'application/json'
      }
    });
  }
  async createGame(data) {
    const res = await this.HTTP.request({
      method: 'POST',
      url: 'createGame',
      data
    });

    return res.data;
  }

  async getGameInfo(id) {
    const res = await this.HTTP.request({ method: 'GET', url: id });

    return res.data;
  }
 
  async makeBet(id, data) {
    const res = await this.HTTP.request({
      method: 'PUT',
      url: id,
      data
    });

    return res.data;
  }
}

export default Services;
