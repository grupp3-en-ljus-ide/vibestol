<template>
  <div>
    <v-col cols="12">
      <color-picker dark v-bind="color" @input="updateColor"></color-picker>
    </v-col>
    <!-- <v-col cols="12">
      <v-slider v-model="color.saturation" min="0" max="100" label="Saturation"></v-slider>
    </v-col>-->
    <v-col cols="12">
      <v-slider v-model="color.luminosity" min="0" max="100" label="Ljusstyrka"></v-slider>
    </v-col>
  </div>
</template>

<script>
const axios = require("axios");
import ColorPicker from "@radial-color-picker/vue-color-picker";
import { mapGetters, mapMutations } from "vuex";

export default {
  created() {
    this.fetch();
  },
  components: { ColorPicker },
  data: () => ({}),
  methods: {
    ...mapMutations(["updateColor"]),
    async fetch() {
      let green = false;
      const {data} = await axios.get("https://03asg5lb76.execute-api.us-east-1.amazonaws.com/V1/stol?stol=VibeChair");
      if(data.Status == "Grön") {
        green = true;
      } else {
        green = false;
      }
      /* eslint-disable */
      console.log(green);
    }
  },
  computed: {
    ...mapGetters(["color", "rgb"])
  }
};
</script>

<style>
@import "~@radial-color-picker/vue-color-picker/dist/vue-color-picker.min.css";
</style>