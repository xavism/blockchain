<template>
  <div>
    <h1 class="text-lg">Blockchain</h1>
    <div class="bg-teal-100 py-4 px-2 rounded shadow-md">
      <div class="flex">
        <div class="flex-1 uppercase">
          difficulty: {{ blockchain.difficulty }}
        </div>
        <div class="flex-1 uppercase">
          mining Reward: {{ blockchain.miningReward }}
        </div>
      </div>
      <Block
        v-for="block in blockchain.chain"
        class="bg-teal-200 rounded py-4 px-2 shadow-xs my-2"
        :block="block"
        :key="block.hash"
      />
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import { mapState } from 'vuex'

export default Vue.extend({
  name: 'Blockchain',
  components: {
    Block: () => import('@/components/Block.vue')
  },
  computed: {
    ...mapState(['blockchain'])
  }
})
</script>
