import ApiService from "utils/apiService";
import ErrorService from "utils/errorService";
import {
  getNoiseFactorsSuccess,
  addNoiseFactorSuccess,
  updateNoiseFactorSuccess,
  deleteNoiseFactorSuccess
} from "actions/NoiseFactorActions";
import { appUrls } from "constants/Urls";
import {
  singleNoiseFactorNormalizer,
  noiseFactorNormalizer
} from "utils/normalizers/failureModeNormalizers";

const ApiServiceInstance = new ApiService(true);
const ErrorServiceInstance = new ErrorService();

export const getNoiseFactors = id => {
  const urlObject = appUrls.NOISE_FACTOR.GETALL;
  return dispatch => {
    ApiServiceInstance[urlObject.type](
      urlObject.url.replace("{id}", id),
      (err, res) => {
        if (!err) {
          const newData = JSON.parse(res.text);
          dispatch(
            getNoiseFactorsSuccess(noiseFactorNormalizer(newData.result))
          );
        } else {
          ErrorServiceInstance.error(err, dispatch);
        }
      }
    );
  };
};

export const createNoiseFactor = data => {
  const urlObject = appUrls.NOISE_FACTOR.ADD;
  return dispatch => {
    ApiServiceInstance[urlObject.type](urlObject.url, data, (err, res) => {
      if (!err) {
        const newData = JSON.parse(res.text);
        dispatch(
          addNoiseFactorSuccess(singleNoiseFactorNormalizer(newData.result[0]))
        );
      } else {
        ErrorServiceInstance.error(err, dispatch);
      }
    });
  };
};

export const updateNoiseFactor = (data, id) => {
  const urlObject = appUrls.NOISE_FACTOR.UPDATE;
  return dispatch => {
    ApiServiceInstance[urlObject.type](
      urlObject.url.replace("{id}", id),
      data,
      (err, res) => {
        if (!err) {
          const newData = JSON.parse(res.text);
          dispatch(
            updateNoiseFactorSuccess(singleNoiseFactorNormalizer(newData))
          );
        } else {
          ErrorServiceInstance.error(err, dispatch);
        }
      }
    );
  };
};

export const deleteNoiseFactor = id => {
  const urlObject = appUrls.NOISE_FACTOR.DELETE;
  return dispatch => {
    ApiServiceInstance[urlObject.type](
      urlObject.url.replace("{id}", id),
      (err, res) => {
        if (!err) {
          dispatch(deleteNoiseFactorSuccess(id));
        } else {
          ErrorServiceInstance.error(err, dispatch);
        }
      }
    );
  };
};
