import ApiService from "utils/apiService";
import ErrorService from "utils/errorService";
import {
  getFailureEffectsSuccess,
  addFailureEffectSuccess,
  updateFailureEffectSuccess,
  deleteFailureEffectSuccess
} from "actions/FailureEffectActions";
import { appUrls } from "constants/Urls";
import {
  singleFailureEffectNormalizer,
  failureEffectNormalizer
} from "utils/normalizers/failureModeNormalizers";

const ApiServiceInstance = new ApiService(true);
const ErrorServiceInstance = new ErrorService();

export const getFailureEffects = id => {
  const urlObject = appUrls.FAILURE_EFFECT.GETALL;
  return dispatch => {
    ApiServiceInstance[urlObject.type](
      urlObject.url.replace("{id}", id),
      (err, res) => {
        if (!err) {
          const newData = JSON.parse(res.text);
          dispatch(
            getFailureEffectsSuccess(failureEffectNormalizer(newData.result))
          );
        } else {
          ErrorServiceInstance.error(err, dispatch);
        }
      }
    );
  };
};

export const createFailureEffect = data => {
  const urlObject = appUrls.FAILURE_EFFECT.ADD;
  return dispatch => {
    ApiServiceInstance[urlObject.type](urlObject.url, data, (err, res) => {
      if (!err) {
        const newData = JSON.parse(res.text);
        dispatch(
          addFailureEffectSuccess(
            singleFailureEffectNormalizer(newData.result[0])
          )
        );
      } else {
        ErrorServiceInstance.error(err, dispatch);
      }
    });
  };
};

export const updateFailureEffect = (data, id) => {
  const urlObject = appUrls.FAILURE_EFFECT.UPDATE;
  return dispatch => {
    ApiServiceInstance[urlObject.type](
      urlObject.url.replace("{id}", id),
      data,
      (err, res) => {
        if (!err) {
          const newData = JSON.parse(res.text);
          dispatch(
            updateFailureEffectSuccess(singleFailureEffectNormalizer(newData))
          );
        } else {
          ErrorServiceInstance.error(err, dispatch);
        }
      }
    );
  };
};

export const deleteFailureEffect = id => {
  const urlObject = appUrls.FAILURE_EFFECT.DELETE;
  return dispatch => {
    ApiServiceInstance[urlObject.type](
      urlObject.url.replace("{id}", id),
      (err, res) => {
        if (!err) {
          dispatch(deleteFailureEffectSuccess(id));
        } else {
          ErrorServiceInstance.error(err, dispatch);
        }
      }
    );
  };
};
