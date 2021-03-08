<template>
  <div
    class="rounded text-sm px-2 py-1 mr-2 my-1"
    :style="{
      'background-color': parsedWallet.color,
      color: colorText(parsedWallet.color)
    }"
  >
    {{ parsedWallet.name }}
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import ColorHelper from '@/helpers/color.helper'
import Wallet from '@/entities/wallet'

export default Vue.extend({
  name: 'WalletPill',
  props: {
    wallet: Wallet
  },
  computed: {
    parsedWallet() {
      return this.wallet ? this.wallet : { name: 'Blockchain', color: 'black' }
    }
  },
  methods: {
    colorText(color: string): string {
      return ColorHelper.isBright(color) ? 'black' : 'white'
    }
  }
})
</script>
