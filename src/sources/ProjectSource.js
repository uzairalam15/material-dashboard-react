import Request from "superagent";
import {
  getProjectsSuccess,
  addProjectSuccess,
  addInputSuccess,
  addOutputSuccess,
  updateInputSuccess,
  updateOutputSuccess,
  addSubProjectSuccess,
  getSubProjectsSuccess,
  setProject,
  getInputsSuccess,
  getOutputsSuccess,
  getFailureModesSuccess,
  toggleLoader,
  addFailureModeSuccess,
  addFailureCauseSuccess,
  addFailureEffectSuccess,
  getFailureCausesSuccess,
  getFailureEffectsSuccess,
  setMessage
} from "actions/ProjectActions";
import {
  getFunctionsSuccess,
  addFunctionSuccess
} from "actions/FunctionActions";
import { REQUEST_TIMEOUT } from "constants/AppConstants";
import { appUrls } from "constants/Urls";
import {
  projectNormalizer,
  singleProjectNormalizer,
  subProjectNormalizer,
  singleSubProjectNormalizer,
  singleInputNormalizer,
  singleOutputNormalizer,
  inputNormalizer,
  outputNormalizer,
  failureModeNormalizer,
  singleModeNormalizer,
  failureCauseNormalizer,
  failureEffectNormalizer
} from "utils/normalizers/projectNormalizers";
import { functionNormalizer } from "utils/normalizers/functionNormalizers";

export const setAndFetchProject = project => {
  const url = appUrls.FUNCTION.GETALL.replace("{id}", project.id);
  return dispatch => {
    dispatch(setProject(project));
    Request.get(url)
      .auth("webuser", "xmYuiV90$")
      .end((err, res) => {
        if (!err) {
          const data = JSON.parse(res.text);
          dispatch(getFunctionsSuccess(functionNormalizer(data.result)));
        } else {
          const errMessage = err.response.text;
          dispatch(setMessage({ color: "danger", message: errMessage }));
        }
      });
  };
};

export const getInputs = id => {
  const url = appUrls.FUNCTION.GETALLINPUT.replace("{id}", id);
  return dispatch => {
    dispatch(toggleLoader());
    Request.get(url)
      .auth("webuser", "xmYuiV90$")
      .end((err, res) => {
        if (!err) {
          const data = JSON.parse(res.text);
          dispatch(getInputsSuccess(inputNormalizer(data.result)));
        } else {
          const errMessage = err.response.text;
          dispatch(setMessage({ color: "danger", message: errMessage }));
        }
      });
  };
};

export const getOutputs = id => {
  const url = appUrls.FUNCTION.GETALLOUTPUT.replace("{id}", id);
  return dispatch => {
    dispatch(toggleLoader());
    Request.get(url)
      .auth("webuser", "xmYuiV90$")
      .end((err, res) => {
        if (!err) {
          const data = JSON.parse(res.text);
          dispatch(getOutputsSuccess(outputNormalizer(data.result)));
        } else {
          const errMessage = err.response.text;
          dispatch(setMessage({ color: "danger", message: errMessage }));
        }
      });
  };
};

export const getFailureModes = id => {
  const url = appUrls.FUNCTION.GETALLFAILUREMODES.replace("{id}", id);
  return dispatch => {
    dispatch(toggleLoader());
    Request.get(url)
      .auth("webuser", "xmYuiV90$")
      .end((err, res) => {
        if (!err) {
          const data = JSON.parse(res.text);
          dispatch(getFailureModesSuccess(failureModeNormalizer(data.result)));
        } else {
          const errMessage = err.response.text;
          dispatch(setMessage({ color: "danger", message: errMessage }));
        }
      });
  };
};

export const getFailureEffects = id => {
  const url = appUrls.FUNCTION.GETALLFAILUREEFFECTS.replace("{id}", id);
  return dispatch => {
    Request.get(url)
      .auth("webuser", "xmYuiV90$")
      .end((err, res) => {
        if (!err) {
          const data = JSON.parse(res.text);
          dispatch(
            getFailureEffectsSuccess(failureEffectNormalizer(data.result), id)
          );
        } else {
          const errMessage = err.response.text;
          dispatch(setMessage({ color: "danger", message: errMessage }));
        }
      });
  };
};

