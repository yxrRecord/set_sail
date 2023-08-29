import { Directive } from "vue";
export const loadAni: Directive = {
  mounted(el, binding) {
    const elClass = el.getAttribute("class");
    const per = 0.95;
    const scrollClassName = function () {
      const scrollTop =
        window.pageYOffset ||
        document.documentElement.scrollTop ||
        document.body.scrollTop;
      if (
        scrollTop + document.documentElement.clientHeight * per >=
        el.offsetTop ||
        scrollTop + document.documentElement.clientHeight >=
        el.offsetTop + el.offsetHeight
      ) {
        el.setAttribute(
          "class",
          `${elClass} animate__animated ${binding.value || "ls-animationed"}`
        );
        window.removeEventListener("scroll", scrollClassName);
      }
    };
    window.addEventListener("scroll", scrollClassName);
    const scrollTops =
      window.pageYOffset ||
      document.documentElement.scrollTop ||
      document.body.scrollTop;
    if (scrollTops === 0) {
      scrollClassName();
    }
  },
};
export default {
  loadAni,
};
