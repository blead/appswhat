<template>
  <b-container fluid class="border-bottom pb-1 pt-2">
    <div v-if="this.user.name">
      <small>logged in as</small>
      <h5 class="text-truncate mb-0"> {{ this.user.name }} </h5>
      <b-button variant="link" @click="this.onLogout" class="pl-0 py-1"><small>log out</small></b-button>
    </div>
    <div v-else>
      <h6>not logged in</h6>
      <b-form @submit="onLogin">
        <b-form-input size="sm" class="py-0 px-1 w-75" name="username" placeholder="username"/>
        <b-button variant="link" type="submit" class="pl-0 py-1">login</b-button>
      </b-form>
    </div>
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
    },
    onLogout(event) {
      event.preventDefault()
      this.$emit('logout')
    }
  }
}
</script>

