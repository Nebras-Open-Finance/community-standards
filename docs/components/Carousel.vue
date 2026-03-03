<script setup>
import { ref } from 'vue'


const props = defineProps({
  images: {
    type: Array,
    required: true
  }
})

const currentIndex = ref(0)

const next = () => {
  currentIndex.value = (currentIndex.value + 1) % props.images?.length
}

const prev = () => {
  currentIndex.value = (currentIndex.value - 1 + props.images?.length) % props.images?.length
}
</script>

<template>
  <div v-if="images" class="carousel">
    <div class="title">
    {{ images[currentIndex]?.title }}
    </div>
    <div class="image-container">
      <img v-if="images[currentIndex].src" :src="images[currentIndex].src" :alt="images[currentIndex].alt" class="carousel-image" />
      <div v-html="images[currentIndex].tagline" class="tag-line"></div>
    </div>

    <div class="controls">
      <div class="step-label">Step {{ currentIndex + 1 }}/{{ images.length }}</div>
      <button class="small-btn" v-if="currentIndex > 0" @click="prev">← Previous</button>
      <button class="small-btn"  v-if="currentIndex < images.length -1" @click="next">Next →</button>
    </div>
  </div>
</template>

<style scoped>
.carousel {
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 2.5rem;
  margin-bottom: 2rem;
}

.title {
  width: 100%;
  font-size: 1.1rem;
  font-weight: bold;
  margin-left: 2rem;
  margin-bottom: 0.5rem;
}

.image-container {
  width: 100%;
  position: relative;
  text-align: center;
}

.carousel-image {
  width: 100%;
  border-radius: 8px;
  box-shadow: 0 4px 10px rgba(0,0,0,0.1);
}

.tag-line {
  position: absolute;
  font-size: 0.8em;
  bottom: 6px;
  left: 8px;
  background: white;
  padding-left: 4px;
  padding-right: 4px;
  border-radius: 6px;
}

.step-label {
  font-size: 0.75rem;
  padding-top: 0.4rem;
  font-weight: bold;
  margin-right: auto
}

.controls {
  margin-top: 0.75rem;
  margin-left: auto;
  margin-right: auto;
  width: 95%;
  display: flex;
  gap: 1rem;
}

.small-btn {
  font-size: 0.75rem;
  padding: 0.3rem 0.6rem;
  background-color: #3b82f6;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  transition: background 0.2s ease;
}

.small-btn:hover {
  background-color: #2563eb;
}
</style>
