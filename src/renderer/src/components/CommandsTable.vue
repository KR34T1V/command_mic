<template>
  <div class="table-wrapper">
    <h3>Profile Commands</h3>
    <table style="width: 100%">
      <tr class="table-header">
        <th v-for="(head, index) in headers" :key="index">{{ head }}</th>
      </tr>
      <tr
        v-for="(row, index) in tableData"
        :key="index"
        :class="index % 2 ? 'table-row even' : 'table-row odd'"
      >
        <td>
          <input v-model="row.name" type="text" placeholder="Command Name" />
        </td>
        <td>
          <input v-model="row.keybinds" type="text" placeholder="Keybinds" />
        </td>
      </tr>
    </table>
  </div>
</template>
<script lang="ts">
import { defineComponent, reactive, toRefs } from 'vue'
export default defineComponent({
  name: 'CommandsTable',
  components: {},

  setup() {
    const state = reactive({
      headers: ['Name', 'Keybinds'],
      tableData: [
        { name: 'Name', keybinds: 'Keybind' },
        { name: 'Name', keybinds: 'Keybind' },
        { name: 'Name', keybinds: 'Keybind' },
        { name: 'Name', keybinds: 'Keybind' },
        { name: 'Name', keybinds: 'Keybind' },
        { name: 'Name', keybinds: 'Keybind' },
        { name: 'Name', keybinds: 'Keybind' },
        { name: 'Name', keybinds: 'Keybind' }
      ]
      // age: 25 as string | number
    })
    return { ...toRefs(state) }
  }
})
</script>
<style lang="less">
// TABLE
.table-wrapper {
  background: #576980;
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
  background: #748cab;
}

.table-row td input {
  background: none;
  border: none;
  width: 100%;
  height: 100%;
  outline: none;
  // color: #ffffff;
  color: #0d1321;
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
