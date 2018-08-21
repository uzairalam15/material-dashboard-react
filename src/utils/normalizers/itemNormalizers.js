export function singleItemNormalizer(item) {
  return {
    id: item["@rid"] ? item["@rid"].replace("#", "") : null,
    name: item.ID || "",
    status: item.Status || "",
    type: item["@type"] || "",
    author: item.Author || "",
    version: item["@version"] || 0
  };
}

export function normalizeItems(items) {
  return items.map(item => singleItemNormalizer(item));
}
