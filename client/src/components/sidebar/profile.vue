<template>
  <b-container fluid>
    <small>logged in as</small>
    <h5> {{ this.user.name }} </h5>
    <a href="#"><small>log out</small></a>
    <hr/>
  </b-container>
</template>

<script>
export default {
  name: 'Profile',
  props: ['user']
}
</script>

