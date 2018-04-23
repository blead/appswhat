<template>
  <div id="app" style="height: 99vh; overflow: hidden;">
    <b-container fluid class="h-100">
      <b-row class="h-100">
        <b-col cols="2" class="h-100 px-0 border-right">
          <sidebar/>
        </b-col>
        <b-col class="h-100 px-0">
          <main-view/>
        </b-col>
      </b-row>
    </b-container>
  </div>
</template>

<script>
import Sidebar from './sidebar'
import MainView from './main-view'

export default {
  name: 'Main',
  components: {
    'sidebar': Sidebar,
    'main-view': MainView
  }
}
</script>

<style>

</style>
