<template>
  <div class="ed-compare">
    <slot />
  </div>
</template>

<style scoped>
.ed-compare {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(22rem, 1fr));
  gap: 1.5rem;
  margin-top: 1.5rem;
}
</style>
