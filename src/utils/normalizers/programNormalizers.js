export function singleProgramNormalizer(program) {
  return {
    id: program["@rid"] ? program["@rid"].replace("#", "") : null,
    name: program.Name || "",
    status: program.Status || "",
    type: program["@type"] || "",
    author: program.Author || "",
    version: program["@version"] || 0
  };
}

export function normalizePrograms(programs) {
  return programs.map(program => singleProgramNormalizer(program));
}
