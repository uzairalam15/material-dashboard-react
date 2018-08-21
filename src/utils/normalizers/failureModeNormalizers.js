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
    rpn: project.RPN || 0,
    childrenFetched: false
  };
}
