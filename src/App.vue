<script setup lang="ts">
import { computed, onMounted } from 'vue'
import TabComponent from '@/components/TabComponent.vue'
import { watch } from 'vue'
import { useChangelogStore } from '@/stores/changelog'

const store = useChangelogStore()

const getVersions = computed(() => {
  return store.getVersions
})

const versions = computed(() => {
  return store.versions
})

onMounted(async () => {
  await store.fetchVersions()
  // Setting the first version by default :
  if (store.versions?.length && store.versions[0]?.id) {
    store.dispatchCurrentVersion(store.versions[0].id)
    // Prefetch all logs
    await store.fetchLogs()
  }
})

// Refresh logs by version
watch(
  () => store.currentVersionId,
  async () => {
    console.log('Current version updated')
    await store.fetchLogs()
  }
)
</script>

<template>
  <div class="app">
    <HeaderComponent />
    <TabComponent />
  </div>
</template>

<style scoped lang="scss"></style>
