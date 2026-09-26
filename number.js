// number.js：一次扫描重新编号；组内计数用映射，分组按首次出现顺序排列
import { readGroup } from "./groups.js";

export function renumber(items, step) {
  if (!Number.isInteger(step) || step <= 0) {
    const error = new Error("E_BAD_STEP: 步长必须是正整数");
    error.code = "E_BAD_STEP";
    throw error;
  }
  const counts = new Map();
  const numbers = new Array(items.length);
  const labels = new Array(items.length);
  let biggest = 0;
  for (let index = 0; index < items.length; index += 1) {
    const group = readGroup(items[index]);
    const next = (counts.get(group) || 0) + 1;
    counts.set(group, next);
    const number = next * step;
    numbers[index] = number;
    labels[index] = group + "-" + next;
    if (number > biggest) biggest = number;
  }
  return { numbers: numbers, labels: labels, groups: counts.size, biggest: biggest };
}
