<template>
  <table class="table table-striped results__table">
    <thead>
      <tr>
        <th class="table-heading" scope="col">#</th>
        <th class="table-heading" scope="col">Jméno</th>
        <th class="table-heading" scope="col">Penalizace</th>
        <th class="table-heading" scope="col">Skóre</th>
      </tr>
    </thead>
    <tbody>
      <transition-group name="slide-up" appear>
        <tr v-for="(result, index) in sortedResults" :key="result.id">
          <th v-if="index == 0" scope="row">&#129351;</th>
          <th v-else-if="index == 1" scope="row">&#129352;</th>
          <th v-else-if="index == 2" scope="row">&#129353;</th>
          <th v-else scope="row">{{ index + 1 }}</th>
          <td>{{ result.name }}</td>
          <td>
            <template
              v-for="(penalty, pen_index) in result.penalties"
              :key="pen_index"
            >
              <font-awesome-icon
                v-if="penalty == 0"
                icon="check"
                class="icon icon--blue"
              />
              <font-awesome-icon
                v-if="penalty == 10000"
                icon="cube"
                class="icon"
              />
              <font-awesome-icon
                v-if="penalty == 10001"
                icon="map-marker-alt"
                class="icon"
              />
              <font-awesome-icon
                v-if="penalty == 20000"
                icon="times"
                class="icon icon--red"
              />
            </template>
          </td>
          <td>{{ result.scoreFormated }}</td>
        </tr>
      </transition-group>
    </tbody>
  </table>
</template>

<script>
import { mapGetters } from "vuex";

export default {
  name: "ScoreTable",

  created() {
    this.$store.dispatch("fetchResults");
  },

  computed: {
    ...mapGetters(["sortedResults"]),
  },

  mounted() {},

  methods: {},
};
</script>

<style lang="scss" scoped>
.results {
  &__table {
    color: $blue;
    font-size: 1.1rem;
  }
}

.icon {
  margin-right: 0.5rem;
  color: #6c757d;

  &--blue {
    color: $cyan;
  }

  &--red {
    color: $red;
  }
}
</style>
