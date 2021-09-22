<template>
  <div class="input-group mb-4">
    <div class="stopwatch mx-auto">
      <h2 class="stopwatch__text" id="timeText">{{ printTime }}</h2>
      <div class="btn-group btn-group-round" role="group">
        <button
          id="startBtn"
          type="button"
          class="btn btn-light"
          v-on:click="start()"
        >
          Start
        </button>
        <button
          id="stopBtn"
          type="button"
          class="btn btn-light"
          v-on:click="stop()"
        >
          Stop
        </button>
        <button
          id="resetBtn"
          type="button"
          class="btn btn-danger"
          v-on:click="reset()"
        >
          Reset
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import TimeFormat from "@/logic/TimeFormat.js";

export default {
  name: "StopWatch",

  data() {
    return {
      startTime: 0,
      elapsedTime: 0,
      timerInterval: 0,
      printTime: "00:00.00",
    };
  },

  methods: {
    start() {
      this.startTime = Date.now() - this.elapsedTime;
      this.timerInterval = setInterval(() => {
        this.elapsedTime = Date.now() - this.startTime;
        this.printTime = new TimeFormat(this.elapsedTime).getTime();
      }, 10);
    },

    stop() {
      clearInterval(this.timerInterval);
      let roundElapsedTime = Math.floor(this.elapsedTime / 10) * 10;
      this.$emit("elapsedTime", roundElapsedTime);
    },

    reset() {
      clearInterval(this.timerInterval);
      this.printTime = "00:00.00";
      this.elapsedTime = 0;
    },
  },
};
</script>

<style lang="scss" scoped>
.stopwatch {
  &__text {
    text-align: left;
    margin-left: 2.5rem;
  }
}
</style>
