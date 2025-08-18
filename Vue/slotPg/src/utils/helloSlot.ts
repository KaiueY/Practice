import { type FunctionalComponent, h } from "vue";

export const HelloSlot: FunctionalComponent = (props, { slots }) => {
  return h("div", null, [
    slots.header?.({ title: "HelloSlot" }),
    slots.default ? slots.default() : "默认内容,你没传入",
    slots.footer?.(),
  ]);
};
export default HelloSlot;
