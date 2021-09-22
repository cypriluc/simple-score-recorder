<template>
  <div class="home__container">
    <InputForm />
  </div>
  <router-link to="/results" target="_blank">Výsledky</router-link>
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

<style scoped lang="scss"></style>
