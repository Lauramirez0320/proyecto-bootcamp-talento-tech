export class Form {
  constructor(baseURL) {
    this.baseURL = baseURL;
  }

  async sendGetRequest(endpoint, data = {}) {
    try {
      const response = await axios({
        method: 'get',
        url: `${this.baseURL}${endpoint}`,
        params: data, 
      });
      return response.data; // Retorna la respuesta en formato JSON
    } catch (error) {
      console.error('Error en la petición GET:', error.message);
      throw error;
    }
  }
}

