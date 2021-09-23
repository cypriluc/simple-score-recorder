<template>
  <div class="about">
    <!-- <h1>&#127942; &#127881; Síň slávy &#127881; &#10024;</h1> -->

    <h1 class="title my-4">
      <span>&#127942;</span>
      Síň slávy
      <span>&#127942;</span>
    </h1>
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
.title {
  font-size: 3rem;
  font-weight: 900;
  display: flex;
  justify-content: space-between;
}
</style>
