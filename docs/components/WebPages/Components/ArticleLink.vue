<template>
  <a
    :href="link"
    target="_blank"
    rel="noopener noreferrer"
    class="feature-card"
  >
    <div class="card-image">
      <img :src="imageSrc" :alt="imageAlt" />
    </div>

    <div class="card-content">
      <span class="card-date">{{ date }}</span>
      <h3 class="card-title">{{ title }}</h3>
      <p class="card-text">{{ text }}</p>
    </div>
  </a>
</template>

<script>
export default {
  name: "FeatureCard",
  props: {
    link: {
      type: String,
      required: true,
    },
    title: {
      type: String,
      required: true,
    },
    date: {
      type: String,
      required: true,
    },
    text: {
      type: String,
      required: true,
    },
    imageSrc: {
      type: String,
      required: true,
    },
    imageAlt: {
      type: String,
      default: "Featured article image",
    },
  },
};
</script>

<style scoped>

.feature-card {
  display: flex;
  flex-direction: column;
  background: #ffffff;
  border-radius: 18px;
  overflow: hidden;
  text-decoration: none;
  color: inherit;
  box-shadow: 0 14px 40px rgba(0, 0, 0, 0.1);
  transition: transform 0.25s ease, box-shadow 0.25s ease;
}

.feature-card:hover {
  transform: translateY(-6px);
  box-shadow: 0 24px 60px rgba(0, 0, 0, 0.15);
}

.card-image {
  width: 100%;
  height: 220px;
  overflow: hidden;
}

.card-image img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.4s ease;
}

.feature-card:hover .card-image img {
  transform: scale(1.06);
}

.card-content {
  padding: 1.5rem;
  display: flex;
  flex-direction: column;
  gap: 0.6rem;
}

.card-date {
  font-size: 0.75rem;
  font-weight: 500;
  letter-spacing: 0.05em;
  text-transform: uppercase;
  opacity: 0.6;
}

.card-title {
  font-size: 1.25rem;
  font-weight: 600;
  line-height: 1.3;
}

.card-text {
  font-size: 0.95rem;
  line-height: 1.55;
  opacity: 0.75;

  /* truncate after 3 lines */
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  overflow: hidden;
}
</style>