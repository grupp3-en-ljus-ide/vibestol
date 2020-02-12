<template>
  <div class="text-center">
    <v-menu offset-y>
      <template v-slot:activator="{ on }">
        <v-btn color="secondary" dark v-on="on" elevation="12">{{currentEffect}}</v-btn>
      </template>
      <v-list>
        <v-list-item v-for="(item, index) in effects" :key="index" @click="changeEffect(item)">
          <v-list-item-title>{{ item}}</v-list-item-title>
        </v-list-item>
      </v-list>
    </v-menu>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
export default {
  data: () => ({}),
  methods: {
    changeEffect(effect) {
      this.$store.state.currentEffect = effect;
      console.log(this.$store.state.currentEffect);
      this.$store.dispatch("turnOn");
    }
  },
  computed: {
    ...mapGetters(["effects", "currentEffect"])
  }
};
</script>