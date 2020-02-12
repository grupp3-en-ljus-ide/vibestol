<template>
  <v-app>
    <v-row align="center" justify="center">
      <v-card max-width="360" elevation="24">
        <ToolBar />
        <v-container fill-height justify-center>
          <!-- <v-card-subtitle>
            <v-chip color="red">{{rgb.r}}</v-chip>
            <v-chip color="green">{{rgb.g}}</v-chip>
            <v-chip color="blue">{{rgb.b}}</v-chip>
          </v-card-subtitle> -->
          <v-card-subtitle>
            <v-btn color="secondary" fab @click="this.switch">
              <v-icon v-if="lampOn">mdi-lightbulb-on</v-icon>
              <v-icon v-if="!lampOn">mdi-lightbulb-off</v-icon>
            </v-btn>
          </v-card-subtitle> 
          <v-card-subtitle> <EffectsMenu /> </v-card-subtitle>
          <v-card-text>
            <ColorPicker />
          </v-card-text>
        </v-container>
      </v-card>
    </v-row>
  </v-app>
</template>


<script>
import ToolBar from "./components/ToolBar";
import EffectsMenu from "./components/EffectsMenu";
import ColorPicker from "./components/ColorPicker";
import { mapGetters  } from "vuex";

export default {
  name: "App",
  components: {
    ToolBar,
    EffectsMenu,
    ColorPicker
  },
  data: () => ({}),
  methods: {

    switch() {
      if(!this.lampOn){
        this.$store.dispatch('turnOn')
        this.$store.state.lampOn = true
      }
      else {
        this.$store.dispatch('turnOff')
        this.$store.state.lampOn = false
      }
      
      console.log(this.lampOn)
    }
  },
  computed: {
    ...mapGetters([ "rgb", "lampOn"])
  }
};
</script>
