<template>
  <div class="tab-header component">
    <h3>Gazetto Changelog</h3>
    <VersionDropdown />
  </div>
</template>

<script lang="ts">
export default {
  name: 'HeaderComponent'
}
</script>

<style scoped lang="scss">
.tab-header {
  display: flex;
  justify-content: space-between;
  padding: 2rem;
}
</style>
