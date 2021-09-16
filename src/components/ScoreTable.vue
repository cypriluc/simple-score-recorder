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
import ScoreService from "@/services/ScoreService.js";

export default {
  name: "ScoreTable",

  props: [],

  data() {
    return {
      results: [],
    };
  },

  created() {
    // get results from db when component is created
    ScoreService.getResults()
      .then((response) => {
        this.results = response.data;
      })
      .catch((error) => {
        console.log(error);
      });
  },

  computed: {
    sortedResults() {
      const sorted = [...this.results];
      return sorted.sort(function (a, b) {
        return a.score - b.score;
      });
    },
  },

  mounted() {},

  methods: {},
};
</script>

<style lang="scss" scoped></style>
