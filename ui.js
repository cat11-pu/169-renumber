// ui.js：操作面板与视图（原生 DOM，无弹窗）
import { render } from "./app.js";

export function mount(spec, parts) {
  let step = spec.step || 1;
  parts.log.textContent = "条目 " + (spec.items || []).length + " 个，步长 " + step + "。";

  function draw() {
    let view = null;
    try {
      view = render(Object.assign({}, spec, { step: step }));
    } catch (error) {
      parts.out.textContent = String(error && error.code ? error.code : error);
      parts.log.textContent = "跑不动：" + String(error && error.message ? error.message : error);
      return;
    }
    parts.out.textContent = JSON.stringify(view, null, 1);
    parts.stage.textContent = "";
    view.labels.forEach(function (label, spot) {
      const row = document.createElement("div");
      row.className = "row";
      const head = document.createElement("span");
      head.textContent = (spec.items || [])[spot].group + " 组";
      row.appendChild(head);
      const mark = document.createElement("span");
      mark.className = "chip ok";
      mark.textContent = "编号 " + view.numbers[spot] + "（" + label + "）";
      row.appendChild(mark);
      parts.stage.appendChild(row);
    });
    parts.legend.textContent = "分组 " + view.groups + " 个，最大编号 " + view.biggest;
    parts.log.textContent = "步长 " + step;
  }

  const runButton = document.createElement("button");
  runButton.className = "primary";
  runButton.textContent = "重新编号";
  runButton.addEventListener("click", draw);
  parts.controls.appendChild(runButton);

  const moreButton = document.createElement("button");
  moreButton.textContent = "步长加一";
  moreButton.addEventListener("click", function () {
    step = step + 1;
    draw();
  });
  parts.controls.appendChild(moreButton);

  const lessButton = document.createElement("button");
  lessButton.textContent = "步长减一";
  lessButton.addEventListener("click", function () {
    step = Math.max(1, step - 1);
    draw();
  });
  parts.controls.appendChild(lessButton);

  const label = document.createElement("label");
  label.textContent = "要不要按分组连续编号";
  parts.controls.appendChild(label);

  const box = document.createElement("input");
  box.type = "text";
  box.value = "group";
  box.addEventListener("input", function () {
    try {
      const view = render(Object.assign({}, spec, { mode: box.value, step: step }));
      parts.out.textContent = box.value + " 模式下编号 " + JSON.stringify(view.numbers);
    } catch (error) {
      parts.out.textContent = String(error && error.code ? error.code : error);
    }
  });
  parts.controls.appendChild(box);

  const readButton = document.createElement("button");
  readButton.textContent = "只看最大编号";
  readButton.addEventListener("click", function () {
    const view = render(Object.assign({}, spec, { step: step }));
    parts.out.textContent = "最大编号 " + view.biggest + "，分组 " + view.groups + " 个";
  });
  parts.controls.appendChild(readButton);

  draw();
}
