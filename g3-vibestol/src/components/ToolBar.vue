<template>
  <v-toolbar color="primary" height="40">
    <v-spacer />
    <v-toolbar-title>G3 Vibestol</v-toolbar-title>
    <v-spacer />
  </v-toolbar>
</template>

<script>
import { mapGetters } from "vuex";

export default {
  name: "ToolBar",
  computed: {
    ...mapGetters(["hex", "rgb"])
  }
};
</script>

