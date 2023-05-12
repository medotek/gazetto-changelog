<template>
    <select name="version-dropdown"
            id="version-dropdown"
            class="form-select form-select-md"
            aria-label="Default select example">
      <!-- Default value for test TODO : change-->
      <option selected>3.6</option>
      <option value="1">3.5</option>
    </select>
</template>

<script>
export default {
  name: "VersionDropdown"
}
</script>

<style scoped lang="scss">
#version-dropdown {
  max-width: 5rem;
}
</style>
