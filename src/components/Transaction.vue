<template>
  <div class="flex items-center">
    <WalletPill :wallet="transaction.fromAddress" />
    <span class="mr-2">sends {{ transaction.amount }} coins to</span>
    <WalletPill :wallet="transaction.toAddress" />
  </div>
</template>

<script>
import Transaction from '@/entities/transaction'
import Vue from 'vue'

export default Vue.extend({
  name: 'Transaction',
  components: {
    WalletPill: () => import('@/components/WalletPill.vue')
  },
  props: {
    transaction: Transaction
  }
})
</script>
