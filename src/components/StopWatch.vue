<template>
  <div class="input-group pb-4">
    <div class="stopwatch mx-auto">
      <h2 class="stopwatch__text" id="timeText">{{ printTime }}</h2>
      <div class="btn-group" role="group">
        <button
          id="startBtn"
          type="button"
          class="btn btn-secondary"
          v-on:click="start()"
        >
          Start
        </button>
        <button
          id="stopBtn"
          type="button"
          class="btn btn-secondary"
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
export default {
  name: "StopWatch",

  data() {
    return {
      startTime: 0,
      elapsedTime: 0,
      timerInterval: 0,
      printTime: "00:00:00",
    };
  },

  methods: {
    start() {
      this.startTime = Date.now() - this.elapsedTime;
      this.timerInterval = setInterval(() => {
        this.elapsedTime = Date.now() - this.startTime;
        this.timeToString(this.elapsedTime);
      }, 10);
    },

    stop() {
      clearInterval(this.timerInterval);
      let roundElapsedTime = Math.floor(this.elapsedTime / 10) * 10;
      this.$emit("elapsedTime", roundElapsedTime);
    },

    reset() {
      clearInterval(this.timerInterval);
      this.printTime = "00:00:00";
      this.elapsedTime = 0;
    },

    timeToString(time) {
      let diffInHrs = time / 3600000;
      let hh = Math.floor(diffInHrs);

      let diffInMin = (diffInHrs - hh) * 60;
      let mm = Math.floor(diffInMin);

      let diffInSec = (diffInMin - mm) * 60;
      let ss = Math.floor(diffInSec);

      let diffInMs = (diffInSec - ss) * 100;
      let ms = Math.floor(diffInMs);

      let formattedMM = mm.toString().padStart(2, "0");
      let formattedSS = ss.toString().padStart(2, "0");
      let formattedMS = ms.toString().padStart(2, "0");

      this.printTime = `${formattedMM}:${formattedSS}:${formattedMS}`;
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
