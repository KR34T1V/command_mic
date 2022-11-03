<template>
  <div class="app-wrapper">
    <h1>COMMAND MIC</h1>
  </div>
  <div class="column-50">
    <input type="button" :value="micEnabled ? 'Disable Mic' : 'Enable Mic'" @click="toggleMic()" />
    <div class="linefeed-wrapper">
      <h3>Last Match:</h3>
      <div class="linefeed-text">
        <span>hallo</span>
      </div>
    </div>
    <div class="linefeed-wrapper">
      <h3>Voice Log:</h3>
      <div class="linefeed-text">
        <p v-for="(line, index) in voiceLineStream" :key="index">{{ line }}</p>
      </div>
    </div>
  </div>
  <div class="column-50">
    <div>
      <CommandsTable />
    </div>
    <div><VoiceTriggersTable /></div>
  </div>
</template>

<script lang="ts">
import { defineComponent, reactive, toRefs } from 'vue'
import CommandsTable from './components/CommandsTable.vue'
import VoiceTriggersTable from './components/VoiceTriggersTable.vue'
export default defineComponent({
  name: 'App',
  components: { CommandsTable, VoiceTriggersTable },

  setup() {
    const state = reactive({
      micEnabled: false,
      modelLocation: '',
      voiceLineStream: [
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
  },
  created() {
    console.log(window)
  },
  methods: {
    toggleMic() {
      this.micEnabled = !this.micEnabled
      window.api.enableMic(this.micEnabled)
    }
  }
})
</script>

<style lang="less">
@import './assets/css/styles.less';

.app-wrapper {
  text-align: center;
}

.column-50 {
  display: inline-block;
  width: 50%;
}

.linefeed-wrapper {
  background: #748cab;
  // color: #0d1321;
  margin: 1em;
}

.linefeed-wrapper h3 {
  text-align: c;
  color: #0d1321;
  margin: 0.3em;
}

.linefeed-text {
  background: #576980;
  // color: #0d1321;
  padding: 0.5em;
}

.linefeed-text p {
  margin: 0.2em;
}
</style>
