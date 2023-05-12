<template>
  <ul>
    <li v-for="log in this.getLogs">{{ log.title }}</li>
  </ul>
</template>

<script lang="ts">
import {mapState} from "pinia";
import {useChangelogStore} from "@/stores/changelog";
import {computed} from "vue";
import {LogType} from "@/types";

export default {
  name: "WebsiteTab",
  computed: {
    ...mapState(useChangelogStore, ['currentVersionId', 'logs']),
    getLogs() {
      return this.logs.find((item: { type: LogType; }) => item.type === LogType.Website)?.logs
    }
  }
}
</script>

<style scoped>

</style>
