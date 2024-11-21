export class Form {
  constructor(baseURL) {
    this.baseURL = baseURL;
  }

  async sendGetRequest(endpoint, data = {}) {
    try {
      const response = await axios({
        method: 'post',
        url: `${this.baseURL}${endpoint}`,
        data: data, 
        headers: {
          'Content-Type': 'application/json'
        }
      });
      return response.data; // Retorna la respuesta en formato JSON
    } catch (error) {
      console.error('Error en la petición POST:', error.message);
      throw error;
    }
  }

  async sedGetUser(endpoint) {
    try {
      const response = await axios({
        method: 'get',
        url:`${this.baseURL}${endpoint}`
      });
      return response.data;
    } catch (error) {
      console.error('Error en la petición GET:', error.message);
      throw error;
    }
  }



}

