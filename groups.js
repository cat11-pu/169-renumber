// groups.js：读分组（去首尾空白；空或缺失报 E_BAD_GROUP）
export function readGroup(item) {
  const raw = item == null ? undefined : item.group;
  const name = String(raw == null ? "" : raw).trim();
  if (name === "") {
    const error = new Error("分组名缺失或为空");
    error.code = "E_BAD_GROUP";
    throw error;
  }
  return name;
}
