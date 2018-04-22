<template>
  <div id="app">
    <b-container>
      <b-row>
        <b-col>
          <p> Hello </p>
        </b-col>
        <b-col>
          <p> Bootstrap </p>
        </b-col>
      </b-row>
    </b-container>
  </div>
</template>

<script>
import bContainer from 'bootstrap-vue/es/components/layout/container'
import bRow from 'bootstrap-vue/es/components/layout/row'
import bCol from 'bootstrap-vue/es/components/layout/col'

export default {
  name: 'Main',
  components: {
    'b-container': bContainer,
    'b-row': bRow,
    'b-col': bCol
  }
}
</script>

<style>

</style>
