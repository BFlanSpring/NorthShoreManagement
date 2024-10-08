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

  // Individual API routes

  /** Get the current user. */

  static async getCurrentUser(username) {
    let res = await this.request(`users/${username}`);
    return res.user;
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









  

//   /** Get companies (filtered by name if not undefined) */

//   static async getCompanies(name) {
//     let res = await this.request("companies", { name });
//     return res.companies;
//   }

//   /** Get details on a company by handle. */

//   static async getCompany(handle) {
//     let res = await this.request(`companies/${handle}`);
//     return res.company;
//   }

//   /** Get list of jobs (filtered by title if not undefined) */

//   static async getJobs(title) {
//     let res = await this.request("jobs", { title });
//     return res.jobs;
//   }

//   /** Apply to a job */

//   static async applyToJob(username, id) {
//     await this.request(`users/${username}/jobs/${id}`, {}, "post");
//   }


//   static async getSavedStocks(username) {
//     try {
//       const res = await this.request(`users/${username}/savedStocks`);
//       return res; // Access the savedStocks property of the response
//     } catch (err) {
//       console.error("Error fetching saved stocks:", err);
//       throw err; // Throw the error to be handled by the caller
//     }
//   }
  

//   static async addSavedStock(username, symbol) {
//     let res = await this.request(
//       `users/${username}/savedStocks`,
//       { symbol },
//       "post"
//     );
//     return res.added;
//   }

//   static async removeSavedStock(username, savedStockId) {
//     let res = await this.request(
//       `users/${username}/savedStocks/${savedStockId}`,
//       {},
//       "delete"
//     );
//     return res.deleted;
//   }
}


export default BackendApi;