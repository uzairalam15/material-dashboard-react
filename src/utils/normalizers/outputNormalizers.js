export function outputNormalizer(outputs) {
  return outputs.map(project => {
    return singleOutputNormalizer(project);
  });
}

export function singleOutputNormalizer(project) {
  return {
    id: project["@rid"] ? project["@rid"].replace("#", "") : null,
    name: project.ID || "Output",
    status: project.Status || "",
    type: project["@type"] || "",
    author: project.Author || "",
    version: project["@version"] || 0
  };
}
