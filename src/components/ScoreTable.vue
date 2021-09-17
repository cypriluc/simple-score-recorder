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
import { mapState, mapGetters } from "vuex";

export default {
  name: "ScoreTable",

  props: [],

  data() {
    return {
      results: [],
    };
  },

  created() {
    /*     EventBus.$on("score-updated", function () {
      ScoreService.getResults()
        .then((response) => {
          this.results = response.data;
        })
        .catch((error) => {
          console.log(error);
        });
    }); */
    ///////////// AXIOS CALL ////////
    ScoreService.getResults()
      .then((response) => {
        this.results = response.data;
      })
      .catch((error) => {
        console.log(error);
      });

    ///////////// SET LOCAL STORAGE AS BACKUP ////////
    /*     if (!this.results.length) {
      if (localStorage.getItem("results")) {
        try {
          this.results = JSON.parse(localStorage.getItem("results"));
        } catch (err) {
          console.log(err);
        }
      }
    } */
  },

  computed: {
    sortedResults() {
      const sorted = [...this.results];
      return sorted.sort(function (a, b) {
        return a.score - b.score;
      });
    },

    ...mapGetters(["catLength"]),
    ...mapState(["user", "categories"]),
  },

  mounted() {},

  methods: {},
};
</script>

<style lang="scss" scoped></style>
