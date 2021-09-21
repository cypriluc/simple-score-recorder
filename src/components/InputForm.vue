<template>
  <form @submit.prevent="createResult" autocomplete="off">
    <!-- Name -->
    <div class="input-group pb-4">
      <label for="participantName" class="form-label m-2">Jméno</label>
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

    <!-- StopWatch -->
    <StopWatch @elapsedTime="saveElapsedTime" ref="stopWatch" />

    <!-- Penalty -->
    <div class="row">
      <div v-for="(item, item_index) in Items" :key="item" class="col p-4">
        <h5 class="text-left">{{ item }}</h5>

        <div
          class="btn-group flex-nowrap justify-content-center"
          role="group"
          aria-label="Group of options for penalty points"
        >
          <template
            v-for="(option, index) in penaltyOptions"
            :key="item_index + index"
          >
            <input
              type="radio"
              class="btn-check"
              :name="'btnradio-' + item_index"
              :id="'option-' + item_index + '-' + index"
              :value="option.value"
              v-model="penaltyPoints[item_index]"
              :checked="index == 0"
            />

            <label
              :for="'option-' + item_index + '-' + index"
              class="btn btn-sm"
              :class="option.class"
            >
              {{ option.label }}
            </label>
          </template>
        </div>
      </div>

      <p>Penalty: {{ penaltyFormated }}</p>
    </div>

    <div v-if="currentScore" class="input-group pb-4">
      <h4>
        Total Score: <span>{{ currentScoreFormated }}</span>
      </h4>
    </div>

    <button type="submit" class="btn btn-secondary m-2" id="submitBtn">
      Zapsat výsledek
    </button>
  </form>

  <!-- alert message -->
  <div class="position-fixed bottom-0 end-0 p-3" style="z-index: 11">
    <div role="alert" aria-live="assertive" aria-atomic="true">
      <div class="message__container hidden" id="infoMessage">
        <p v-if="requestResult" class="message__text">
          Soutěžící <b class="message__text--bold">{{ currentName }}</b> úspěšně
          zapsán.
        </p>
        <p v-else class="message__text">
          Chyba! Soutěžícího
          <b class="message__text--bold">{{ currentName }}</b> se nepovedlo
          zapsat.
        </p>
      </div>
    </div>
  </div>
</template>

<script>
import NProgress from "nprogress";
import { mapState } from "vuex";
import StopWatch from "@/components/StopWatch.vue";
import TimeFormat from "@/logic/TimeFormat.js";

export default {
  name: "InputForm",

  components: {
    StopWatch,
  },

  data() {
    return {
      result: this.createFreshResult(),
      requestResult: 0,
      currentName: "",
      Items: [
        "First Item",
        "Second Item",
        "Third Item",
        "Fourth Item",
        "Fifth Item",
        "Sixth Item",
        "Seventh Item",
        "Eight Item",
      ],
      penaltyPoints: new Array(8).fill(0),
      penaltyOptions: [
        { label: "Great", value: 0, class: "btn-outline-success" },
        { label: "OK", value: 10000, class: "btn-outline-secondary" },
        { label: "Fail", value: 20000, class: "btn-outline-danger" },
      ],
    };
  },

  computed: {
    ...mapState(["results"]),

    currentPenalty() {
      let penalty = this.penaltyPoints.reduce(function (a, b) {
        return a + b;
      }, 0);
      return penalty;
    },

    penaltyFormated() {
      let formatedPenalty = new TimeFormat(this.currentPenalty).getTime();
      return formatedPenalty;
    },

    currentScore() {
      return this.result.time + this.currentPenalty;
    },

    currentScoreFormated() {
      let formatedScore = new TimeFormat(this.currentScore).getTime();
      return formatedScore;
    },
  },

  methods: {
    createResult() {
      this.currentName = this.result.name;
      this.result.penalties = this.penaltyPoints;

      this.result.score = this.currentScore;
      this.result.scoreFormated = this.currentScoreFormated;

      this.$store
        .dispatch("createResult", this.result)
        .then(() => {
          this.requestResult = 1;
          this.showMessage("success");
          this.$refs.stopWatch.reset();

          this.result = this.createFreshResult();
          this.penaltyPoints = new Array(8).fill(0);
        })
        .catch((err) => {
          console.log("There was an error creating your result:");
          console.log(err);
          this.requestResult = 0;
          this.showMessage("error");
          NProgress.done();
        });

      document.activeElement.blur();
    },

    createFreshResult() {
      const id = Math.floor(Math.random() * 10000000);

      return {
        id: id,
        name: "",
        time: 0,
        penalties: [],
        score: 0,
        scoreFormated: "",
      };
    },

    showMessage(type) {
      const messageContainer = document.getElementById("infoMessage");
      if (type == "success") {
        messageContainer.classList.add("message__container--success");
      }
      if (type == "error") {
        messageContainer.classList.add("message__container--error");
      }
      messageContainer.classList.remove("hidden");

      setTimeout(function () {
        messageContainer.classList.add("hidden");
        messageContainer.classList.remove("message__container--success");
        messageContainer.classList.remove("message__container--error");
      }, 5000);
    },

    saveElapsedTime(time) {
      this.result.time = time;
    },
  },
};
</script>

<style scoped lang="scss">
.hidden {
  opacity: 0;
  visibility: none;
}

.message {
  &__container {
    padding: 1rem 2rem;
    border-radius: 0.25rem;
    transition: all 0.2s;

    &--success {
      background-color: rgba($color-tertiary, 0.8);
    }

    &--error {
      background-color: rgba($color-secondary, 0.8);
    }
  }

  &__text {
    margin: 0;
    color: #fff;
    font-family: "Inter", sans-serif;
    font-weight: 400;

    &--bold {
      font-weight: 700;
    }
  }
}
</style>
