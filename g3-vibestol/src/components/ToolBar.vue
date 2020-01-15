<template>
  <v-toolbar dense color="primary">
    <v-spacer />
    <v-toolbar-title>G3 Vibestol</v-toolbar-title>

    <v-spacer />
    <v-toolbar-title>{{this.activeColor}}</v-toolbar-title>

    <v-spacer />
  </v-toolbar>
</template>

<script>
import { mapGetters } from "vuex";

export default {
  name: "ToolBar",
  computed: {
    ...mapGetters(["activeColor"])
  }
};
</script>

