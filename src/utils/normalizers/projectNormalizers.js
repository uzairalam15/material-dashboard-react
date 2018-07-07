export function projectNormalizer(projects) {
  return projects.map(project => {
    return {
      id: project["@rid"] ? project["@rid"].replace("#", "") : null,
      name: project.Name || "",
      status: project.Status || "",
      type: project["@type"] || "",
      author: project.Author || "",
      version: project["@version"] || 0,
      createdDate: project.CreateDate || null,
      subProjects: [],
      subProFetched: false
    };
  });
}

export function subProjectNormalizer(subProjects) {
  return subProjects.map((project, index) => {
    return {
      id: project["@rid"] ? project["@rid"].replace("#", "") : null,
      name: `Sub Project ${index + 1}`,
      status: project.Status || "",
      type: project["@type"] || "",
      author: project.Author || "",
      version: project["@version"] || 0
    };
  });
}

export function inputNormalizer(inputs) {
  return inputs.map((project, index) => {
    return {
      id: project["@rid"] ? project["@rid"].replace("#", "") : null,
      name: `Sub Project ${index + 1}`,
      status: project.Status || "",
      type: project["@type"] || "",
      author: project.Author || "",
      version: project["@version"] || 0
    };
  });
}

export function outputNormalizer(subProjects) {
  return subProjects.map((project, index) => {
    return {
      id: project["@rid"] ? project["@rid"].replace("#", "") : null,
      name: `Sub Project ${index + 1}`,
      status: project.Status || "",
      type: project["@type"] || "",
      author: project.Author || "",
      version: project["@version"] || 0
    };
  });
}
