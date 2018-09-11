import ApiService from "utils/apiService";
import ErrorService from "utils/errorService";
import {
  getOutputsSuccess,
  addOutputSuccess,
  updateOutputSuccess,
  deleteOutputSuccess
} from "actions/OutputActions";
import { appUrls } from "constants/Urls";
import {
  singleOutputNormalizer,
  outputNormalizer
} from "utils/normalizers/outputNormalizers";

const ApiServiceInstance = new ApiService(true);
const ErrorServiceInstance = new ErrorService();

export const getOutputs = (id, useThen) => {
  const urlObject = appUrls.OUTPUT.GETALL;
  return dispatch => {
    return ApiServiceInstance[urlObject.type](
      urlObject.url.replace("{id}", id),
      (err, res) => {
        if (!err) {
          const newData = JSON.parse(res.text);
          dispatch(getOutputsSuccess(outputNormalizer(newData.result)));
        } else {
          ErrorServiceInstance.error(err, dispatch);
        }
      },
      !useThen
    );
  };
};

export const createOutput = data => {
  const urlObject = appUrls.OUTPUT.ADD;
  return dispatch => {
    ApiServiceInstance[urlObject.type](urlObject.url, data, (err, res) => {
      if (!err) {
        const newData = JSON.parse(res.text);
        dispatch(addOutputSuccess(singleOutputNormalizer(newData.result[0])));
      } else {
        ErrorServiceInstance.error(err, dispatch);
      }
    });
  };
};

export const updateOutput = (data, id) => {
  const urlObject = appUrls.OUTPUT.UPDATE;
  return dispatch => {
    ApiServiceInstance[urlObject.type](
      urlObject.url.replace("{id}", id),
      data,
      (err, res) => {
        if (!err) {
          const newData = JSON.parse(res.text);
          dispatch(updateOutputSuccess(singleOutputNormalizer(newData)));
        } else {
          ErrorServiceInstance.error(err, dispatch);
        }
      }
    );
  };
};

export const deleteOutput = id => {
  const urlObject = appUrls.OUTPUT.DELETE;
  return dispatch => {
    ApiServiceInstance[urlObject.type](
      urlObject.url.replace("{id}", id),
      (err, res) => {
        if (!err) {
          dispatch(deleteOutputSuccess(id));
        } else {
          ErrorServiceInstance.error(err, dispatch);
        }
      }
    );
  };
};
