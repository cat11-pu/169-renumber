// number.js：按分组重新编号（一次扫描，组内计数用映射）
import { readGroup } from "./groups.js";

export function renumber(items, step) {
  if (!Number.isInteger(step) || step <= 0) {
    const error = new Error("步长必须是正整数");
    error.code = "E_BAD_STEP";
    throw error;
  }

  const order = [];
  const counters = new Map();
  const numbers = new Array(items.length);
  const labels = new Array(items.length);
  let biggest = 0;

  for (let spot = 0; spot < items.length; spot++) {
    const name = readGroup(items[spot]);
    let index = counters.get(name);
    if (index === undefined) {
      index = 0;
      order.push(name);
    }
    index += 1;
    counters.set(name, index);
    const value = index * step;
    numbers[spot] = value;
    labels[spot] = name + "-" + index;
    if (value > biggest) biggest = value;
  }

  return { numbers: numbers, labels: labels, groups: order.length, biggest: biggest };
}
