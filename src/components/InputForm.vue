<template>
  <div class="hello">
    <h1>{{ msg }}</h1>
  </div>

  <form @submit.prevent="createResult">
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

    <button type="submit" class="btn btn-success m-2" id="submitBtn">
      Send result
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
// import NProgress from "nprogress";
import { mapState } from "vuex";

export default {
  name: "InputForm",

  props: {
    msg: String,
  },

  data() {
    return {
      result: this.createFreshResult(),
      requestResult: 0,
      currentName: "",
    };
  },

  computed: {
    ...mapState(["results"]),
  },

  methods: {
    createResult() {
      this.currentName = this.result.name;

      this.$store
        .dispatch("createResult", this.result)
        .then(() => {
          this.requestResult = 1;
          this.showMessage("success");

          this.result = this.createFreshResult();
        })
        .catch((err) => {
          console.log("There was an error creating your result:");
          console.log(err);
          this.requestResult = 0;
          this.showMessage("error");
          // NProgress.done();
        });

      document.activeElement.blur();
    },

    createFreshResult() {
      const id = Math.floor(Math.random() * 10000000);

      return {
        id: id,
        name: "",
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
    border-radius: 20rem;
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
