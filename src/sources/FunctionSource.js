import Request from "superagent";
import {
  getFunctionsSuccess,
  getSubFunctionsAction,
  getSubFunctionsSuccess
} from "actions/FunctionActions";
import { REQUEST_TIMEOUT } from "constants/AppConstants";
import { appUrls } from "constants/Urls";
import {
  functionNormalizer,
  subFunctionNormalizer
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
          const data = JSON.parse(res.text);
          console.log(data);
          // dispatch(
          //   getSubProjectsSuccess(subProjectNormalizer(data.result), id)
          // );
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
          const data = JSON.parse(res.text);
          console.log(data);
          // dispatch(
          //   getSubProjectsSuccess(subProjectNormalizer(data.result), id)
          // );
        }
      });
  };
};

export const createInput = data => {
  const url = appUrls.FUNCTION.ADDINPUT;
  return dispatch => {
    Request.post(url)
      .auth("webuser", "xmYuiV90$")
      .send(data)
      .end((err, res) => {
        if (!err) {
          const data = JSON.parse(res.text);
          console.log(data);
          // dispatch(
          //   getSubProjectsSuccess(subProjectNormalizer(data.result), id)
          // );
        }
      });
  };
};

export const createOutput = data => {
  const url = appUrls.FUNCTION.ADDOUTPUT;
  return dispatch => {
    Request.post(url)
      .auth("webuser", "xmYuiV90$")
      .send(data)
      .end((err, res) => {
        if (!err) {
          const data = JSON.parse(res.text);
          console.log(data);
          // dispatch(
          //   getSubProjectsSuccess(subProjectNormalizer(data.result), id)
          // );
        }
      });
  };
};
