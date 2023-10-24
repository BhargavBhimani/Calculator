<template>
  <div class="bg-black md: py-4 flex flex-col justify-between gap-5 items-center">
    <InputField />
  </div>
</template>

<script>
import TheButton from "./components/the-button.vue";
import InputField from "./components/input-field.vue";
import Keypad from "./components/keypad.vue";

export default {
  components: {
    TheButton,
    InputField,
    Keypad,

  },
};
</script>