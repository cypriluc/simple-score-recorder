<template>
  <div id="nav">
    <router-link to="/">Home</router-link> |
    <router-link to="/results">Results</router-link>
  </div>
  <router-view />
</template>

<style lang="scss">
@import url("https://fonts.googleapis.com/css2?family=Inter:wght@200;300;400;700;900&family=Roboto+Slab:wght@400;700;900&display=swap");

#app {
  font-family: Inter, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: $color-primary-dark;
}

#nav {
  padding: 30px;

  a {
    font-weight: bold;
    color: $color-primary;

    &.router-link-exact-active {
      color: $color-secondary;
    }
  }
}

h1,
h2,
h3,
h4 {
  font-family: "Roboto Slab", Arial, sans-serif;
}

h1 {
  font-weight: 900 !important;
}
</style>
