// will be used for the environments

const base_urls = {
  TEST: `http://orientdb01.eastus.cloudapp.azure.com:2480/function/Farsak01`
};
const CURRENT_ENV = "TEST";
export const BASE_URL = base_urls[CURRENT_ENV];
export const appUrls = {
  PROJECT: {
    GETALL: `${BASE_URL}/getProjects`,
    GET: `${BASE_URL}/getProjectByRID/{id}`,
    ADD: `${BASE_URL}/createProject`,
    GETALLSUB: `${BASE_URL}/getSubProjects/{id}`,
    ADDSUB: `${BASE_URL}/createSubProject`
  },
  FUNCTION: {
    GETALL: `${BASE_URL}/getFunctions/{id}`,
    GETALLSUB: `${BASE_URL}/getSubFunctions/{id}`,
    GETALLINPUT: `${BASE_URL}/getInputs/{id}`,
    GETALLOUTPUT: `${BASE_URL}/getOutputs/{id}`,
    GETALLFAILUREMODES: `${BASE_URL}/getFailureModes/{id}`,
    GETALLFAILUREEFFECTS: `${BASE_URL}/getFailureModeEffects/{id}`,
    GETALLFAILURECAUSES: `${BASE_URL}/getFailureCauses/{id}`,
    GETALLNOISEFACTORS: `${BASE_URL}/getNoiseFactors/{id}`,
    ADD: `${BASE_URL}/createFunction`,
    ADDSUB: `${BASE_URL}/createSubFunction`,
    ADDINPUT: `${BASE_URL}/createInput`,
    ADDOUTPUT: `${BASE_URL}/createOutput`,
    ADDFAILUREMODE: `${BASE_URL}/createFailureMode`,
    ADDFAILUREEFFECT: `${BASE_URL}/createFailureModeEffect`,
    ADDFAILURECAUSE: `${BASE_URL}/createFailureCause`
  }
};
