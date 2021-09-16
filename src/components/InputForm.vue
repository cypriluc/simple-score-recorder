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
      />
    </div>

    <div class="input-group">
      <label for="totalScore" class="form-label m-2">Score</label>
      <input
        id="totalScore"
        type="text"
        class="form-control"
        placeholder="Score"
        aria-label="Score"
      />
    </div>

    <button type="button" class="btn btn-success m-2">Send result</button>
  </form>
</template>

<script>
export default {
  name: "InputForm",
  props: {
    msg: String,
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
