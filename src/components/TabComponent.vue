<template>
  <b-tabs class="tabs" justified v-if="currentVersionIsUpdated">
    <b-tab :active="!key" :disabled="hasLogs(type.toLowerCase())" v-for="(type, key) in LogType">
      <template #title>
        <span class="tab-title"
          ><strong>{{ type.toLowerCase().charAt(0).toUpperCase() + type.slice(1) }}</strong></span
        >
      </template>
      <TabContent :log-type="type.toLowerCase()" />
    </b-tab>
  </b-tabs>
</template>

<script lang="ts">
import { useChangelogStore } from '@/stores/changelog'
import { computed } from 'vue'
import { LogType } from '@/types'
import { mapState } from 'pinia'

export default {
  name: 'TabComponent',
  setup() {
    const store = useChangelogStore()

    const currentVersionIsUpdated = computed(() => {
      return store.currentVersionId
    })

    return {
      currentVersionIsUpdated,
      logs: store.logs
    }
  },
  computed: {
    LogType() {
      return LogType
    },
    ...mapState(useChangelogStore, {
      logsByType: (state) => state.logs
    })
  },
  methods: {
    hasLogs(type: string): any {
      const logs = this.logs.find((log) => log.type === type)
      if (this.logs.find((log) => log.type === type)) {
        return logs ? Boolean(logs.logs.length <= 0) : false
      }
    }
  }
}
</script>

<style scoped lang="scss">
</style>
