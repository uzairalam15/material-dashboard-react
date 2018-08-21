import ApiService from "utils/apiService";
import ErrorService from "utils/errorService";
import {
  getFailureCausesSuccess,
  addFailureCauseSuccess,
  updateFailureCauseSuccess,
  deleteFailureCauseSuccess
} from "actions/FailureCauseActions";
import { appUrls } from "constants/Urls";
import {
  singleFailureCauseNormalizer,
  failureCauseNormalizer
} from "utils/normalizers/failureModeNormalizers";

const ApiServiceInstance = new ApiService(true);
const ErrorServiceInstance = new ErrorService();

export const getFailureCauses = id => {
  const urlObject = appUrls.FAILURE_CAUSE.GETALL;
  return dispatch => {
    ApiServiceInstance[urlObject.type](
      urlObject.url.replace("{id}", id),
      (err, res) => {
        if (!err) {
          const newData = JSON.parse(res.text);
          dispatch(
            getFailureCausesSuccess(failureCauseNormalizer(newData.result))
          );
        } else {
          ErrorServiceInstance.error(err, dispatch);
        }
      }
    );
  };
};

export const createFailureCause = data => {
  const urlObject = appUrls.FAILURE_CAUSE.ADD;
  return dispatch => {
    ApiServiceInstance[urlObject.type](urlObject.url, data, (err, res) => {
      if (!err) {
        const newData = JSON.parse(res.text);
        dispatch(
          addFailureCauseSuccess(
            singleFailureCauseNormalizer(newData.result[0])
          )
        );
      } else {
        ErrorServiceInstance.error(err, dispatch);
      }
    });
  };
};

export const updateFailureCause = (data, id) => {
  const urlObject = appUrls.FAILURE_CAUSE.UPDATE;
  return dispatch => {
    ApiServiceInstance[urlObject.type](
      urlObject.url.replace("{id}", id),
      data,
      (err, res) => {
        if (!err) {
          const newData = JSON.parse(res.text);
          dispatch(
            updateFailureCauseSuccess(singleFailureCauseNormalizer(newData))
          );
        } else {
          ErrorServiceInstance.error(err, dispatch);
        }
      }
    );
  };
};

export const deleteFailureCause = id => {
  const urlObject = appUrls.FAILURE_CAUSE.DELETE;
  return dispatch => {
    ApiServiceInstance[urlObject.type](
      urlObject.url.replace("{id}", id),
      (err, res) => {
        if (!err) {
          dispatch(deleteFailureCauseSuccess(id));
        } else {
          ErrorServiceInstance.error(err, dispatch);
        }
      }
    );
  };
};
