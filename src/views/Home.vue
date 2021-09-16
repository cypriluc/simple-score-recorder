<template>
  <div class="home container mt-5">
    <InputForm msg="Enter a participant" />
  </div>
</template>

<script>
// @ is an alias to /src
import InputForm from "@/components/InputForm.vue";

export default {
  name: "Home",

  props: [],

  data() {
    return {};
  },

  components: {
    InputForm,
  },

  computed: {},

  mounted() {},

  methods: {},
};
</script>
