<template>
  <div>
    <v-col cols="12" >
      <v-content elevation="12">  
          <color-picker  dark v-bind="color" variant="persistent" :disable="!lampOn" @input="updateHue"></color-picker>
  
         </v-content>
    </v-col>
    <v-col cols="12">
      <v-slider
        v-model="color.luminosity"
        @change="updateLum"
        min="0"
        max="100"
        label="Ljusstyrka"
      ></v-slider>
    </v-col>
  </div>
</template>

<script>
import ColorPicker from "@radial-color-picker/vue-color-picker";
import { mapGetters } from "vuex";

export default {
  components: { ColorPicker },
  data: () => ({}),
  methods: {
     
    updateHue(hue) {
      this.$store.dispatch('atUpdateHue', hue)
    },
    updateLum(lum) {
       this.$store.dispatch('atUpdateLum', lum)
    }
  },
  computed: {
    ...mapGetters(["color", "lampOn"])
  }
};
</script>

<style>
@import "~@radial-color-picker/vue-color-picker/dist/vue-color-picker.min.css";
</style>