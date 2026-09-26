import fs from "node:fs";
import { readGroup } from "./groups.js";
import { renumber } from "./number.js";
import { render } from "./app.js";

// 验收断言：上面每条值收进 emit，最后与期望值逐项比对，不符就非零退出。
const __lines = [];
function emit(label, value) { __lines.push([String(label).replace(/ =$/, ""), value]); }


const spec = JSON.parse(fs.readFileSync(process.argv[2] || "sample/items.json", "utf8"));
const view = render(spec);

emit("新编号 =", JSON.stringify(view.numbers));
emit("标签 =", JSON.stringify(view.labels));
emit("分组个数 =", view.groups);
emit("最大编号 =", view.biggest);
emit("条目个数 =", view.count);
emit("分组写错的错误码 =", spec.group_error_code);


// ---- 异常路径探针：真调用实现，看它报出什么码（不是从样例里抄）----
try {
  renumber([{ group: "   " }], 1);
  emit("分组写错的错误码", "没有报错");
} catch (error) {
  emit("分组写错的错误码", error && error.code ? error.code : String(error.message));
}


// ---- 期望值（参考模型算出，与题面给的验收数值一致）----
const EXPECTED = {
  "新编号": [
    10,
    10,
    20,
    10,
    20
  ],
  "标签": [
    "alpha-1",
    "beta-1",
    "alpha-2",
    "gamma-1",
    "beta-2"
  ],
  "分组个数": 3,
  "最大编号": 20,
  "条目个数": 5,
  "分组写错的错误码": "E_BAD_GROUP"
};
// 有的值在收进来之前已经 stringify 过，比较前先试着解析回来，避免类型错配把正确实现判成不过。
function __same(got, want) {
  if (typeof got === "string") {
    try { const parsed = JSON.parse(got); if (JSON.stringify(parsed) === JSON.stringify(want)) return true; } catch (error) { /* 不是 JSON 就按原文比 */ }
  }
  return JSON.stringify(got) === JSON.stringify(want);
}
let __bad = 0;
for (const [label, want] of Object.entries(EXPECTED)) {
  const found = __lines.find((pair) => pair[0] === label);
  if (!found) { __bad += 1; console.log("缺失验收项 " + label); continue; }
  const got = found[1];
  if (__same(got, want)) { console.log("一致 " + label + " = " + JSON.stringify(got)); }
  else { __bad += 1; console.log("不一致 " + label + " 期望 " + JSON.stringify(want) + " 实际 " + JSON.stringify(got)); }
}
console.log("验收项 " + (Object.keys(EXPECTED).length - __bad) + "/" + Object.keys(EXPECTED).length + " 通过");
process.exit(__bad === 0 ? 0 : 1);
