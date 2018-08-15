export function functionNormalizer(functionItems) {
  return functionItems.map(functionItem => {
    return singleFunctionNormalizer(functionItem);
  });
}

export function singleFunctionNormalizer(functionItem) {
  return {
    id: functionItem["@rid"] ? functionItem["@rid"].replace("#", "") : null,
    name: functionItem.ID || "",
    status: functionItem.Status || "",
    FMEAStatus: functionItem.FMEAStatus || "",
    FunctionSafetyStatus: functionItem.FunctionSafetyStatus || "",
    STPAStatus: functionItem.STPAStatus || "",
    type: functionItem["@type"] || "",
    author: functionItem.Author || "",
    lead: functionItem.Lead || "",
    version: functionItem["@version"] || 0,
    createdDate: functionItem.CreateDate || null,
    out_ComposedOf: functionItem.out_ComposedOf || null,
    in_FunctionInput: functionItem.in_FunctionInput || null,
    out_FunctionOutput: functionItem.out_FunctionOutput || null,
    in_AssociatedFunction: functionItem.in_AssociatedFunction || null,
    subFunctions: [],
    subFuncFetched: false
  };
}

export function subFunctionNormalizer(functionItems) {
  return functionItems.map((functionItem, index) => {
    return singleSubFunctionNormalizer(functionItem);
  });
}

export function singleSubFunctionNormalizer(functionItem) {
  return {
    id: functionItem["@rid"] ? functionItem["@rid"].replace("#", "") : null,
    name: functionItem.ID || "",
    status: functionItem.Status || "",
    FMEAStatus: functionItem.FMEAStatus || "",
    FunctionSafetyStatus: functionItem.FunctionSafetyStatus || "",
    STPAStatus: functionItem.STPAStatus || "",
    type: functionItem["@type"] || "",
    author: functionItem.Author || "",
    lead: functionItem.Lead || "",
    version: functionItem["@version"] || 0,
    createdDate: functionItem.CreateDate || null,
    out_ComposedOf: functionItem.out_ComposedOf || null,
    in_FunctionInput: functionItem.in_FunctionInput || null,
    out_FunctionOutput: functionItem.out_FunctionOutput || null,
    in_ComposedOf: functionItem.in_ComposedOf || null,
    in_AssociatedFunction: functionItem.in_AssociatedFunction || null,
    subFunctions: [],
    subFuncFetched: false
  };
}
