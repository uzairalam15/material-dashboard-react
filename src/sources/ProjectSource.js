import Request from "superagent";
import {
  getProjectsSuccess,
  getSubProjectsSuccess,
  setProject,
  getInputsSuccess,
  getOutputsSuccess
} from "actions/ProjectActions";
import { getFunctionsSuccess } from "actions/FunctionActions";
import { REQUEST_TIMEOUT } from "constants/AppConstants";
import { appUrls } from "constants/Urls";
import {
  projectNormalizer,
  subProjectNormalizer,
  inputNormalizer,
  outputNormalizer
} from "utils/normalizers/projectNormalizers";
import { functionNormalizer } from "utils/normalizers/functionNormalizers";

export const setAndFetchProject = project => {
  const url = appUrls.FUNCTION.GETALL.replace("{id}", project.id);
  return dispatch => {
    dispatch(setProject(project));
    dispatch(getInputs(project.id));
    dispatch(getOutputs(project.id));
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

export const getInputs = id => {
  const url = appUrls.FUNCTION.GETALLINPUT.replace("{id}", id);
  return dispatch => {
    Request.get(url)
      .auth("webuser", "xmYuiV90$")
      .end((err, res) => {
        if (!err) {
          const data = JSON.parse(res.text);
          dispatch(getInputsSuccess(inputNormalizer(data.result)));
        }
      });
  };
};

export const getOutputs = id => {
  const url = appUrls.FUNCTION.GETALLOUTPUT.replace("{id}", id);
  return dispatch => {
    Request.get(url)
      .auth("webuser", "xmYuiV90$")
      .end((err, res) => {
        if (!err) {
          const data = JSON.parse(res.text);
          dispatch(getOutputsSuccess(outputNormalizer(data.result)));
        }
      });
  };
};

export const getProjects = () => {
  const url = appUrls.PROJECT.GETALL;
  return dispatch => {
    Request.get(url)
      .auth("webuser", "xmYuiV90$")
      .end((err, res) => {
        if (!err) {
          const data = JSON.parse(res.text);
          dispatch(getProjectsSuccess(projectNormalizer(data.result)));
        }
      });
  };
};

export const getSubProjects = id => {
  const url = appUrls.PROJECT.GETALLSUB.replace("{id}", id);
  return dispatch => {
    Request.get(url)
      .auth("webuser", "xmYuiV90$")
      .end((err, res) => {
        if (!err) {
          const data = JSON.parse(res.text);
          dispatch(
            getSubProjectsSuccess(subProjectNormalizer(data.result), id)
          );
        }
      });
  };
};

export const createProject = data => {
  const url = appUrls.PROJECT.ADD;
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

export const createSubProject = data => {
  const url = appUrls.PROJECT.ADDSUB;
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
