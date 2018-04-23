<template>
  <router-view></router-view>
</template>

<script>
import Chat from './chat'
export default {
  name: 'MainView',
  components: {
    Chat,
  }
}
</script>
