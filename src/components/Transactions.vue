<template>
  <div>
    <h1 class="text-lg">Pending Transactions</h1>
    <div class="flex items-center">
      <div class="flex items-center">
        <label for="miner" class="mr-4 flex-1">Miner</label>
        <select
          class="border rounded bg-white p-1 flex-1"
          v-model="miner"
          name="miner"
          id="miner"
        >
          <option disabled value="">Please select one</option>
          <option
            v-for="wallet in wallets"
            :key="wallet.key.getPublic('hex')"
            :value="wallet"
          >
            {{ wallet.name }}</option
          >
        </select>
      </div>
      <button
        :disabled="!miner"
        class="bg-teal-200 px-4 py-2 my-1"
        @click="mine"
      >
        Mine
      </button>
    </div>
    <div class="bg-gray-100 py-4 px-2 rounded shadow-md">
      <Transaction
        v-for="transaction in blockchain.pendingTransactions"
        :key="transaction.hash"
        :transaction="transaction"
      />
      <div>
        <div class="flex items-center">
          <label for="from" class="mr-4 flex-1">fromAddress</label>
          <select
            class="border rounded bg-white p-1 flex-1"
            v-model="fromAddress"
            name="from"
            id="from"
          >
            <option disabled value="">Please select one</option>
            <option
              v-for="wallet in wallets"
              :key="wallet.key.getPublic('hex')"
              :value="wallet"
            >
              {{ wallet.name }}</option
            >
          </select>
        </div>
        <div class="flex items-center">
          <label for="to" class="mr-4 flex-1">toAddress</label>
          <select
            class="border rounded bg-white p-1 flex-1"
            v-model="toAddress"
            name="to"
            id="to"
          >
            <option disabled value="">Please select one</option>
            <option
              v-for="wallet in wallets"
              :key="wallet.key.getPublic('hex')"
              :value="wallet"
            >
              {{ wallet.name }}</option
            >
          </select>
        </div>
        <div class="flex items-center">
          <label for="amount" class="mr-4 flex-1">amount</label>
          <input
            v-model="amount"
            class="border rounded bg-white p-1 flex-1"
            name="amount"
            id="amount"
          />
        </div>
        <button
          :disabled="!isCreatable"
          class="bg-teal-400 px-4 py-2 rounded my-1"
          @click="addTransaction"
        >
          Create Transaction
        </button>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import Transaction from '@/entities/transaction'
import Wallet from '@/entities/wallet'
import { MutationTypes } from '@/store/types/mutation-types'
import Vue from 'vue'
import { mapMutations, mapState } from 'vuex'

export default Vue.extend({
  name: 'PendingTransactions',
  components: {
    Transaction: () => import('@/components/Transaction.vue')
  },
  data() {
    return {
      miner: null as Wallet,
      toAddress: null as Wallet,
      fromAddress: null as Wallet,
      amount: 0 as number
    }
  },
  computed: {
    ...mapState(['blockchain', 'wallets']),
    isCreatable(): boolean {
      return !!this.fromAddress && !!this.toAddress && !!this.amount
    }
  },
  methods: {
    ...mapMutations({
      createWallet: MutationTypes.CREATE_WALLET,
      createTransaction: MutationTypes.CREATE_TRANSACTION,
      mineBlock: MutationTypes.MINE_PENDING_TRANSACTIONS
    }),
    addTransaction() {
      const transaction = new Transaction(
        this.fromAddress,
        this.toAddress,
        this.amount
      )
      transaction.signTransaction(this.fromAddress.key)
      this.createTransaction(transaction)
    },
    mine() {
      this.mineBlock(this.miner)
    }
  }
})
</script>
