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
      <div class="col mx-auto">
        <h4 class="text-left">First item</h4>

        <div class="input-group mx-4 justify-content-center">
          <div
            class="option"
            v-for="(option, index) in penaltyOptions"
            :key="index"
          >
            <label :for="option.id" class="btn btn-sm" :class="option.class">
              {{ option.label }}
            </label>

            <input
              type="radio"
              class="btn-check"
              name="options"
              :id="option.id"
              :value="option.value"
              v-model="penaltyPoints[0]"
            />
          </div>
        </div>
      </div>

      {{ penaltyPoints }}
      {{ currentPenalty }}
    </div>

    <div v-if="currentScore" class="input-group pb-4">
      <h4>
        Total Score: <span>{{ currentScore }}</span>
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
      penaltyPoints: [0, 0, 0, 0],
      penaltyOptions: [
        { id: "option1-1", label: "Great", value: 0, class: "btn-success" },
        { id: "option1-2", label: "OK", value: 10000, class: "btn-secondary" },
        { id: "option1-3", label: "Fail", value: 20000, class: "btn-danger" },
      ],
      searchedItems: [{ id: "item-1", title: "First Item", options: "" }],
    };
  },

  computed: {
    ...mapState(["results"]),

    currentScore() {
      return this.result.time + this.result.penalty;
    },

    currentPenalty() {
      let penalty = this.penaltyPoints.reduce(function (a, b) {
        return a + b;
      }, 0);
      return penalty;
    },
  },

  methods: {
    createResult() {
      this.currentName = this.result.name;
      this.result.penalty = this.currentPenalty;

      let finalScore = Math.floor(this.currentScore / 1000);
      this.result.score = finalScore;

      this.$store
        .dispatch("createResult", this.result)
        .then(() => {
          this.requestResult = 1;
          this.showMessage("success");
          this.$refs.stopWatch.reset();

          this.result = this.createFreshResult();
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
        penalty: 0,
        score: 0,
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
