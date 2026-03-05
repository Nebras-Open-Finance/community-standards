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
    <p class="lfi-intro">The following LFIs currently offer live Open Finance banking services:</p>

    <div class="lfi-table">
      <div class="lfi-table-header">
        <span>Institution</span>
        <span>Account Type</span>
        <span>Services</span>
        <span>Versions</span>
      </div>

      <template v-for="org in lfis" :key="org.orgName">
        <template v-for="server in org.servers" :key="server.name">
          <div class="lfi-row" @click="toggleServer(server)" :class="{ 'is-expanded': server.expanded }">
            <span class="lfi-institution">
              <img :src="server.logo" alt="" class="server-logo" loading="lazy" />
              <span class="server-name">{{ org.orgName }}</span>
            </span>
            <span class="lfi-account-type">
              <span v-for="t in server.flags.AccountType" :key="t" class="badge badge-type">{{ t }}</span>
            </span>
            <span class="lfi-services">
              <span v-for="(_, key) in server.services" :key="key" class="badge badge-service">{{ key }}</span>
            </span>
            <span class="lfi-versions">
              <span v-for="v in [...new Set(Object.values(server.services).flat().map(s => s.version))].sort()" :key="v" class="badge badge-version">v{{ v }}</span>
            </span>
            <span class="toggle-icon" :class="{ 'is-open': server.expanded }">›</span>
          </div>

          <div v-if="server.expanded" class="lfi-detail">
            <div v-for="(versions, key) in server.services" :key="key" class="detail-service">
              <div class="detail-service-name">{{ key }}</div>
              <div v-for="service in versions" :key="service.version" class="detail-version">
                <div class="detail-version-header" @click.stop="toggleService(service)">
                  <span>v{{ service.version }}</span>
                  <span class="toggle-icon small" :class="{ 'is-open': service.expanded }">›</span>
                </div>
                <ul v-if="service.expanded" class="endpoints">
                  <li v-for="ep in service.endpoints" :key="ep"><code>{{ ep }}</code></li>
                </ul>
              </div>
            </div>
          </div>
        </template>
      </template>
    </div>
  </div>
</template>

<style scoped>
.lfi-intro {
  font-size: 0.9rem;
  color: var(--vp-c-text-2);
  margin-bottom: 0.75rem;
}

.lfi-table {
  border: 1px solid var(--vp-c-divider);
  border-radius: 8px;
  overflow: hidden;
  font-size: 0.85rem;
}

.lfi-table-header {
  display: grid;
  grid-template-columns: 2fr 1fr 2fr 3rem 1.5rem;
  padding: 0.4rem 0.75rem;
  background: var(--vp-c-bg-soft);
  font-size: 0.75rem;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.04em;
  color: var(--vp-c-text-2);
  border-bottom: 1px solid var(--vp-c-divider);
}

.lfi-row {
  display: grid;
  grid-template-columns: 2fr 1fr 2fr 3rem 1.5rem;
  align-items: center;
  padding: 0.4rem 0.75rem;
  cursor: pointer;
  border-bottom: 1px solid var(--vp-c-divider);
  transition: background 0.15s;
  gap: 0.5rem;
}

.lfi-row:last-child {
  border-bottom: none;
}

.lfi-row:hover,
.lfi-row.is-expanded {
  background: var(--vp-c-bg-soft);
}

.lfi-institution {
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.server-logo {
  height: 24px;
  width: 24px;
  object-fit: contain;
  border-radius: 4px;
  flex-shrink: 0;
}

.server-name {
  font-weight: 500;
  color: var(--vp-c-text-1);
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.lfi-account-type,
.lfi-services {
  display: flex;
  flex-wrap: wrap;
  gap: 0.35rem;
}

.badge {
  display: inline-block;
  padding: 0.1rem 0.4rem;
  border-radius: 4px;
  font-size: 0.7rem;
  font-weight: 500;
  white-space: nowrap;
}

.badge-type {
  background: var(--vp-c-indigo-soft);
  color: var(--vp-c-indigo-1);
}

.badge-service {
  background: var(--vp-c-green-soft);
  color: var(--vp-c-green-1);
}

.lfi-versions {
  display: flex;
  flex-wrap: wrap;
  gap: 0.2rem;
}

.badge-version {
  background: var(--vp-c-bg);
  color: var(--vp-c-text-2);
  border: 1px solid var(--vp-c-divider);
  font-weight: 400;
}

.toggle-icon {
  font-size: 1rem;
  transition: transform 0.15s;
  color: var(--vp-c-text-3);
  justify-self: end;
}

.toggle-icon.small {
  font-size: 0.85rem;
}

.toggle-icon.is-open {
  transform: rotate(90deg);
}

.lfi-detail {
  padding: 0.5rem 0.75rem 0.75rem 3rem;
  background: var(--vp-c-bg-soft);
  border-bottom: 1px solid var(--vp-c-divider);
  display: flex;
  flex-wrap: wrap;
  gap: 1rem;
}

.detail-service {
  min-width: 200px;
}

.detail-service-name {
  font-size: 0.72rem;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.04em;
  color: var(--vp-c-text-2);
  margin-bottom: 0.25rem;
}

.detail-version-header {
  display: flex;
  align-items: center;
  gap: 0.25rem;
  cursor: pointer;
  font-size: 0.8rem;
  font-weight: 500;
  color: var(--vp-c-brand);
  padding: 0.15rem 0;
}

.detail-version-header:hover {
  color: var(--vp-c-brand-dark);
}

.endpoints {
  list-style: none;
  padding: 0;
  margin: 0.25rem 0 0 0;
}

.endpoints li {
  padding: 0.15rem 0;
  word-break: break-all;
}

.endpoints code {
  font-family: var(--vp-font-family-mono);
  font-size: 0.72rem;
  color: var(--vp-code-color);
}
</style>