<template>
  <table class="table">
    <thead>
      <tr>
        <th scope="col">#</th>
        <th scope="col">Name</th>
        <th scope="col">Score</th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="(result, index) in sortedResults" :key="result.id">
        <th scope="row">{{ index + 1 }}</th>
        <td>{{ result.name }}</td>
        <td>{{ result.score }}</td>
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

<style lang="scss" scoped></style>
