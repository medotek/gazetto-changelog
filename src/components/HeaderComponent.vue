<template>
  <div class="tab-header component">
    <h3>Gazetto Changelog <span v-if="getCurrentVersion?.startAt">- version {{getCurrentVersion.number}} [{{ getCurrentVersion?.startAt.split('T')[0] }}]</span></h3>
    <VersionDropdown />
  </div>
</template>

<script lang="ts">
import {mapState} from "pinia";
import {useChangelogStore} from "@/stores/changelog";

export default {
  name: 'HeaderComponent',
  computed: {
    ...mapState(useChangelogStore, ['getCurrentVersion'])
  }
}
</script>

<style scoped lang="scss">
.tab-header {
  display: flex;
  justify-content: space-between;
  padding: 2rem;
}
</style>
