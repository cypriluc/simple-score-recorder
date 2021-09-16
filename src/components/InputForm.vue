<template>
  <div class="hello">
    <h1>{{ msg }}</h1>
  </div>

  <form @submit.prevent="saveRecord">
    <div class="input-group">
      <label for="participantName" class="form-label m-2">Name</label>
      <input
        id="participantName"
        type="text"
        class="form-control"
        placeholder="Name"
        aria-label="Name"
        v-model="result.name"
        required
      />
    </div>

    <div class="input-group">
      <label for="totalScore" class="form-label m-2">Score</label>
      <input
        id="totalScore"
        type="number"
        class="form-control"
        placeholder="Score"
        aria-label="Score"
        v-model="result.score"
        required
      />
    </div>

    <button type="submit" class="btn btn-success m-2">Send result</button>
  </form>
</template>

<script>
import ScoreService from "@/services/ScoreService.js";

export default {
  name: "InputForm",

  props: {
    msg: String,
  },

  data() {
    return {
      result: {
        id: "",
        name: "",
        score: "",
      },
    };
  },

  methods: {
    saveRecord() {
      this.result.id = this.generateId();

      console.log(this.result);

      /*     let json = JSON.stringify(this.result);
      console.log(json); */

      // post request to db
      ScoreService.postResult(this.result)
        .then((response) => {
          console.log(response);
        })
        .catch((error) => {
          console.log(error);
        });
      // handle form submission here

      // clear data
      /*       this.result.id = "";
      this.result.name = "";
      this.result.score = ""; */
    },

    generateId() {
      return "_" + Math.random().toString(36).substr(2, 9);
    },
  },
};
</script>

<style scoped lang="scss">
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
