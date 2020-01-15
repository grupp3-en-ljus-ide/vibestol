<template>
  <div>
    <v-col cols="6">
      <span class="title">Selected Color:</span>
      <div id="values"></div>
    </v-col>
    <v-col cols="6">
      <div id="color-picker-container"></div>
    </v-col>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import iro from "@jaames/iro";

var colorPicker = new iro.ColorPicker("#color-picker-container", {
  width: 280,
  color: "#f00"
});

var values = document.getElementById("values");
// /* eslint-disable */
colorPicker.on(["color:init", "color:change"], function(color) {
  values.innerHTML = [
    "hex: " + color.hexString,
    "rgb: " + color.rgbString,
    "hsl: " + color.hslString
  ].join("<br>");
});

export default {
  name: "ColorPickerComp",
  data: () => ({
    COOLOR: "",
    changeeees: {}
  }),
  // mounted() {
  //   this.ffff();
  // },
  // methods: {
  //   ffff() {
  //     this.COOLOR = colorPicker.color.hexString;
  //   }
  // },
  computed: {
    ...mapGetters(["activeColor"])
  }
};
</script>