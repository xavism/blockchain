<template>
  <div class="home">
    <img alt="Vue logo" src="../assets/logo.png" />
    <Blockchain />
  </div>
</template>

<script lang="ts">
import Vue from "vue";

export default Vue.extend({
  name: "Home",
  components: {
    Blockchain: () => import("@/components/Blockchain.vue")
  }
});
</script>
