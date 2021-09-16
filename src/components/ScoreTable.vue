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
export default {
  name: "ScoreTable",

  props: [],

  data() {
    return {
      results: [
        { id: "00", name: "Lukáš", score: 225 },
        { id: "01", name: "Lisa", score: 178 },
        { id: "02", name: "Šimon", score: 405 },
        { id: "03", name: "Adam", score: 333 },
      ],
    };
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
