<template>
  <div class="about">
    <!-- <h1>&#127942; &#127881; Síň slávy &#127881; &#10024;</h1> -->
    <h1 class="my-4">&#127881; Síň slávy &#127881;</h1>
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
