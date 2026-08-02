<template>
  <div class="wf-frame">
    <ConsentAuthLayout>
      <template #consent>
        <ConsentPeriodicSchedule />
      </template>
      <template #auth>
        <AuthorizationPeriodicSchedule />
      </template>
    </ConsentAuthLayout>
  </div>
</template>

<style scoped>
.wf-frame :deep(.cal__layout) {
  grid-template-columns: 41% 41%;
  justify-content: space-between;
  gap: 0;
}

@media (max-width: 768px) {
  .wf-frame :deep(.cal__layout) {
    grid-template-columns: 1fr;
    justify-content: stretch;
  }
}
</style>
