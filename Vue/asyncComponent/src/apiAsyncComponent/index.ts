import { h, shallowRef, type VNode } from "vue";

export default function defineAsyncComponent(options) {
  if (typeof options === "function") {
    options = { loader: options };
  }
  const defaultComponent = () => h("div", "占位符");
  const {
    loader,
    timeout,
    loadingComponent = defaultComponent,
    errorComponent = defaultComponent,
  } = options;

  return {
    setup(_, { slots, attrs }) {
      const component = shallowRef(loadingComponent);
      const loadComponent = () => {
        return new Promise((resolve, reject) => {
          if (timeout) {
            setTimeout(() => {
              reject("超时了 哥们儿");
            }, timeout);
          }
          loader().then(resolve, reject);
        });
      };
      loadComponent()
        .then((com :any) => {
          if (com && com[Symbol.toStringTag] === "Module") {
            com = com.default;
          }

          component.value = com;
        })
        .catch(() => {
          component.value = errorComponent;
        });

      return () => {
        return h(component.value, attrs, slots);
      };
    },
  };
}
