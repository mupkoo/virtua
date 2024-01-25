import { it, expect, describe } from "vitest";
import { defineComponent, h } from "vue";
import { render } from "@testing-library/vue";
import { WindowVirtualizer } from "./WindowVirtualizer";

const ITEM_HEIGHT = 50;
const ITEM_WIDTH = 100;

// https://github.com/jsdom/jsdom/issues/1261#issuecomment-362928131
Object.defineProperty(HTMLElement.prototype, "offsetParent", {
  get() {
    return this.parentNode;
  },
});

global.ResizeObserver = class {
  constructor(private callback: ResizeObserverCallback) {}
  disconnect() {}
  observe(e: HTMLElement) {
    const entry: Pick<ResizeObserverEntry, "contentRect" | "target"> = {
      contentRect: {
        top: 0,
        bottom: 0,
        left: 0,
        right: 0,
        width: ITEM_WIDTH,
        height: ITEM_HEIGHT,
        x: 0,
        y: 0,
        toJSON() {},
      },
      target: e,
    };
    this.callback([entry] as any, this);
  }
  unobserve(_target: Element) {}
};

const range = (length: number) => Array.from({ length }).map((_, i) => i);

it("should pass attributes to element", () => {
  const wrapper = render(WindowVirtualizer, {
    props: {
      data: range(1),
    },
    attrs: {
      id: "id",
      className: "class",
      "tab-index": 0,
      role: "list",
      "aria-label": "test",
      style: { background: "red" },
    },
    slots: { default: (data) => h("div", { key: data }, data) },
  });
  expect(wrapper.baseElement).toMatchSnapshot();
});

describe("vertical", () => {
  it("should render 0 children", () => {
    const wrapper = render(WindowVirtualizer, {
      props: {
        data: [],
      },
      slots: { default: (data) => h("div", { key: data }, data) },
    });
    expect(wrapper.baseElement).toMatchSnapshot();
  });

  it("should render 1 children", () => {
    const wrapper = render(WindowVirtualizer, {
      props: {
        data: range(1),
      },
      slots: { default: (data) => h("div", { key: data }, data) },
    });
    expect(wrapper.baseElement).toMatchSnapshot();
  });

  it("should render 5 children", () => {
    const wrapper = render(WindowVirtualizer, {
      props: {
        data: range(5),
      },
      slots: { default: (data) => h("div", { key: data }, data) },
    });
    expect(wrapper.baseElement).toMatchSnapshot();
  });

  it("should render 100 children", () => {
    const wrapper = render(WindowVirtualizer, {
      props: {
        data: range(100),
      },
      slots: { default: (data) => h("div", { key: data }, data) },
    });
    expect(wrapper.baseElement).toMatchSnapshot();
  });

  it("should render 1000 children", () => {
    const wrapper = render(WindowVirtualizer, {
      props: {
        data: range(1000),
      },
      slots: { default: (data) => h("div", { key: data }, data) },
    });
    expect(wrapper.baseElement).toMatchSnapshot();
  });

  it("should render 10000 children", () => {
    const wrapper = render(WindowVirtualizer, {
      props: {
        data: range(10000),
      },
      slots: { default: (data) => h("div", { key: data }, data) },
    });
    expect(wrapper.baseElement).toMatchSnapshot();
  });

  it("should render component", () => {
    const Comp = defineComponent({
      props: ["data"],
      setup(props) {
        return () => {
          return h("div", props.data);
        };
      },
    });
    const wrapper = render(WindowVirtualizer, {
      props: {
        data: range(3),
      },
      slots: { default: (data) => h(Comp, { key: data, data }) },
    });
    expect(wrapper.baseElement).toMatchSnapshot();
  });
});

describe("horizontal", () => {
  it("should render 0 children", () => {
    const wrapper = render(WindowVirtualizer, {
      props: {
        data: [],
        horizontal: true,
      },
      slots: { default: (data) => h("div", { key: data }, data) },
    });
    expect(wrapper.baseElement).toMatchSnapshot();
  });

  it("should render 1 children", () => {
    const wrapper = render(WindowVirtualizer, {
      props: {
        data: range(1),
        horizontal: true,
      },
      slots: { default: (data) => h("div", { key: data }, data) },
    });
    expect(wrapper.baseElement).toMatchSnapshot();
  });

  it("should render 5 children", () => {
    const wrapper = render(WindowVirtualizer, {
      props: {
        data: range(5),
        horizontal: true,
      },
      slots: { default: (data) => h("div", { key: data }, data) },
    });
    expect(wrapper.baseElement).toMatchSnapshot();
  });

  it("should render 100 children", () => {
    const wrapper = render(WindowVirtualizer, {
      props: {
        data: range(100),
        horizontal: true,
      },
      slots: { default: (data) => h("div", { key: data }, data) },
    });
    expect(wrapper.baseElement).toMatchSnapshot();
  });

  it("should render 1000 children", () => {
    const wrapper = render(WindowVirtualizer, {
      props: {
        data: range(1000),
        horizontal: true,
      },
      slots: { default: (data) => h("div", { key: data }, data) },
    });
    expect(wrapper.baseElement).toMatchSnapshot();
  });

  it("should render 10000 children", () => {
    const wrapper = render(WindowVirtualizer, {
      props: {
        data: range(10000),
        horizontal: true,
      },
      slots: { default: (data) => h("div", { key: data }, data) },
    });
    expect(wrapper.baseElement).toMatchSnapshot();
  });

  it("should render component", () => {
    const Comp = defineComponent({
      props: ["data"],
      setup(props) {
        return () => {
          return h("div", props.data);
        };
      },
    });
    const wrapper = render(WindowVirtualizer, {
      props: {
        data: range(3),
        horizontal: true,
      },
      slots: { default: (data) => h(Comp, { key: data, data }) },
    });
    expect(wrapper.baseElement).toMatchSnapshot();
  });
});
