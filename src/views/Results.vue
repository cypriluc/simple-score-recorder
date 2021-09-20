<template>
  <div class="about">
    <h1>Síň slávy</h1>
    <ScoreTable />
  </div>
</template>

<script>
import ScoreTable from "@/components/ScoreTable.vue";

export default {
  components: {
    ScoreTable,
  },
};
</script>

<style lang="scss" scoped>
@import "../scss/_variables.scss";

h1 {
  font-family: "Roboto slab", sans-serif;
  color: $color-primary-dark;
}
</style>
