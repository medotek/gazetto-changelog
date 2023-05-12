<template>
  <b-tabs class="tabs component" content-class="mt-3" justified>
    <b-tab active>
      <template #title>
          <span class="tab-title"><strong>Site Internet</strong></span>
      </template>
      <WebsiteTabContent/>
    </b-tab>
    <b-tab class="tab" title="Twitter">
      <TwitterTabContent/>
    </b-tab>
    <b-tab class="tab" title="Hoyolab">
      <HoyolabTabContent/>
    </b-tab>
    <b-tab class="tab" title="Youtube" disabled>
      <YoutubeTabContent/>
    </b-tab>
<!--    <b-tab active>-->
<!--      <template #title>-->
<!--        <b-spinner type="grow" small></b-spinner> I'm <i>custom</i> <strong>title</strong>-->
<!--      </template>-->
<!--      <p class="p-3">Tab contents 1</p>-->
<!--    </b-tab>-->
  </b-tabs>
</template>

<script>
export default {
  name: "TabComponent"
}
</script>

<style scoped lang="scss">
</style>
