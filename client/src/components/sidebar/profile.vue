<template>
  <b-container fluid>
    <div v-if="this.user.name">
      <small>logged in as</small>
      <h5 class="text-truncate"> {{ this.user.name }} </h5>
      <a href="#"><small>log out</small></a>
    </div>
    <div v-else>
      <h6> not logged in </h6>
      <b-form @submit="onLogin">
        <b-form-input name="username"/>
        <b-button variant="link" type="submit">login</b-button>
      </b-form>
    </div>
    <hr/>
  </b-container>
</template>

<script>
export default {
  name: 'Profile',
  props: ['user'],
  methods: {
    onLogin(event) {
      event.preventDefault()
      const username = event.target.username.value
      this.$emit('login', username)
    }
  }
}
</script>

