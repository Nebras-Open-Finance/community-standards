<template>
  <div class="ed-twocol">
    <slot />
  </div>
</template>

<style scoped>
.ed-twocol {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(20rem, 1fr));
  gap: 2.5rem;
  margin-top: 1rem;
}
</style>
