<template>
  <select
    name="version-dropdown"
    id="version-dropdown"
    class="form-select form-select-md"
    aria-label="Version des logs"
    @change="updateCurrentVersion"
  >
    <option v-for="(version, index) in versions" :value="version.id" :selected="!index">
      {{ version.number }}
    </option>
  </select>
</template>

<script lang="ts">
import { mapActions, mapState } from 'pinia'
import { useChangelogStore } from '@/stores/changelog'

export default {
  name: 'VersionDropdown',
  computed: {
    ...mapState(useChangelogStore, ['versions', 'currentVersionId'])
  },
  methods: {
    /** Get action from store */
    ...mapActions(useChangelogStore, ['dispatchCurrentVersion']),
    /**
     * Update current version on change
     *
     * @param event
     */
    updateCurrentVersion(event: any) {
      this.dispatchCurrentVersion(parseInt(event.target.value))
    }
  }
}
</script>

<style scoped lang="scss">
#version-dropdown {
  max-width: 5rem;
}
</style>
