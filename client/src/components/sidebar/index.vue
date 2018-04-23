<template>
  <b-container fluid class="px-0 mt-2">
    <profile></profile>
    <p> Sidebar! </p>
  </b-container>
</template>

<script>
import Profile from './profile'

export default {
  name: 'Sidebar',
  components: {
    'profile': Profile
  }
}
</script>

<style>

</style>
