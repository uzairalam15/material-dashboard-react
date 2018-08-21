export default {
  notificationReducer: {
    color: "",
    message: ""
  },
  programReducer: {
    selectedProgram: null,
    programs: []
  },
  projectReducer: {
    selectedProject: { id: "176:1" },
    projects: []
  },
  projectDetailReducer: {
    items: [],
    functions: [],
    inputs: [],
    outputs: [],
    failureModes: [],
    failureCauses: [],
    failureEffects: [],
    noiseFactors: [],
    preventionControls: [],
    safetyRequirements: [],
    loader: false
  }
};
