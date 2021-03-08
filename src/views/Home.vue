<template>
  <div class="grid grid-cols-3 gap-4">
    <Blockchain class="col-span-2" />
    <div class="grid grid-rows-2 gap-4">
      <Transactions />
      <Wallets />
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'

export default Vue.extend({
  name: 'Home',
  components: {
    Blockchain: () => import('@/components/Blockchain.vue'),
    Transactions: () => import('@/components/Transactions.vue'),
    Wallets: () => import('@/components/Wallets.vue')
  }
})
</script>
