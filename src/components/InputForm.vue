<template>
  <form @submit.prevent="createResult" autocomplete="off" class="form">
    <!-- STOPWATCH -->
    <div class="form__watch">
      <StopWatch @elapsedTime="saveElapsedTime" ref="stopWatch" />
    </div>

    <!-- PENALTIES -->
    <div class="form__penalty">
      <!-- Penalty -->
      <div class="row text-left">
        <div
          v-for="(item, item_index) in Items"
          :key="item"
          class="form__object col-xl-4 col-md-6"
        >
          <h5 class="text-left">{{ item }}</h5>

          <!-- OBJECT GUESS RESULT - OPTIONS GROUP -->
          <div
            class="btn-group btn-group-round mb-2"
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
                <font-awesome-icon :icon="option.icon" class="icon" />
              </label>
            </template>
          </div>

          <!-- NOTE -->
          <input
            type="text"
            placeholder="poznámka"
            id="itemNote"
            class="form-control form-control-sm"
            aria-label="note"
            v-model="penaltyNotes[item_index]"
          />
        </div>

        <!-- TOTAL PENALTY -->
        <h5 class="text-left pt-2">Penalizace: {{ penaltyFormated }}</h5>
      </div>
    </div>

    <!-- NAME -->
    <div class="form__name input-group">
      <!--       <label for="participantName" class="form-label m-2">Jméno</label> -->
      <span class="input-group-text" id="nameLabel">Jméno</span>
      <input
        id="participantName"
        type="text"
        class="form-control"
        placeholder="Name"
        aria-label="Name"
        aria-describedby="nameLabel"
        v-model="result.name"
        required
      />
    </div>

    <!-- SUMMARY -->
    <div class="form__sum">
      <!-- TOTAL SCORE -->

      <h4>
        Total Score: <span>{{ currentScoreFormated }}</span>
      </h4>

      <!-- SEND FORM -->
      <button
        type="submit"
        class="btn btn-lg btn-info btn-round m-2"
        id="submitBtn"
      >
        Zapsat výsledek
      </button>
    </div>
  </form>

  <!--   ALL RESULTS LINK -->
  <router-link to="/results" target="_blank" class="results-link"
    >Výsledky</router-link
  >

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
        "Objekt 1",
        "Objekt 2",
        "Objekt 3",
        "Objekt 4",
        "Objekt 5",
        "Objekt 6",
        "Objekt 7",
        "Objekt 8",
      ],
      penaltyPoints: new Array(8).fill(0),
      penaltyNotes: new Array(8).fill(""),
      penaltyOptions: [
        {
          label: "všechno",
          icon: "check",
          value: 0,
          class: "btn-outline-info",
        },
        {
          label: "objekt",
          icon: "cube",
          value: 10000,
          class: "btn-outline-secondary",
        },
        {
          label: "místo",
          icon: "map-marker-alt",
          value: 10001,
          class: "btn-outline-secondary",
        },
        {
          label: "nic",
          icon: "times",
          value: 20000,
          class: "btn-outline-danger",
        },
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
      this.result.notes = this.penaltyNotes;

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
          this.penaltyNotes = new Array(8).fill("");
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
        notes: [],
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
.form {
  display: grid;
  grid-template-columns: 35% 1fr;
  grid-gap: 2rem;
  justify-content: center;
  align-items: center;

  &__object {
    padding: 0.5rem 1rem;
    display: flex;
    flex-direction: column;
  }

  &__name {
    display: flex;
    align-items: center;
  }

  &__sum {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
}
.hidden {
  opacity: 0;
  visibility: none;
  display: none;
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

#itemNote {
  border-radius: 10rem;
  width: 100%;
}

.text-left {
  text-align: left !important;
}

.results-link {
  color: #fff;
  position: absolute;
  right: 0;
  bottom: -2.5rem;
}
</style>
