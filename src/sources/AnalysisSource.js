import ApiService from "utils/apiService";
import ErrorService from "utils/errorService";
import { appUrls } from "constants/Urls";
import { inputNormalizer } from "utils/normalizers/inputNormalizers";
import { outputNormalizer } from "utils/normalizers/outputNormalizers";
import { failureModeNormalizer } from "utils/normalizers/failureModeNormalizers";
import { failureCauseNormalizer } from "utils/normalizers/failureModeNormalizers";
import { failureEffectNormalizer } from "utils/normalizers/failureModeNormalizers";
import { setFunctionData } from "actions/ItemActions";
import { toggleLoader } from "actions/ProjectActions";

const ApiServiceInstance = new ApiService(true);
const ErrorServiceInstance = new ErrorService();

const getInputs = function(id) {
  return new Promise((resolve, reject) => {
    const urlObject = appUrls.INPUT.GETALL;
    ApiServiceInstance[urlObject.type](
      urlObject.url.replace("{id}", id),
      (err, res) => {
        if (!err) {
          const newData = JSON.parse(res.text);
          const data = inputNormalizer(newData.result);
          resolve(data);
        } else {
          reject(err);
        }
      }
    );
  });
};

const getOutputs = function(id) {
  return new Promise((resolve, reject) => {
    const urlObject = appUrls.OUTPUT.GETALL;
    ApiServiceInstance[urlObject.type](
      urlObject.url.replace("{id}", id),
      (err, res) => {
        if (!err) {
          const newData = JSON.parse(res.text);
          const data = outputNormalizer(newData.result);
          resolve(data);
        } else {
          reject(err);
        }
      }
    );
  });
};

const getFailureModes = id => {
  return new Promise((resolve, reject) => {
    const urlObject = appUrls.FAILURE_MODE.GETALL;
    ApiServiceInstance[urlObject.type](
      urlObject.url.replace("{id}", id),
      (err, res) => {
        if (!err) {
          const newData = JSON.parse(res.text);
          const data = failureModeNormalizer(newData.result);
          resolve(data);
        } else {
          reject(err);
        }
      }
    );
  });
};

const getFailureEffects = id => {
  return new Promise((resolve, reject) => {
    const urlObject = appUrls.FAILURE_EFFECT.GETALL;
    ApiServiceInstance[urlObject.type](
      urlObject.url.replace("{id}", id),
      (err, res) => {
        if (!err) {
          const newData = JSON.parse(res.text);
          const effects = failureEffectNormalizer(newData.result);
          resolve(effects);
        } else {
          reject(err);
        }
      }
    );
  });
};

export const getFailureCauses = id => {
  return new Promise((resolve, reject) => {
    const urlObject = appUrls.FAILURE_CAUSE.GETALL;
    ApiServiceInstance[urlObject.type](
      urlObject.url.replace("{id}", id),
      (err, res) => {
        if (!err) {
          const newData = JSON.parse(res.text);
          const data = failureCauseNormalizer(newData.result);
          resolve(data);
        } else {
          reject(err);
        }
      }
    );
  });
};

const getAllFailureModesPromiseArray = outputs => {
  return outputs.map(output => {
    return getFailureModes(output.id);
  });
};

const getAllFailureEffectsPromiseArray = outputs => {
  return outputs.map(output => {
    return getFailureEffects(output.id);
  });
};

const getAllFailureCausesPromiseArray = outputs => {
  return outputs.map(output => {
    return getFailureCauses(output.id);
  });
};

const getAllEffectsAndCauses = modes => {
  return Promise.all([
    Promise.all(getAllFailureEffectsPromiseArray(modes)),
    Promise.all(getAllFailureCausesPromiseArray(modes))
  ]);
};

const loadAllFailureModesData = outputsModes => {
  const array = outputsModes.map(singleOutputModes => {
    if (singleOutputModes.length) {
      return getAllEffectsAndCauses(singleOutputModes);
    }
    return [];
  });
  return Promise.all(array);
  // return Promise.all(getAllEffectsAndCauses(modes).then(([effects, causes]) => {
  //   console.log(causes);
  //   console.log(effects);
  //   console.log(allData);
  // }))
};

const prepareModeData = (modes, modesData) => {
  return modes.map((mode, index) => {
    return Object.assign({}, mode, {
      effects: modesData[0][index],
      causes: modesData[1][index]
    });
  });
};

// const prepareModeData = (mode, modesData) => {
//   return modesData.map((modeData, index) => {
//     return Object.assign({}, mode[index], {
//       effects: modeData[0],
//       causes: modeData[1]
//     });
//   });
// };

const mapModesToData = (modes, values) => {
  const modesData = [];
  values.forEach((outputModes, index) => {
    const modeData = prepareModeData(modes[index], outputModes);
    modesData.push(modeData);
  });
  return modesData;
};

const mapModesToOutput = (outputs, modes) => {
  return modes.map((outputModes, index) => {
    return Object.assign({}, outputs[index], {
      failureModes: outputModes
    });
  });
};

export const getAndPreprareData = id => {
  return dispatch => {
    dispatch(toggleLoader());
    Promise.all([getInputs(id), getOutputs(id)]).then(inputOuput => {
      const allData = {
        inputs: inputOuput[0],
        outputs: inputOuput[1]
      };
      if (inputOuput[1].length) {
        Promise.all(getAllFailureModesPromiseArray(inputOuput[1])).then(
          modes => {
            const failureModes = modes;
            loadAllFailureModesData(modes).then(values => {
              const preparedModes = mapModesToData(modes, values);
              const preparedOutputData = mapModesToOutput(
                inputOuput[1],
                preparedModes
              );
              allData["outputs"] = preparedOutputData;
              console.log(allData);
              dispatch(setFunctionData(allData));
            });
          }
        );
      } else {
        console.log("allData", allData);
        dispatch(setFunctionData(allData));
      }
    });
  };
};
