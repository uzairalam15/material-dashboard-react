export function failureModeNormalizer(modes) {
  return modes.map(mode => {
    return singleModeNormalizer(mode);
  });
}

export function failureCauseNormalizer(modes) {
  return modes.map(mode => {
    return singleFailureCauseNormalizer(mode);
  });
}

export function noiseFactorNormalizer(modes) {
  return modes.map(mode => {
    return singleNoiseFactorNormalizer(mode);
  });
}

export function preventionControlNormalizer(modes) {
  return modes.map(mode => {
    return singlePreventionControlNormalizer(mode);
  });
}

export function safetyRequirementNormalizer(modes) {
  return modes.map(mode => {
    return singleSafetyRequirementNormalizer(mode);
  });
}

export function failureEffectNormalizer(modes) {
  return modes.map(mode => {
    return singleFailureEffectNormalizer(mode);
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

export function singleFailureEffectNormalizer(project) {
  return {
    id: project["@rid"] ? project["@rid"].replace("#", "") : null,
    name: project.ID || "",
    status: project.Status || "",
    type: project["@type"] || "",
    author: project.Author || "",
    version: project["@version"] || 0,
    severity: project.Severity || 0,
    severityRationale: project.SeverityRationale || "",
    childrenFetched: false
  };
}

export function singleFailureCauseNormalizer(project) {
  return {
    id: project["@rid"] ? project["@rid"].replace("#", "") : null,
    name: project.ID || "",
    status: project.Status || "",
    type: project["@type"] || "",
    author: project.Author || "",
    version: project["@version"] || 0,
    detection: project.Detection || 0,
    detectionRationale: project.DetectionRationale || 0,
    occurrence: project.Occurrence || 0,
    occurrenceRationale: project.OccurrenceRationale || 0,
    category: project.Category || 0,
    childrenFetched: false
  };
}

export function singleNoiseFactorNormalizer(project) {
  return {
    id: project["@rid"] ? project["@rid"].replace("#", "") : null,
    name: project.ID || "",
    status: project.Status || "",
    type: project["@type"] || "",
    author: project.Author || "",
    version: project["@version"] || 0,
    category: project.Category || "",
    childrenFetched: false
  };
}

export function singlePreventionControlNormalizer(project) {
  return {
    id: project["@rid"] ? project["@rid"].replace("#", "") : null,
    name: project.ID || "",
    status: project.Status || "",
    type: project["@type"] || "",
    author: project.Author || "",
    version: project["@version"] || 0,
    childrenFetched: false
  };
}

export function singleSafetyRequirementNormalizer(project) {
  return {
    id: project["@rid"] ? project["@rid"].replace("#", "") : null,
    name: project.ID || "",
    status: project.Status || "",
    type: project["@type"] || "",
    author: project.Author || "",
    version: project["@version"] || 0,
    approvedBy: project.ApprovedBy || "",
    updatedRPN: project.UpdatedRPN || 0,
    revisedSeverity: project.RevisedSeverity || 0,
    revisedOccurrence: project.RevisedOccurrence || 0,
    revisedDetection: project.RevisedDetection || 0,
    delegatedTo: project.DelegatedTo || 0,
    childrenFetched: false
  };
}
