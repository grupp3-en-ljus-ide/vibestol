<template>
  <v-app>
    <ToolBar />
    <v-col>
      <v-card class="d-inline-flex pa-2" justify-center elevation="24">
        <ColorPicker />
      </v-card>
    </v-col>
  </v-app>
</template>

<script>
import ToolBar from "./components/ToolBar";
import ColorPicker from "./components/ColorPicker";

export default {
  name: "App",

  components: {
    ToolBar,
    ColorPicker
  },

  data: () => ({})
};
</script>
