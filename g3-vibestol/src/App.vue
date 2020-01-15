<template>
  <v-app>
    <ToolBar />
    <v-container>
      <ColorPickerComp />
      <HelloWorld />
    </v-container>
  </v-app>
</template>

<script>
import HelloWorld from "./components/HelloWorld";
import ToolBar from "./components/ToolBar";
import ColorPickerComp from "./components/ColorPickerComp";

export default {
  name: "App",

  components: {
    HelloWorld,
    ToolBar,
    ColorPickerComp
  },

  data: () => ({
    //
  })
};
</script>
