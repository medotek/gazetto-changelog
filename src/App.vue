<script setup lang="ts">
import {computed, onMounted} from "vue";
import TabComponent from "@/components/TabComponent.vue";
import {useVersionStore} from "@/stores/versions";

const store = useVersionStore();

const getVersions = computed(() => {
  return store.getVersions;
});

const versions = computed(() => {
  return store.versions;
});

onMounted(() => {
  store.fetchVersions();
});

console.log(versions)
</script>

<template>
  <div>
    <HeaderComponent/>
    <TabComponent/>
  </div>
</template>

<style scoped lang="scss">
</style>
