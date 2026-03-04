<template>
  <div class="homepage">
    <PageHeader />

    <section class="section">

      <div class="section-heading">Knowledge Base</div>
      <p class="kb-lead">
        Technical guides and explainers for building on UAE Open Finance.
      </p>

      <div class="kb-search-bar">
        <svg class="kb-search-icon" xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24"
          fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <circle cx="11" cy="11" r="8" />
          <path d="m21 21-4.35-4.35" />
        </svg>
        <input v-model="query" class="kb-search-input" type="search" placeholder="Search articles…"
          aria-label="Search knowledge base articles" />
        <button v-if="query" class="kb-search-clear" @click="query = ''" aria-label="Clear search">✕</button>
      </div>

      <template v-if="filteredArticles.length > 0">
        <div class="card-grid">
          <a v-for="article in filteredArticles" :key="article.link" :href="article.link" class="kb-card">
            <span v-if="article.category" class="kb-card-category">{{ article.category }}</span>
            <h3 class="kb-card-title">{{ article.title }}</h3>
            <p class="kb-card-desc">{{ article.description }}</p>
            <span class="kb-card-arrow">Read article →</span>
          </a>
        </div>
      </template>

      <div v-else class="kb-empty">
        No articles found for <strong>"{{ query }}"</strong>
      </div>

    </section>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import PageHeader from './Components/PageHeader.vue'
import { data as articles } from '../../knowledge-base/articles.data.ts'

const query = ref('')

const filteredArticles = computed(() => {
  const q = query.value.trim().toLowerCase()
  if (!q) return articles
  return articles.filter(
    a =>
      a.title.toLowerCase().includes(q) ||
      a.description.toLowerCase().includes(q) ||
      a.category.toLowerCase().includes(q),
  )
})
</script>

<style scoped>
.kb-lead {
  font-size: 1.15rem;
  opacity: 0.7;
  margin-top: -1rem;
  margin-bottom: 2.5rem;
  max-width: 600px;
}

/* ── Search bar ── */
.kb-search-bar {
  position: relative;
  display: flex;
  align-items: center;
  max-width: 560px;
  margin-bottom: 3rem;
  background: #fff;
  border: 1.5px solid rgba(0, 39, 127, 0.2);
  border-radius: 10px;
  box-shadow: 0 2px 12px rgba(0, 39, 127, 0.07);
  transition: border-color 0.18s, box-shadow 0.18s;
}

.kb-search-bar:focus-within {
  border-color: rgba(0, 39, 127, 0.5);
  box-shadow: 0 2px 16px rgba(0, 39, 127, 0.12);
}

.kb-search-icon {
  flex-shrink: 0;
  margin-left: 0.9rem;
  color: rgba(0, 39, 127, 0.45);
  pointer-events: none;
}

.kb-search-input {
  flex: 1;
  border: none;
  outline: none;
  background: transparent;
  padding: 0.75rem 0.75rem;
  font-size: 1rem;
  color: rgba(0, 39, 127, 0.9);
}

.kb-search-input::placeholder {
  color: rgba(0, 39, 127, 0.35);
}

.kb-search-clear {
  background: none;
  border: none;
  cursor: pointer;
  padding: 0.4rem 0.75rem;
  font-size: 0.85rem;
  color: rgba(0, 39, 127, 0.4);
  border-radius: 6px;
  transition: color 0.15s, background 0.15s;
}

.kb-search-clear:hover {
  color: rgba(0, 39, 127, 0.8);
  background: rgba(0, 39, 127, 0.06);
}

/* ── Article cards ── */
.kb-card {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  padding: 1.75rem;
  background: #fff;
  border-radius: 14px;
  text-decoration: none;
  color: inherit;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.07);
  border: 1px solid rgba(0, 39, 127, 0.07);
  transition: transform 0.2s ease, box-shadow 0.2s ease;
}

.kb-card:hover {
  transform: translateY(-4px);
  box-shadow: 0 12px 36px rgba(0, 0, 0, 0.12);
}

.kb-card-category {
  font-size: 0.7rem;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.07em;
  color: rgba(0, 39, 127, 0.6);
  background: rgba(0, 39, 127, 0.07);
  padding: 0.2rem 0.55rem;
  border-radius: 4px;
  align-self: flex-start;
}

.kb-card-title {
  font-size: 1.15rem;
  font-weight: 600;
  line-height: 1.35;
  color: rgba(0, 39, 127, 0.95);
  margin: 0.15rem 0;
}

.kb-card-desc {
  font-size: 0.9rem;
  line-height: 1.6;
  opacity: 0.65;
  flex: 1;
}

.kb-card-arrow {
  font-size: 0.85rem;
  font-weight: 500;
  color: rgba(0, 39, 127, 0.6);
  margin-top: 0.5rem;
  transition: color 0.15s;
}

.kb-card:hover .kb-card-arrow {
  color: rgba(0, 39, 127, 1);
}

/* ── Empty state ── */
.kb-empty {
  padding: 3rem 0;
  font-size: 1rem;
  opacity: 0.6;
}
</style>
