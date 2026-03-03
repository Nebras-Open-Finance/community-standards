<script setup>
import { ref, onMounted } from 'vue'

const lfis = ref([])

const props = defineProps({
  families: {
    type: Array,
    default: () => ['account-information', 'payment', 'confirmation', 'product']
  }
})

onMounted(async () => {
  const response = await fetch('https://data.directory.openfinance.ae/participants')
  const data = await response.json()
  lfis.value = processData(data)
})

function processData(data) {
  return data
    .filter(org => org.AuthorisationServers?.length > 0)
    .map(org => {

      const servers = org.AuthorisationServers
        .map(server => {

          const services = {}

          server.ApiResources?.forEach(resource => {

            // Filter by prop families (if provided)
            if (props.families.length > 0 && !props.families.includes(resource.ApiFamilyType)) {
              return
            }

            const type = getServiceType(resource.ApiFamilyType)
            if (!type) return

            if (!services[type]) {
              services[type] = []
            }

            services[type].push({
              version: resource.ApiVersion,
              endpoints: resource.ApiDiscoveryEndpoints?.map(ep => ep.ApiEndpoint) || [],
              expanded: false
            })
          })

          // ❗ Only keep server if it has services after filtering
          if (Object.keys(services).length === 0) {
            return null
          }

          return {
            name: server.CustomerFriendlyName || org.OrganisationName,
            logo: server.CustomerFriendlyLogoUri || 'https://data.directory.openfinance.ae/logos/placeholder-logo.png',
            services,
            flags: server.Flags,
            expanded: false
          }
        })
        .filter(Boolean) // remove null servers

      if (servers.length === 0) return null

      return {
        orgName: org.OrganisationName,
        servers
      }
    })
    .filter(Boolean)
}

function getServiceType(familyType) {
  if (familyType === 'account-information') return 'Account Information'
  if (familyType === 'payment') return 'Payment Initiation'
  if (familyType === 'confirmation') return 'Confirmation of Payee'
  if (familyType === 'product') return 'Products & Leads'
  return null
}

const toggleServer = (server) => {
  server.expanded = !server.expanded
}

const toggleService = (service) => {
  service.expanded = !service.expanded
}
</script>

<template>
  <div v-if="lfis.length > 0" class="lfi-list">

    <h2>Production Services Overview</h2>
    The following LFIs currently offer live Open Finance banking services:
    <div v-for="org in lfis" :key="org.orgName" class="org">
      <div v-for="server in org?.servers" :key="server.name" class="server-card">
        <div class="server-header" @click="toggleServer(server)">
          <img :src="server.logo" alt="" class="server-logo" loading="lazy" />
          <h3 class="server-name">{{ org.orgName }} ({{ server.flags.AccountType.join(', ') }})</h3>
          <span class="toggle-icon" :class="{ 'is-open': server.expanded }">></span>
        </div>
        <div v-if="server.expanded" class="server-content">
          <div v-for="(versions, key) in server.services" :key="key" class="service">
            <div class="service-header">
              {{ key }}
            </div>

            <div v-for="service in versions" :key="service.version">
              <div class="service-header" @click="toggleService(service)">
                v{{ service.version }}
                <span class="toggle-icon" :class="{ 'is-open': service.expanded }">></span>
              </div>

              <ul v-if="service.expanded" class="endpoints">
                <li v-for="ep in service.endpoints" :key="ep">
                  <code>{{ ep }}</code>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.lfi-list {
  display: flex;
  flex-direction: column;
}

.org-name {
  font-size: 1.5rem;
  margin-bottom: 1rem;
}

.server-card {
  border-radius: 12px;
  overflow: hidden;
  transition: all 0.2s;
}

.server-header {
  display: flex;
  align-items: center;
  padding: 1rem 1.5rem;
  cursor: pointer;
  gap: 1rem;
}

.server-header:hover {
  background: var(--vp-c-bg);
}

.server-logo {
  height: 48px;
  width: auto;
  object-fit: contain;
  border-radius: 4px;
}

.is-open {
  transform: rotate(90deg);
}

.server-name {
  flex: 1;
  font-size: 1.1rem;
  margin: 0;
}

.toggle-icon {
  font-size: 1.2rem;
  transition: transform 0.2s;
}

.server-content {
  padding: 1rem 1.5rem;
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.service {
  border-top: 1px solid var(--vp-c-divider);
}

.service-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0.75rem 0;
  cursor: pointer;
  font-weight: 600;
  color: var(--vp-c-text-1);
}

.service-header:hover {
  color: var(--vp-c-brand);
}

.endpoints {
  list-style: none;
  padding: 0;
  margin: 0;
  font-size: small;
  border-radius: 8px;
  overflow: hidden;
}

.endpoints li {
  padding: 0.5rem 1rem;
  border-bottom: 1px solid var(--vp-c-divider);
  word-break: break-all;
}

.endpoints li:last-child {
  border-bottom: none;
}

.endpoints code {
  font-family: var(--vp-font-family-mono);
  color: var(--vp-code-color);
}
</style>