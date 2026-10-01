<script setup lang="ts">
export interface BpActor {
  key: string
  name: string
  sub: string
  color: string
  responsibilities: string[]
}

defineProps<{ actors: BpActor[] }>()
</script>

<template>
  <EdRefTable>
    <table>
      <thead>
        <tr>
          <th>Actor</th>
          <th>Responsibility</th>
        </tr>
      </thead>
      <tbody>
        <template v-for="a in actors" :key="a.key">
          <tr v-for="(r, i) in a.responsibilities" :key="a.key + '-' + i">
            <td
              v-if="i === 0"
              :rowspan="a.responsibilities.length"
              class="bp-actor"
              :style="{ '--bp-actor-color': a.color }"
            >
              <strong>{{ a.name }}</strong>
              <span class="bp-actor__sub">{{ a.sub }}</span>
            </td>
            <td>{{ r }}</td>
          </tr>
        </template>
      </tbody>
    </table>
  </EdRefTable>
</template>

<style scoped>
/* Actor cell spans its responsibility rows; the rule keys it to the actor. */
.bp-actor {
  min-width: 11rem;
  border-left: 3px solid var(--bp-actor-color, var(--at-teal));
  background: var(--at-bg-cream);
}
.bp-actor strong {
  display: block;
  font-family: var(--at-mono);
  font-size: 0.86rem;
  letter-spacing: 0.06em;
}
.bp-actor__sub {
  display: block;
  margin-top: 0.35rem;
  font-size: 0.8rem;
  line-height: 1.45;
  color: var(--at-mute);
}
</style>
