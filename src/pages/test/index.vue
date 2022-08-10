<template>
  {{ state.obj.a }}
  <p>{{ obj.a }}</p>
</template>

<script>
import {ref, reactive, toRef, toRefs, defineComponent} from "vue";

export default defineComponent({
  name: 'test',
  setup() {
    const state = reactive({
      obj: {
        a: 1,
        b: 2
      },
      name: '张三'
    })
    const test = ref('key1')

    const res = toRefs(state);
    console.log(res)
    console.log(state);
    return {
      state,
      ...toRefs(state)
    }
  }
})
</script>
