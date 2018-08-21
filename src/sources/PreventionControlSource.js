import ApiService from "utils/apiService";
import ErrorService from "utils/errorService";
import {
  getPreventionControlsSuccess,
  addPreventionControlSuccess,
  updatePreventionControlSuccess,
  deletePreventionControlSuccess
} from "actions/PreventionControlActions";
import { appUrls } from "constants/Urls";
import {
  singlePreventionControlNormalizer,
  preventionControlNormalizer
} from "utils/normalizers/failureModeNormalizers";

const ApiServiceInstance = new ApiService(true);
const ErrorServiceInstance = new ErrorService();

export const getPreventionControls = id => {
  const urlObject = appUrls.PREVENTION_CONTROL.GETALL;
  return dispatch => {
    ApiServiceInstance[urlObject.type](
      urlObject.url.replace("{id}", id),
      (err, res) => {
        if (!err) {
          const newData = JSON.parse(res.text);
          dispatch(
            getPreventionControlsSuccess(
              preventionControlNormalizer(newData.result)
            )
          );
        } else {
          ErrorServiceInstance.error(err, dispatch);
        }
      }
    );
  };
};

export const createPreventionControl = data => {
  const urlObject = appUrls.PREVENTION_CONTROL.ADD;
  return dispatch => {
    ApiServiceInstance[urlObject.type](urlObject.url, data, (err, res) => {
      if (!err) {
        const newData = JSON.parse(res.text);
        dispatch(
          addPreventionControlSuccess(
            singlePreventionControlNormalizer(newData.result[0])
          )
        );
      } else {
        ErrorServiceInstance.error(err, dispatch);
      }
    });
  };
};

export const updatePreventionControl = (data, id) => {
  const urlObject = appUrls.PREVENTION_CONTROL.UPDATE;
  return dispatch => {
    ApiServiceInstance[urlObject.type](
      urlObject.url.replace("{id}", id),
      data,
      (err, res) => {
        if (!err) {
          const newData = JSON.parse(res.text);
          dispatch(
            updatePreventionControlSuccess(
              singlePreventionControlNormalizer(newData)
            )
          );
        } else {
          ErrorServiceInstance.error(err, dispatch);
        }
      }
    );
  };
};

export const deletePreventionControl = id => {
  const urlObject = appUrls.PREVENTION_CONTROL.DELETE;
  return dispatch => {
    ApiServiceInstance[urlObject.type](
      urlObject.url.replace("{id}", id),
      (err, res) => {
        if (!err) {
          dispatch(deletePreventionControlSuccess(id));
        } else {
          ErrorServiceInstance.error(err, dispatch);
        }
      }
    );
  };
};
