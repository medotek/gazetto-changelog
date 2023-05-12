<template>
  <ul>
    <li v-for="log in this.getLogs">{{ log.title }}</li>
  </ul>
</template>

<script lang="ts">
import {useChangelogStore} from "@/stores/changelog";
import {computed} from "vue";
import {mapState} from "pinia";
import {LogType} from "@/types";

export default {
  name: "YoutubeTab",
  computed: {
    ...mapState(useChangelogStore, ['currentVersionId', 'logs']),
    getLogs() {
      return this.logs.find((item: { type: LogType; }) => item.type === LogType.YouTube)?.logs
    }
  }
}
</script>

<style scoped>

</style>
