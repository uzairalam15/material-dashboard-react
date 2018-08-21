import ApiService from "utils/apiService";
import ErrorService from "utils/errorService";
import {
  getFunctionsSuccess,
  addFunctionSuccess,
  updateFunctionSuccess,
  deleteFunctionSuccess
} from "actions/FunctionActions";
import { appUrls } from "constants/Urls";
import {
  singleFunctionNormalizer,
  functionNormalizer
} from "utils/normalizers/functionNormalizers";

const ApiServiceInstance = new ApiService(true);
const ErrorServiceInstance = new ErrorService();

export const getFunctions = id => {
  const urlObject = appUrls.FUNCTION.GETALL;
  return dispatch => {
    ApiServiceInstance[urlObject.type](
      urlObject.url.replace("{id}", id),
      (err, res) => {
        if (!err) {
          const newData = JSON.parse(res.text);
          dispatch(getFunctionsSuccess(functionNormalizer(newData.result)));
        } else {
          ErrorServiceInstance.error(err, dispatch);
        }
      }
    );
  };
};

export const createFunction = data => {
  const urlObject = appUrls.FUNCTION.ADD;
  return dispatch => {
    ApiServiceInstance[urlObject.type](urlObject.url, data, (err, res) => {
      if (!err) {
        const newData = JSON.parse(res.text);
        dispatch(
          addFunctionSuccess(singleFunctionNormalizer(newData.result[0]))
        );
      } else {
        ErrorServiceInstance.error(err, dispatch);
      }
    });
  };
};

export const updateFunction = (data, id) => {
  const urlObject = appUrls.FUNCTION.UPDATE;
  return dispatch => {
    ApiServiceInstance[urlObject.type](
      urlObject.url.replace("{id}", id),
      data,
      (err, res) => {
        if (!err) {
          const newData = JSON.parse(res.text);
          dispatch(updateFunctionSuccess(singleFunctionNormalizer(newData)));
        } else {
          ErrorServiceInstance.error(err, dispatch);
        }
      }
    );
  };
};

export const deleteFunction = id => {
  const urlObject = appUrls.FUNCTION.DELETE;
  return dispatch => {
    ApiServiceInstance[urlObject.type](
      urlObject.url.replace("{id}", id),
      (err, res) => {
        if (!err) {
          dispatch(deleteFunctionSuccess(id));
        } else {
          ErrorServiceInstance.error(err, dispatch);
        }
      }
    );
  };
};