export const getFailureCauses = id => {
  const url = appUrls.FUNCTION.GETALLFAILURECAUSES.replace("{id}", id);
  return dispatch => {
    Request.get(url)
      .auth("webuser", "xmYuiV90$")
      .end((err, res) => {
        if (!err) {
          const data = JSON.parse(res.text);
          dispatch(
            getFailureCausesSuccess(failureCauseNormalizer(data.result), id)
          );
        } else {
          const errMessage = err.response.text;
          dispatch(setMessage({ color: "danger", message: errMessage }));
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
        } else {
          const errMessage = err.response.text;
          dispatch(setMessage({ color: "danger", message: errMessage }));
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
        } else {
          const errMessage = err.response.text;
          dispatch(setMessage({ color: "danger", message: errMessage }));
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
          const response = JSON.parse(res.text).result[0];
          console.log(response);
          dispatch(addProjectSuccess(singleProjectNormalizer(response)));
        } else {
          const errMessage = err.response.text;
          dispatch(setMessage({ color: "danger", message: errMessage }));
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
          const response = JSON.parse(res.text).result[0];
          console.log(response);
          dispatch(
            addSubProjectSuccess(
              singleSubProjectNormalizer(response),
              data.ProjectRID
            )
          );
        } else {
          const errMessage = err.response.text;
          dispatch(setMessage({ color: "danger", message: errMessage }));
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
          const response = JSON.parse(res.text).result[0];
          console.log(response);
          dispatch(addInputSuccess(singleInputNormalizer(response)));
        } else {
          const errMessage = err.response.text;
          dispatch(setMessage({ color: "danger", message: errMessage }));
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
          const response = JSON.parse(res.text).result[0];
          console.log(response);
          dispatch(addOutputSuccess(singleOutputNormalizer(response)));
        } else {
          const errMessage = err.response.text;
          dispatch(setMessage({ color: "danger", message: errMessage }));
        }
      });
  };
};

export const createFailureMode = data => {
  const url = appUrls.FUNCTION.ADDFAILUREMODE;
  return dispatch => {
    Request.post(url)
      .auth("webuser", "xmYuiV90$")
      .send(data)
      .end((err, res) => {
        if (!err) {
          const response = JSON.parse(res.text).result[0];
          console.log(response);
          dispatch(addFailureModeSuccess(singleModeNormalizer(response)));
        } else {
          const errMessage = err.response.text;
          dispatch(setMessage({ color: "danger", message: errMessage }));
        }
      });
  };
};

export const createFailureEffect = data => {
  const url = appUrls.FUNCTION.ADDFAILUREEFFECT;
  return dispatch => {
    Request.post(url)
      .auth("webuser", "xmYuiV90$")
      .send(data)
      .end((err, res) => {
        if (!err) {
          const response = JSON.parse(res.text).result[0];
          console.log(response);
          dispatch(
            addFailureEffectSuccess(
              singleModeNormalizer(response),
              data.FailureModeRID
            )
          );
        } else {
          const errMessage = err.response.text;
          dispatch(setMessage({ color: "danger", message: errMessage }));
        }
      });
  };
};

export const createFailureCause = data => {
  const url = appUrls.FUNCTION.ADDFAILURECAUSE;
  return dispatch => {
    Request.post(url)
      .auth("webuser", "xmYuiV90$")
      .send(data)
      .end((err, res) => {
        if (!err) {
          const response = JSON.parse(res.text).result[0];
          console.log(response);
          dispatch(
            addFailureCauseSuccess(
              singleModeNormalizer(response),
              data.FailureModeRID
            )
          );
        } else {
          const errMessage = err.response.text;
          dispatch(setMessage({ color: "danger", message: errMessage }));
        }
      });
  };
};
