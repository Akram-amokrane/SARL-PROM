<template>
  <div class="pulse"></div>
</template>

<style scoped>
.pulse {
  width: 22.4px;
  height: 22.4px;
  border-radius: 50%;
  background: #e8a75f;
  box-shadow: 0 0 0 0 rgba(232, 167, 95, 0.5);
  animation: pulse-kefe91md 2s infinite linear;
  position: relative;
}

.pulse:before,
.pulse:after {
  content: '';
  position: absolute;
  inset: 0;
  border-radius: inherit;
  box-shadow: 0 0 0 0 rgba(232, 167, 95, 0.5);
  animation: inherit;
  animation-delay: -0.7s;
}

.pulse:after {
  animation-delay: -1.4s;
}

@keyframes pulse-kefe91md {
  100% {
    box-shadow: 0 0 0 34px #0000;
  }
}
</style>
