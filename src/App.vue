<template>
  <div class="bg-black md: py-4 flex flex-col justify-between gap-5 items-center">
    <InputField />
  </div>
</template>

<script>

import InputField from "./components/input-field.vue";

export default {
  components: {
    InputField,
  },
};
</script>