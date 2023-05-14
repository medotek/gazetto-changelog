<template>
  <b-tabs class="tabs component" content-class="mt-3" justified v-if="currentVersionIsUpdated">
    <b-tab active :disabled="hasLogs(LogType.Website)">
      <template #title>
        <span class="tab-title"><strong>Site Internet</strong></span>
      </template>
      <WebsiteTabContent/>
    </b-tab>
    <b-tab class="tab" title="Twitter" :disabled="hasLogs(LogType.Twitter)">
    </b-tab>
    <b-tab class="tab" title="Hoyolab" :disabled="hasLogs(LogType.Hoyolab)">
      <HoyolabTabContent/>
    </b-tab>
    <b-tab class="tab" title="Youtube" :disabled="hasLogs(LogType.YouTube)">
      <YoutubeTabContent/>
    </b-tab>
  </b-tabs>
</template>

<script lang="ts">
import {useChangelogStore} from "@/stores/changelog";
import {computed} from "vue";
import {LogType} from "@/types";
import {mapState} from "pinia";

export default {
  name: "TabComponent",
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
      logsByType: (state) => state.logs,
    }),
  },
  methods: {
    hasLogs(type: LogType): Boolean {
      const logs = this.logs.find(log => log.type === type)
      if (this.logs.find(log => log.type === type)) {
        return logs?.logs?.length <= 0;
      }
    }
  }
}
</script>

<style scoped lang="scss">
</style>
