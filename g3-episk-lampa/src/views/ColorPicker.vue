<template>
  <b-container class="content">
    <choose />
  </b-container>
</template>

<script>
export default {
  name: "ColorPicker",
  components: {
    choose: () => import("@/components/choose")
  },
  data: () => ({})
};
</script>

<style>
.content {
  margin-top: 10px;
}
</style>