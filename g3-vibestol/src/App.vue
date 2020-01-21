<template>
  <v-app>
    <v-row align="center" justify="center">
      <v-card max-width="360" elevation="24">
        <ToolBar />
        <v-container fill-height justify-center>
          <v-card-subtitle>
            <v-chip color="red">{{rgb.r}}</v-chip>
            <v-chip color="green">{{rgb.g}}</v-chip>
            <v-chip color="blue">{{rgb.b}}</v-chip>
          </v-card-subtitle>
          <v-card-text>
            <ColorPicker />
            <v-btn block color="primary" @click="connectMqtt">Ladda upp</v-btn>
          </v-card-text>
        </v-container>
      </v-card>
    </v-row>
  </v-app>
</template>


<script>
import ToolBar from "./components/ToolBar";
import ColorPicker from "./components/ColorPicker";
import { mapGetters, mapMutations } from "vuex";

export default {
  name: "App",
  components: {
    ToolBar,
    ColorPicker
  },
  created() {
    // this.connectMqtt();
    // this.sendRGB();
  },
  data: () => ({}),
  methods: {
    ...mapMutations(["connectMqtt", "sendRGB"])
  },
  computed: {
    ...mapGetters(["color", "rgb", "hex"])
  }
};
</script>
