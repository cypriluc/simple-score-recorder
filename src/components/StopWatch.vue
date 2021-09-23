<template>
  <div class="input-group mb-4">
    <div class="stopwatch mx-auto">
      <div class="stopwatch__circle">
        <h2 class="stopwatch__text" id="timeText">{{ printTime }}</h2>
      </div>

      <!--  <div class="btn-group btn-group-round" role="group"> -->
      <button
        id="startBtn"
        type="button"
        class="btn btn-info btn-round mx-2"
        v-on:click="start()"
      >
        <font-awesome-icon icon="play" class="icon icon--white" />
      </button>
      <button
        id="stopBtn"
        type="button"
        class="btn btn-info btn-round mx-2"
        v-on:click="stop()"
      >
        <font-awesome-icon icon="pause" class="icon icon--white" />
      </button>
      <button
        id="resetBtn"
        type="button"
        class="btn btn-danger btn-round mx-2"
        v-on:click="reset()"
      >
        <font-awesome-icon icon="stop" class="icon icon--white" />
      </button>
    </div>
  </div>
  <!--   </div> -->
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
    margin: 0;
    margin-left: 2rem;
    font-size: 3rem;
    color: $cyan;
  }

  &__circle {
    width: 17rem;
    height: 17rem;
    border-radius: 100%;
    border: 3px solid rgba($cyan, 0.8);
    display: flex;
    justify-content: flex-start;
    align-items: center;
    margin: 1.5rem 0;
    background-color: rgba(#fff, 0.6);
  }
}

.icon {
  color: $cyan;

  &--white {
    color: #fff;
  }
}
</style>
