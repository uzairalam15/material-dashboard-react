import { setMessage } from "actions/SharedActions";

export default class ErrorService {
  constructor(messsage) {
    this.message = messsage;
  }

  error(err, dispatch) {
    const errMessage = err.response ? err.response.text : err.message;
    dispatch(setMessage({ color: "danger", message: errMessage }));
  }
  success(message, dispatch) {
    dispatch(setMessage({ color: "success", message: message }));
  }
}
