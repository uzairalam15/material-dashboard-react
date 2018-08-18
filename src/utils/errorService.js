import { setMessage } from "actions/ProjectActions";

export default class ErrorService {
  constructor() {}

  error(err, dispatch) {
    const errMessage = err.response.text;
    dispatch(setMessage({ color: "danger", message: errMessage }));
  }
  success(message, dispatch) {
    dispatch(setMessage({ color: "success", message: message }));
  }
}
