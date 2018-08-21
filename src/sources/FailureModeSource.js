import ApiService from "utils/apiService";
import ErrorService from "utils/errorService";
import {
  getFailureModesSuccess,
  addFailureModeSuccess,
  updateFailureModeSuccess,
  deleteFailureModeSuccess
} from "actions/FailureModeActions";
import { appUrls } from "constants/Urls";
import {
  singleModeNormalizer,
  failureModeNormalizer
} from "utils/normalizers/failureModeNormalizers";

const ApiServiceInstance = new ApiService(true);
const ErrorServiceInstance = new ErrorService();

export const getFailureModes = id => {
  const urlObject = appUrls.FAILURE_MODE.GETALL;
  return dispatch => {
    ApiServiceInstance[urlObject.type](
      urlObject.url.replace("{id}", id),
      (err, res) => {
        if (!err) {
          const newData = JSON.parse(res.text);
          dispatch(
            getFailureModesSuccess(failureModeNormalizer(newData.result))
          );
        } else {
          ErrorServiceInstance.error(err, dispatch);
        }
      }
    );
  };
};

export const createFailureMode = data => {
  const urlObject = appUrls.FAILURE_MODE.ADD;
  return dispatch => {
    ApiServiceInstance[urlObject.type](urlObject.url, data, (err, res) => {
      if (!err) {
        const newData = JSON.parse(res.text);
        dispatch(
          addFailureModeSuccess(singleModeNormalizer(newData.result[0]))
        );
      } else {
        ErrorServiceInstance.error(err, dispatch);
      }
    });
  };
};

export const updateFailureMode = (data, id) => {
  const urlObject = appUrls.FAILURE_MODE.UPDATE;
  return dispatch => {
    ApiServiceInstance[urlObject.type](
      urlObject.url.replace("{id}", id),
      data,
      (err, res) => {
        if (!err) {
          const newData = JSON.parse(res.text);
          dispatch(updateFailureModeSuccess(singleModeNormalizer(newData)));
        } else {
          ErrorServiceInstance.error(err, dispatch);
        }
      }
    );
  };
};

export const deleteFailureMode = id => {
  const urlObject = appUrls.FAILURE_MODE.DELETE;
  return dispatch => {
    ApiServiceInstance[urlObject.type](
      urlObject.url.replace("{id}", id),
      (err, res) => {
        if (!err) {
          dispatch(deleteFailureModeSuccess(id));
        } else {
          ErrorServiceInstance.error(err, dispatch);
        }
      }
    );
  };
};
