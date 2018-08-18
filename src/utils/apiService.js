import Request from "superagent";
import { authParams } from "constants/Urls";

export default class ApiService {
  constructor(isAuth) {
    this.isAuth = isAuth;
    this.request = Request;
  }
  post(url, data, callback) {
    return this.request
      .post(url)
      .auth(authParams.user, authParams.password)
      .send(data)
      .end(callback);
  }
  put(url, data, callback) {
    return this.request
      .put(url)
      .auth(authParams.user, authParams.password)
      .send(data)
      .end(callback);
  }
  delete(url, callback) {
    return this.request
      .delete(url)
      .auth(authParams.user, authParams.password)
      .end(callback);
  }
  get(url, callback) {
    return this.request
      .get(url)
      .auth(authParams.user, authParams.password)
      .end(callback);
  }
}
