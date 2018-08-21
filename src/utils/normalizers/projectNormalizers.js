export function projectNormalizer(projects) {
  return projects.map(project => {
    return singleProjectNormalizer(project);
  });
}

export function singleProjectNormalizer(project) {
  return {
    id: project["@rid"] ? project["@rid"].replace("#", "") : null,
    name: project.Name || "",
    status: project.Status || "",
    type: project.Type || "",
    author: project.Author || "",
    version: project["@version"] || 0,
    createdDate: project.CreateDate || null,
    subProjects: [],
    subProFetched: false
  };
}

export function subProjectNormalizer(subProjects) {
  return subProjects.map((project, index) => {
    return singleSubProjectNormalizer(project);
  });
}

export function singleSubProjectNormalizer(project) {
  return {
    id: project["@rid"] ? project["@rid"].replace("#", "") : null,
    name: project.Name || `Sub Project`,
    status: project.Status || "",
    type: project.Type || "",
    subType: project.SubType || "",
    author: project.Author || "",
    version: project["@version"] || 0
  };
}
export function inputNormalizer(inputs) {
  return inputs.map(project => {
    return singleInputNormalizer(project);
  });
}

export function singleInputNormalizer(project) {
  return {
    id: project["@rid"] ? project["@rid"].replace("#", "") : null,
    name: `Input`,
    status: project.Status || "",
    type: project["@type"] || "",
    author: project.Author || "",
    version: project["@version"] || 0
  };
}

export function outputNormalizer(subProjects) {
  return subProjects.map(project => {
    return singleOutputNormalizer(project);
  });
}

export function failureModeNormalizer(modes) {
  return modes.map(mode => {
    return singleModeNormalizer(mode);
  });
}

export function failureCauseNormalizer(modes) {
  return modes.map(mode => {
    return singleModeNormalizer(mode);
  });
}

export function failureEffectNormalizer(modes) {
  return modes.map(mode => {
    return singleModeNormalizer(mode);
  });
}

export function singleModeNormalizer(project) {
  return {
    id: project["@rid"] ? project["@rid"].replace("#", "") : null,
    name: project.ID || "",
    status: project.Status || "",
    type: project["@type"] || "",
    author: project.Author || "",
    version: project["@version"] || 0,
    causes: [],
    effects: [],
    childrenFetched: false
  };
}

export function singleOutputNormalizer(project) {
  return {
    id: project["@rid"] ? project["@rid"].replace("#", "") : null,
    name: `Output`,
    status: project.Status || "",
    type: project["@type"] || "",
    author: project.Author || "",
    version: project["@version"] || 0
  };
}
