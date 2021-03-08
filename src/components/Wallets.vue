<template>
  <div>
    <h1 class="text-lg">Wallets</h1>
    <div class="bg-gray-100 py-4 px-2 rounded shadow-md">
      <div class="flex flex-wrap">
        <WalletPill
          v-for="wallet in wallets"
          :key="wallet.key.getPublic('hex')"
          :wallet="wallet"
        />
      </div>
      <button class="bg-teal-400 px-4 py-2 rounded" @click="addWallet">
        Create New
      </button>
    </div>
  </div>
</template>

<script lang="ts">
import { MutationTypes } from '@/store/types/mutation-types'
import Vue from 'vue'
import { mapMutations, mapState } from 'vuex'

export default Vue.extend({
  name: 'Wallets',
  components: {
    WalletPill: () => import('@/components/WalletPill.vue')
  },
  computed: {
    ...mapState(['wallets'])
  },
  methods: {
    ...mapMutations({
      createWallet: MutationTypes.CREATE_WALLET
    }),
    addWallet() {
      this.createWallet((Vue as any).faker().name.firstName())
    }
  }
})
</script>
