import ApiService from "utils/apiService";
import ErrorService from "utils/errorService";
import {
  getInputsSuccess,
  addInputSuccess,
  updateInputSuccess,
  deleteInputSuccess
} from "actions/InputActions";
import { appUrls } from "constants/Urls";
import {
  singleInputNormalizer,
  inputNormalizer
} from "utils/normalizers/inputNormalizers";

const ApiServiceInstance = new ApiService(true);
const ErrorServiceInstance = new ErrorService();

export const getInputs = id => {
  const urlObject = appUrls.INPUT.GETALL;
  return dispatch => {
    ApiServiceInstance[urlObject.type](
      urlObject.url.replace("{id}", id),
      (err, res) => {
        if (!err) {
          const newData = JSON.parse(res.text);
          dispatch(getInputsSuccess(inputNormalizer(newData.result)));
        } else {
          ErrorServiceInstance.error(err, dispatch);
        }
      }
    );
  };
};

export const createInput = data => {
  const urlObject = appUrls.INPUT.ADD;
  return dispatch => {
    ApiServiceInstance[urlObject.type](urlObject.url, data, (err, res) => {
      if (!err) {
        const newData = JSON.parse(res.text);
        dispatch(addInputSuccess(singleInputNormalizer(newData.result[0])));
      } else {
        ErrorServiceInstance.error(err, dispatch);
      }
    });
  };
};

export const updateInput = (data, id) => {
  const urlObject = appUrls.INPUT.UPDATE;
  return dispatch => {
    ApiServiceInstance[urlObject.type](
      urlObject.url.replace("{id}", id),
      data,
      (err, res) => {
        if (!err) {
          const newData = JSON.parse(res.text);
          dispatch(updateInputSuccess(singleInputNormalizer(newData)));
        } else {
          ErrorServiceInstance.error(err, dispatch);
        }
      }
    );
  };
};

export const deleteInput = id => {
  const urlObject = appUrls.INPUT.DELETE;
  return dispatch => {
    ApiServiceInstance[urlObject.type](
      urlObject.url.replace("{id}", id),
      (err, res) => {
        if (!err) {
          dispatch(deleteInputSuccess(id));
        } else {
          ErrorServiceInstance.error(err, dispatch);
        }
      }
    );
  };
};
