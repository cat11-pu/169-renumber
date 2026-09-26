import assert from "node:assert";
import { readGroup } from "../groups.js";
import { renumber } from "../number.js";
import { render } from "../app.js";

let failed = 0;
function check(name, fn) {
  try { fn(); console.log("ok " + name); } catch (e) { failed += 1; console.log("FAIL " + name + " :: " + e.message); }
}

check("readGroup returns text", () => {
  assert.strictEqual(typeof readGroup({ group: "a" }), "string");
});

check("renumber returns numbers", () => {
  assert.ok(Array.isArray(renumber([{ group: "a" }], 1).numbers));
});

check("renumber returns labels", () => {
  assert.ok(Array.isArray(renumber([{ group: "a" }], 1).labels));
});

check("render counts items", () => {
  assert.strictEqual(typeof render({ items: [{ group: "a" }], step: 1 }).count, "number");
});

check("render exposes groups", () => {
  assert.strictEqual(typeof render({ items: [{ group: "a" }], step: 1 }).groups, "number");
});

console.log("5 cases, " + failed + " failed");
process.exit(failed === 0 ? 0 : 1);
