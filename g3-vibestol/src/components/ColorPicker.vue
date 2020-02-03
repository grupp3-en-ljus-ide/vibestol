<template>
  <div>
    <v-col cols="12">
      <color-picker dark v-bind="color" @input="atUpdateHue"></color-picker>
    </v-col>
    <v-col cols="12">
      <v-slider
        v-model="color.luminosity"
        @change="atUpdateLum"
        min="0"
        max="100"
        label="Ljusstyrka"
      ></v-slider>
    </v-col>
  </div>
</template>

<script>
import ColorPicker from "@radial-color-picker/vue-color-picker";
import { mapGetters, mapMutations } from "vuex";

export default {
  components: { ColorPicker },
  data: () => ({}),
  methods: {
    ...mapMutations(["publishRGB"]),
    atUpdateHue(h) {
      this.$store.state.color.hue = h;
      this.publishRGB();
    },
    atUpdateLum(l) {
      this.$store.state.color.luminosity = l;
      this.publishRGB();
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