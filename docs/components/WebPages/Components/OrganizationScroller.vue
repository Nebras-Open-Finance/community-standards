<template>
    <div v-if="orgs.length" class="LogoSlidingCarousel-slider">
        <div class="LogoSlidingCarousel-container" style="width: 20000px;">
            <div v-for="org in orgs" :key="org.OrganisationId" class="LogoSlidingCarousel-item">
                <div v-if="org.LogoUri" class="LogoItem" rel="noopener">
                    <img loading="lazy" class="LogoItem-img" :alt="org.OrganisationName" :src="org.LogoUri" />
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import axios from 'axios'

const orgs = ref([])
const loading = ref(true)
const error = ref(null)

function shuffleArray(array) {
    // Fisher-Yates shuffle
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1))
            ;[array[i], array[j]] = [array[j], array[i]]
    }
    return array
}

onMounted(async () => {
    try {
        const { data } = await axios.get('/api/trust-framework.json')

        const orgData = data.Organisations
        // Filter: must have LogoUri
        const filtered = orgData.filter(org => org.LogoUri)

        // Shuffle
        const shuffled = shuffleArray(filtered)

        // Sort by production = true first
        orgs.value = shuffled.sort((a, b) => {
            // Convert "TRUE" and "FALSE" strings to booleans
            const isAProduction = a.isProduction === "TRUE";
            const isBProduction = b.isProduction === "TRUE";

            // Sort by production status
            return isBProduction - isAProduction;
        });

    } catch (err) {
        error.value = err.message ?? 'Failed to load data'
    } finally {
        loading.value = false
    }
})
</script>

<style scoped>
.LogoSlidingCarousel-slider {
    position: absolute;
    width: 100vw;
    height: 9rem;
    /* h-36 */
    margin-left: auto;
    margin-right: auto;
    overflow: hidden;
    z-index: 999;
    /* z-999 (custom, but valid CSS) */
}

.LogoSlidingCarousel-container {
    display: flex;
    align-items: center;
    justify-content: space-between;
    height: 100%;
    margin: 0 auto;
    overflow: hidden;
    animation: move 30s linear infinite;
}

@keyframes move {
    100% {
        transform: translateX(-2000px);
    }
}

.LogoSlidingCarousel-container:hover {
    animation-play-state: paused;
}

.LogoSlidingCarousel-item {
    display: flex;
    min-width: 220px;
}

.LogoItem-img {
    width: 120px;
    margin-left: 1rem;
    transition: all 0.2s ease;
}

.LogoItem-img:hover {
    width: 130px;
    margin-left: 0.75rem;
}

.LogoItem {
    opacity: 0.9;
    filter: grayscale(100%);
}
</style>