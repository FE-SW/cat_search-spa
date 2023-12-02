const API_ENDPOINT = "https://q9d70f82kd.execute-api.ap-northeast-2.amazonaws.com/dev";

export const api = {
  fetchCats: async keyword => {
    try {
      const response = await fetch(`${API_ENDPOINT}/api/cats/search?q=${keyword}`);
      return await response.json();
    } catch (error) {
      console.log(error);
    }
  },

  random: async () => {
    try {
      const response = await fetch(`${API_ENDPOINT}/api/cats/random50`);
      return await response.json();
    } catch (error) {
      console.log(error);
    }
  },

  cat: async id => {
    try {
      const response = await fetch(`${API_ENDPOINT}/api/cats/${id}`);
      if (!response.ok) {
        throw new Error(`Error: ${response.statusText}`);
      }
      return await response.json();
    } catch (error) {
      console.log(error);
    }
  }
};
