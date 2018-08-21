import ApiService from "utils/apiService";
import ErrorService from "utils/errorService";
import {
  getSafetyRequirementsSuccess,
  addSafetyRequirementSuccess,
  updateSafetyRequirementSuccess,
  deleteSafetyRequirementSuccess
} from "actions/SafetyRequirementActions";
import { appUrls } from "constants/Urls";
import {
  singleSafetyRequirementNormalizer,
  safetyRequirementNormalizer
} from "utils/normalizers/failureModeNormalizers";

const ApiServiceInstance = new ApiService(true);
const ErrorServiceInstance = new ErrorService();

export const getSafetyRequirements = id => {
  const urlObject = appUrls.SAFETY_REQUIREMENT.GETALL;
  return dispatch => {
    ApiServiceInstance[urlObject.type](
      urlObject.url.replace("{id}", id),
      (err, res) => {
        if (!err) {
          const newData = JSON.parse(res.text);
          dispatch(
            getSafetyRequirementsSuccess(
              safetyRequirementNormalizer(newData.result)
            )
          );
        } else {
          ErrorServiceInstance.error(err, dispatch);
        }
      }
    );
  };
};

export const createSafetyRequirement = data => {
  const urlObject = appUrls.SAFETY_REQUIREMENT.ADD;
  return dispatch => {
    ApiServiceInstance[urlObject.type](urlObject.url, data, (err, res) => {
      if (!err) {
        const newData = JSON.parse(res.text);
        dispatch(
          addSafetyRequirementSuccess(
            singleSafetyRequirementNormalizer(newData.result[0])
          )
        );
      } else {
        ErrorServiceInstance.error(err, dispatch);
      }
    });
  };
};

export const updateSafetyRequirement = (data, id) => {
  const urlObject = appUrls.SAFETY_REQUIREMENT.UPDATE;
  return dispatch => {
    ApiServiceInstance[urlObject.type](
      urlObject.url.replace("{id}", id),
      data,
      (err, res) => {
        if (!err) {
          const newData = JSON.parse(res.text);
          dispatch(
            updateSafetyRequirementSuccess(
              singleSafetyRequirementNormalizer(newData)
            )
          );
        } else {
          ErrorServiceInstance.error(err, dispatch);
        }
      }
    );
  };
};

export const deleteSafetyRequirement = id => {
  const urlObject = appUrls.SAFETY_REQUIREMENT.DELETE;
  return dispatch => {
    ApiServiceInstance[urlObject.type](
      urlObject.url.replace("{id}", id),
      (err, res) => {
        if (!err) {
          dispatch(deleteSafetyRequirementSuccess(id));
        } else {
          ErrorServiceInstance.error(err, dispatch);
        }
      }
    );
  };
};
