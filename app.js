// app.js：渲染结果
import { readGroup } from "./groups.js";
import { renumber } from "./number.js";

export function render(spec) {
  const items = spec.items || [];
  const step = spec.step || 1;
  const view = renumber(items, step);
  const numbers = view.numbers || [];
  return { numbers: numbers, labels: view.labels || [], groups: view.groups || 0,
           biggest: view.biggest || 0, count: items.length, step: step };
}
