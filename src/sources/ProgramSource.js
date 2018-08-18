import ApiService from "utils/apiService";
import ErrorService from "utils/errorService";
import {
  getProgramsSuccess,
  addProgramSuccess,
  updateProgramSuccess,
  deleteProgramSuccess
} from "actions/ProgramActions";
import { appUrls } from "constants/Urls";
import {
  singleProgramNormalizer,
  normalizePrograms
} from "utils/normalizers/programNormalizers";

const ApiServiceInstance = new ApiService(true);
const ErrorServiceInstance = new ErrorService();

export const getPrograms = () => {
  const urlObject = appUrls.PROGRAM.GETALL;
  return dispatch => {
    ApiServiceInstance[urlObject.type](urlObject.url, (err, res) => {
      if (!err) {
        const newData = JSON.parse(res.text);
        dispatch(getProgramsSuccess(normalizePrograms(newData.result)));
      } else {
        ErrorServiceInstance.error(err, dispatch);
      }
    });
  };
};

export const createProgram = data => {
  const urlObject = appUrls.PROGRAM.ADD;
  return dispatch => {
    ApiServiceInstance[urlObject.type](urlObject.url, data, (err, res) => {
      if (!err) {
        const newData = JSON.parse(res.text);
        dispatch(addProgramSuccess(singleProgramNormalizer(newData.result[0])));
      } else {
        ErrorServiceInstance.error(err, dispatch);
      }
    });
  };
};

export const updateProgram = (data, id) => {
  const urlObject = appUrls.PROGRAM.UPDATE;
  return dispatch => {
    ApiServiceInstance[urlObject.type](
      urlObject.url.replace("{id}", id),
      data,
      (err, res) => {
        if (!err) {
          const newData = JSON.parse(res.text);
          dispatch(updateProgramSuccess(singleProgramNormalizer(newData)));
        } else {
          ErrorServiceInstance.error(err, dispatch);
        }
      }
    );
  };
};

export const deleteProgram = id => {
  const urlObject = appUrls.PROGRAM.DELETE;
  return dispatch => {
    ApiServiceInstance[urlObject.type](
      urlObject.url.replace("{id}", id),
      (err, res) => {
        if (!err) {
          dispatch(deleteProgramSuccess(id));
        } else {
          ErrorServiceInstance.error(err, dispatch);
        }
      }
    );
  };
};
