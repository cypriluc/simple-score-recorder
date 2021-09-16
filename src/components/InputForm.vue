<template>
  <div class="hello">
    <h1>{{ msg }}</h1>
  </div>

  <form action="#" method="post">
    <div class="input-group">
      <label for="participantName" class="form-label m-2">Name</label>
      <input
        id="participantName"
        type="text"
        class="form-control"
        placeholder="Name"
        aria-label="Name"
        v-model="name"
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
        v-model="score"
        required
      />
    </div>

    <button type="button" class="btn btn-success m-2" v-on:click="saveRecord">
      Send result
    </button>
  </form>
</template>

<script>
export default {
  name: "InputForm",

  props: {
    msg: String,
  },

  data() {
    return {
      name: "",
      score: "",
      result: [],
    };
  },

  methods: {
    saveRecord() {
      this.result.push({ name: this.name, score: this.score });
      let json = JSON.stringify(this.result);
      console.log(json);
      this.name = "";
      this.score = "";
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
