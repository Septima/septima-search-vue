<template>
  <div class="loader"></div>
</template>

<style scoped>
.loader,
.loader:before,
.loader:after {
  border-radius: 50%;
  width: 2em;
  height: 2em;
  animation-fill-mode: both;
  animation: bblFadInOut 1.8s infinite ease-in-out;
}
.loader {
  color: #fff;
  font-size: 0.3rem;
  position: relative;
  text-indent: -9999em;
  transform: translateZ(0);
  animation-delay: -0.16s;
  transform: translate(-1.5rem, -0.75rem);
  color: gray;
}
.loader:before,
.loader:after {
  content: '';
  position: absolute;
  top: 0;
}
.loader:before {
  left: -3em;
  animation-delay: -0.32s;
}
.loader:after {
  left: 3em;
}

@keyframes bblFadInOut {
  0%,
  80%,
  100% {
    box-shadow: 0 2.5em 0 -1.3em;
  }
  40% {
    box-shadow: 0 2.5em 0 0;
  }
}
</style>
