import axios from "axios";

const BASE_URL = process.env.REACT_APP_BASE_URL || "http://localhost:3001";

class BackendApi {
  static token;

  static async request(endpoint, data = {}, method = "get") {
    console.debug("API Call:", endpoint, data, method);

    const url = `${BASE_URL}/${endpoint}`;
    const headers = { Authorization: `Bearer ${BackendApi.token}` };
    const params = (method === "get")
        ? data
        : {};

    try {
      return (await axios({ url, method, data, params, headers })).data;
    } catch (err) {
      console.error("API Error:", err.response);
      let message = err.response.data.error.message;
      throw Array.isArray(message) ? message : [message];
    }
  }

  // New method to fetch data from the FRED API or similar external APIs
  static async fetchFredData(seriesId) {
    try {
      const response = await axios.get(`${BASE_URL}/api/fred-data`, {
        params: { seriesId },
      });
      return response.data.data;
    } catch (error) {
      console.error('Error fetching FRED data:', error);
      throw error;
    }
  }


  // Individual API routes
 
      static async fetchFinancialData(symbol, start, end) {
        try {
          const params = { symbol };
          if (start && end) {
            params.start = start;
            params.end = end;
          }
          const response = await axios.get(`${BASE_URL}/forex/data`, { params });
          return response.data.data;
        } catch (error) {
          console.error('Error fetching financial data:', error);
          throw error;
        }
      }
  

  /** Scraping function */

  static async fetchStockPrice(symbol) {
    try {
      const response = await axios.get(`${BASE_URL}/scrape/stock-price?symbol=${symbol}`);
      return response.data.data;
    } catch (error) {
      console.error('Error fetching stock price:', error);
      throw error;
    }
  }

  /** Get the current user. */

  static async getCurrentUser(username) {
    let res = await this.request(`users/${username}`);
    return res.user;
  }

  /** Get companies (filtered by name if not undefined) */

  static async getCompanies(name) {
    let res = await this.request("companies", { name });
    return res.companies;
  }

  /** Get details on a company by handle. */

  static async getCompany(handle) {
    let res = await this.request(`companies/${handle}`);
    return res.company;
  }

  /** Get list of jobs (filtered by title if not undefined) */

  static async getJobs(title) {
    let res = await this.request("jobs", { title });
    return res.jobs;
  }

  /** Apply to a job */

  static async applyToJob(username, id) {
    await this.request(`users/${username}/jobs/${id}`, {}, "post");
  }

  /** Get token for login from username, password. */

  static async login(data) {
    let res = await this.request(`auth/token`, data, "post");
    return res.token;
  }

  /** Signup for site. */

  static async signup(data) {
    let res = await this.request(`auth/register`, data, "post");
    return res.token;
  }

  /** Save user profile page. */

  static async saveProfile(username, data) {
    let res = await this.request(`users/${username}`, data, "patch");
    return res.user;
  }


}


export default BackendApi;