<template>
  <b-navbar toggleable="lg" type="dark" variant="secondary">
    <b-navbar-brand>Episk lampa</b-navbar-brand>

    <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>

    <b-collapse id="nav-collapse" is-nav>
      <b-navbar-nav>



        
        <b-nav-item to="/">Välj färg</b-nav-item>
        <b-nav-item to="/About">Om</b-nav-item>
      </b-navbar-nav>
    </b-collapse>
  </b-navbar>
</template>

<script>
export default {
  name: "navbar",
  data: () => ({})
};
</script>