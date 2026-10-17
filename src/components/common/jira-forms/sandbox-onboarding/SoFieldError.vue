<script setup lang="ts">
defineProps<{ id: string; message: string }>()
</script>

<template>
  <p :id="id" class="so-err">
    <span class="so-err__icon" aria-hidden="true">!</span>{{ message }}
  </p>
</template>
