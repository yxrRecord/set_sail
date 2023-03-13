import { ref } from "vue";
export const useDefer = (num = 1000) => {
  const count = ref<number>(0);
  function refresh() {
    requestAnimationFrame(() => {
      count.value++;
      if (count.value < num) {
        refresh();
      }
    });
  }
  refresh();
  return function (number: number) {
    return count.value >= number;
  };
};
