<template>
  <div class="table-wrapper">
    <h3>Voice</h3>
    <table style="width: 100%">
      <tr
        v-for="(row, index) in commandTriggers"
        :key="index"
        :class="index % 2 ? 'table-row even' : 'table-row odd'"
      >
        <td>
          <input v-model="commandTriggers[index]" type="text" placeholder="Command Name" />
        </td>
      </tr>
    </table>
  </div>
</template>
<script lang="ts">
import { defineComponent, reactive, toRefs } from 'vue'
export default defineComponent({
  name: 'VoiceTriggersTable',
  components: {},

  setup() {
    const state = reactive({
      commandTriggers: [
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec rhoncus.',
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec rhoncus.',
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec rhoncus.',
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec rhoncus.',
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec rhoncus.',
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec rhoncus.',
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec rhoncus.',
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec rhoncus.'
      ]
    })
    return { ...toRefs(state) }
  }
})
</script>
<style lang="less">
// TABLE
.table-wrapper {
  // background: #576980;
  background: #748cab;
  color: #0d1321;
  width: 100%;
}
.table-wrapper h3 {
  text-align: center;
  margin-top: 1em;
  margin-bottom: 0.5em;
}

.table-header {
  text-align: left;
}

.tabla-row {
  min-height: 38px;
}

.table-row.even {
  background: #667b96;
}

.table-row.odd {
  // background: #748cab;
  background: #576980;
}

.table-row td input {
  background: none;
  border: none;
  width: 100%;
  height: 100%;
  outline: none;
  color: #ffffff;
  // color: #0d1321;
  padding: 5px 0px 5px 0px;
}

.table-row td input:focus-visible {
  background: #1d2d44;
  border: #ffffff solid 1px;
  color: #ffffff;
  padding: 4px 0px 4px 0px;
  margin-left: -2px;
}

.table-row td input::placeholder {
  color: #ffffff;
  opacity: 0.5;
}
</style>
