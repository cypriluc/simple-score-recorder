<template>
  <table class="table results__table">
    <thead>
      <tr>
        <th scope="col">#</th>
        <th scope="col">Jméno</th>
        <th scope="col">Skóre</th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="(result, index) in sortedResults" :key="result.id">
        <th v-if="index == 0" scope="row">&#129351;</th>
        <th v-else-if="index == 1" scope="row">&#129352;</th>
        <th v-else-if="index == 2" scope="row">&#129353;</th>
        <th v-else scope="row">{{ index + 1 }}</th>
        <td>{{ result.name }}</td>
        <td>{{ result.scoreFormated }}</td>
      </tr>
    </tbody>
  </table>
</template>

<script>
import { mapGetters } from "vuex";

export default {
  name: "ScoreTable",

  created() {
    this.$store.dispatch("fetchResults");
  },

  computed: {
    ...mapGetters(["sortedResults"]),
  },

  mounted() {},

  methods: {},
};
</script>

<style lang="scss" scoped>
.results {
  &__table {
    text-align: center;
  }
}
</style>
