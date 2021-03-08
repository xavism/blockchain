<template>
  <div>
    <div>hash: {{ block.hash }}</div>
    <div>nonce: {{ block.nonce }}</div>
    <div>previous hash: {{ block.previousHash }}</div>
    <div>timestamp: {{ block.timestamp }}</div>
    <Transaction
      v-for="transaction in block.transactions"
      :key="transaction.hash"
      :transaction="transaction"
    />
  </div>
</template>

<script lang="ts">
import Block from '@/entities/block'
import Vue from 'vue'

export default Vue.extend({
  name: 'Block',
  components: {
    Transaction: () => import('@/components/Transaction.vue')
  },
  props: {
    block: Block
  }
})
</script>
