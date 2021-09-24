<template>
  <div class="bg"></div>
  <main class="content">
    <router-view />
  </main>
</template>

<style lang="scss">
@import url("https://fonts.googleapis.com/css2?family=Inter:wght@200;300;400;700;900&family=Roboto+Slab:wght@400;700;900&display=swap");

// overwrite bootstrap variables
$white: #fff !default;
$gray-100: #f8f9fa !default;
$gray-200: #e9ecef !default;
$gray-300: #dee2e6 !default;
$gray-400: #ced4da !default;
$gray-500: #adb5bd !default;
$gray-600: #6c757d;
$gray-700: #495057 !default;
$gray-800: #343a40 !default;
$gray-900: #212529 !default;
$black: #000 !default;
$blue: #213665;
$indigo: #6610f2 !default;
$purple: #6f42c1 !default;
$pink: #d63384 !default;
$red: #dc3545;
$orange: #db9233;
$yellow: #f9b413;
$green: #8dad00;
$teal: #6aade4;
$cyan: #074794;
$light: #ede7ea;

@import "~bootstrap/scss/bootstrap.scss";

#app {
  font-family: Inter, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: $blue;
  box-sizing: border-box;
  background-image: linear-gradient(to right bottom, $blue, $cyan);
  min-height: 100vh;
  overflow-x: hidden;
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
}

.bg {
  position: fixed;
  height: 100%;
  width: 60%;
  right: -5rem;
  bottom: -5rem;
  background-image: url("./assets/symbol_cvut_konturova_verze_negativ.svg");
  background-size: cover;
  background-repeat: no-repeat;
  opacity: 0.2;
}

h1 {
  font-weight: 700;
  letter-spacing: 1.8px;
  color: $cyan;
}

h3,
h4 {
  font-weight: 400;
}

.content {
  margin: 3rem;
  background-image: linear-gradient(
    to left bottom,
    rgba($gray-100, 0.88),
    rgba($gray-200, 0.88)
  );
  padding: 2rem;
  box-shadow: 5px 5px 10px rgba(#000, 0.2);
  border-radius: 0.25rem;
  max-width: 1300px;
  min-width: 1000px;
  position: relative;
}

.btn-group-round > .btn {
  border-radius: 50rem;
}

.btn-round {
  border-radius: 50rem !important;
}
.input-group > span,
.input-group > input {
  border-radius: 50rem;
}

/* TRANSITIONS */
.slide-up-enter {
  transform: translateY(10px);
  opacity: 0;
}

.slide-up-enter-active {
  transition: all 0.2s ease;
}

.slide-up-move {
  transition: transform 0.8s ease-in;
}
</style>
