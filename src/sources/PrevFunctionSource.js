import Request from "superagent";
import {
  getFunctionsSuccess,
  getSubFunctionsAction,
  getSubFunctionsSuccess,
  addFunctionSuccess,
  addSubFunctionSuccess
} from "actions/FunctionActions";
import { setMessage } from "actions/ProjectActions";
import { REQUEST_TIMEOUT } from "constants/AppConstants";
import { appUrls } from "constants/Urls";
import {
  functionNormalizer,
  subFunctionNormalizer,
  singleFunctionNormalizer,
  singleSubFunctionNormalizer
} from "utils/normalizers/functionNormalizers";

export const getFunctions = id => {
  const url = appUrls.FUNCTION.GETALL.replace("{id}", id);
  return dispatch => {
    Request.get(url)
      .auth("webuser", "xmYuiV90$")
      .end((err, res) => {
        if (!err) {
          const data = JSON.parse(res.text);
          dispatch(getFunctionsSuccess(functionNormalizer(data.result)));
        } else {
          const errMessage = err.response.text;
          dispatch(setMessage({ color: "danger", message: errMessage }));
        }
      });
  };
};

export const getSubFunctions = id => {
  const url = appUrls.FUNCTION.GETALLSUB.replace("{id}", id);
  return dispatch => {
    Request.get(url)
      .auth("webuser", "xmYuiV90$")
      .end((err, res) => {
        if (!err) {
          const data = JSON.parse(res.text);
          dispatch(
            getSubFunctionsSuccess(subFunctionNormalizer(data.result), id)
          );
        } else {
          const errMessage = err.response.text;
          dispatch(setMessage({ color: "danger", message: errMessage }));
        }
      });
  };
};

export const createFunction = data => {
  const url = appUrls.FUNCTION.ADD;
  return dispatch => {
    Request.post(url)
      .auth("webuser", "xmYuiV90$")
      .send(data)
      .end((err, res) => {
        if (!err) {
          const response = JSON.parse(res.text).result[0];
          console.log(data);
          dispatch(addFunctionSuccess(singleFunctionNormalizer(response)));
        } else {
          const errMessage = err.response.text;
          dispatch(setMessage({ color: "danger", message: errMessage }));
        }
      });
  };
};

export const createSubFunction = data => {
  const url = appUrls.FUNCTION.ADDSUB;
  return dispatch => {
    Request.post(url)
      .auth("webuser", "xmYuiV90$")
      .send(data)
      .end((err, res) => {
        if (!err) {
          const response = JSON.parse(res.text).result[0];
          console.log(data);
          dispatch(
            addSubFunctionSuccess(
              singleSubFunctionNormalizer(response),
              data.FunctionRID
            )
          );
        } else {
          const errMessage = err.response.text;
          dispatch(setMessage({ color: "danger", message: errMessage }));
        }
      });
  };
};
