<template>
  <div class="tab-header component">
    <h3>Gazetto Changelog</h3>
    <VersionDropdown/>
  </div>
</template>

<script>
export default {
  name: "HeaderComponent"
}
</script>

<style scoped lang="scss">
.tab-header {
  display: flex;
  justify-content: space-between;
  padding: 2rem 0;
}
</style>
