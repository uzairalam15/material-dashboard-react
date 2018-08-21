// will be used for the environments

const base_urls = {
  TEST: {
    GET: `http://orientdb01.eastus.cloudapp.azure.com:2480/function/Farsak01`,
    DOCUMENT: `http://orientdb01.eastus.cloudapp.azure.com:2480/document/Farsak01`
  }
};
const CURRENT_ENV = "TEST";
export const authParams = {
  user: "webuser",
  password: "UtNcWx98LaEr"
};
export const BASE_URL = base_urls[CURRENT_ENV]["GET"];
export const BASE_URL_DOCUMENT = base_urls[CURRENT_ENV]["DOCUMENT"];
export const appUrls = {
  PROGRAM: {
    GETALL: {
      type: "get",
      url: `${BASE_URL}/getPrograms`
    },
    GET: {
      type: "get",
      url: `${BASE_URL}/getProgram/{id}`
    },
    ADD: {
      type: "post",
      url: `${BASE_URL}/createProgram`
    },
    UPDATE: {
      type: "put",
      url: `${BASE_URL_DOCUMENT}/{id}`
    },
    DELETE: {
      type: "delete",
      url: `${BASE_URL_DOCUMENT}/{id}`
    }
  },
  PROJECT: {
    GETALL: {
      type: "get",
      url: `${BASE_URL}/getProjects/{id}`
    },
    GETALLSUB: {
      type: "get",
      url: `${BASE_URL}/getSubProjects/{id}`
    },
    GET: {
      type: "get",
      url: `${BASE_URL}/getProjectByRID/{id}`
    },
    ADDSUB: {
      type: "post",
      url: `${BASE_URL}/createSubProject`
    },
    ADD: {
      type: "post",
      url: `${BASE_URL}/createProject`
    },
    UPDATE: {
      type: "put",
      url: `${BASE_URL_DOCUMENT}/{id}`
    },
    DELETE: {
      type: "delete",
      url: `${BASE_URL_DOCUMENT}/{id}`
    }
  },
  ITEM: {
    GETALL: {
      type: "get",
      url: `${BASE_URL}/getItems/{id}`
    },
    GET: {
      type: "get",
      url: `${BASE_URL}/getItem/{id}`
    },
    ADD: {
      type: "post",
      url: `${BASE_URL}/createItem`
    },
    UPDATE: {
      type: "put",
      url: `${BASE_URL_DOCUMENT}/{id}`
    },
    DELETE: {
      type: "delete",
      url: `${BASE_URL_DOCUMENT}/{id}`
    }
  },
  FUNCTION: {
    GETALL: {
      type: "get",
      url: `${BASE_URL}/getFunctions/{id}`
    },
    GET: {
      type: "get",
      url: `${BASE_URL}/getFunction/{id}`
    },
    ADD: {
      type: "post",
      url: `${BASE_URL}/createFunction`
    },
    UPDATE: {
      type: "put",
      url: `${BASE_URL_DOCUMENT}/{id}`
    },
    DELETE: {
      type: "delete",
      url: `${BASE_URL_DOCUMENT}/{id}`
    }
  },
  INPUT: {
    GETALL: {
      type: "get",
      url: `${BASE_URL}/getInputs/{id}`
    },
    GET: {
      type: "get",
      url: `${BASE_URL}/getInput/{id}`
    },
    ADD: {
      type: "post",
      url: `${BASE_URL}/createInput`
    },
    UPDATE: {
      type: "put",
      url: `${BASE_URL_DOCUMENT}/{id}`
    },
    DELETE: {
      type: "delete",
      url: `${BASE_URL_DOCUMENT}/{id}`
    }
  },
  OUTPUT: {
    GETALL: {
      type: "get",
      url: `${BASE_URL}/getOutputs/{id}`
    },
    GET: {
      type: "get",
      url: `${BASE_URL}/getOutput/{id}`
    },
    ADD: {
      type: "post",
      url: `${BASE_URL}/createOutput`
    },
    UPDATE: {
      type: "put",
      url: `${BASE_URL_DOCUMENT}/{id}`
    },
    DELETE: {
      type: "delete",
      url: `${BASE_URL_DOCUMENT}/{id}`
    }
  },
  FAILURE_MODE: {
    GETALL: {
      type: "get",
      url: `${BASE_URL}/getFailureModes/{id}`
    },
    GET: {
      type: "get",
      url: `${BASE_URL}/getFailureMode/{id}`
    },
    ADD: {
      type: "post",
      url: `${BASE_URL}/createFailureMode`
    },
    UPDATE: {
      type: "put",
      url: `${BASE_URL_DOCUMENT}/{id}`
    },
    DELETE: {
      type: "delete",
      url: `${BASE_URL_DOCUMENT}/{id}`
    }
  }
  // FUNCTION: {
  //   GETALL: `${BASE_URL}/getFunctions/{id}`,
  //   GETALLSUB: `${BASE_URL}/getSubFunctions/{id}`,
  //   GETALLINPUT: `${BASE_URL}/getInputs/{id}`,
  //   GETALLOUTPUT: `${BASE_URL}/getOutputs/{id}`,
  //   GETALLFAILUREMODES: `${BASE_URL}/getFailureModes/{id}`,
  //   GETALLFAILUREEFFECTS: `${BASE_URL}/getFailureModeEffects/{id}`,
  //   GETALLFAILURECAUSES: `${BASE_URL}/getFailureCauses/{id}`,
  //   GETALLNOISEFACTORS: `${BASE_URL}/getNoiseFactors/{id}`,
  //   ADD: `${BASE_URL}/createFunction`,
  //   ADDSUB: `${BASE_URL}/createSubFunction`,
  //   ADDINPUT: `${BASE_URL}/createInput`,
  //   ADDOUTPUT: `${BASE_URL}/createOutput`,
  //   ADDFAILUREMODE: `${BASE_URL}/createFailureMode`,
  //   ADDFAILUREEFFECT: `${BASE_URL}/createFailureModeEffect`,
  //   ADDFAILURECAUSE: `${BASE_URL}/createFailureCause`
  // }
};
