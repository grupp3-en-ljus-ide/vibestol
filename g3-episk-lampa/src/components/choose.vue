<template>
  <b-dropdown id="dropdown-1" offset="30%" text="Välj tema" class="m-md-2" block>
    <b-dropdown-item
      v-for="i in lights"
      :key="i"
      :active="testActive(i)"
      @click="lightFuntion(i)"
    >{{i}}</b-dropdown-item>
    <b-dropdown-divider></b-dropdown-divider>
    <b-dropdown-item
      v-for="i in off"
      :key="i"
      :active="testActive(i)"
      @click="lightFuntion(i)"
    >Stäng av färg</b-dropdown-item>
  </b-dropdown>
</template>

<script>
import { mapMutations, mapGetters } from "vuex";

export default {
  name: "choose",
  data: () => ({}),
  computed: {
    ...mapGetters(["light", "lights", "off"])
  },
  methods: {
    ...mapMutations(["lightFuntion", "testActive"])
  }
};
</script>
