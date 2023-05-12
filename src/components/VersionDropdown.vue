<template>
    <select name="version-dropdown"
            id="version-dropdown"
            class="form-select form-select-md"
            aria-label="Default select example">
      <option v-for="(version, index) in versions" :value=version.id :selected="!index">{{version.number}}</option>
    </select>
</template>

<script>
import {mapState} from "pinia";
import {useVersionStore} from "@/stores/versions";

export default {
  name: "VersionDropdown",
  computed: {
    ...mapState(useVersionStore, ['versions'])
  }
}
</script>

<style scoped lang="scss">
#version-dropdown {
  max-width: 5rem;
}
</style>
