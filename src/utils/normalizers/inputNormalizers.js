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
