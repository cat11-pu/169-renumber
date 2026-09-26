// groups.js：读分组名，去掉首尾空白；去空白后为空报 E_BAD_GROUP
export function readGroup(item) {
  const raw = item && typeof item.group === "string" ? item.group : "";
  const name = raw.trim();
  if (name === "") {
    const error = new Error("E_BAD_GROUP: 条目缺少分组名或组名去空白后为空");
    error.code = "E_BAD_GROUP";
    throw error;
  }
  return name;
}
