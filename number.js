// number.js：编号（基线：一律给空表）
import { readGroup } from "./groups.js";

export function renumber(items, step) {
  return { numbers: [], labels: [], groups: 0, biggest: 0 };
}
