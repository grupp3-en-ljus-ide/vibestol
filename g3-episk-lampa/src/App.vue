<template>
  <div>
    <navbar />
    <router-view />
  </div>
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