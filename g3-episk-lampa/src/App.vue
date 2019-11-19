<template>
  <content>
    <navbar />
    <router-view />
  </content>
</template>


<script>
export default {
  name: "App",
  components: {
    navbar: () => import("@/components/navbar")
  },
  data: () => ({})
};
</script>