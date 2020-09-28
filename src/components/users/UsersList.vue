<template>
  <div>
    <button @click="confirmInput">Click me</button>
    <button @click="saveChanges">Save Changes</button>
    <ul>
      <user-item v-for="user in users" :key="user.id" :name="user.fullName" :role="user.role"></user-item>
    </ul>
  </div>
</template>

<script>
import UserItem from './UserItem.vue';

export default {
  data() {
    return {
      changesSaved: false
    };
  },

  components: {
    UserItem
  },
  inject: ['users'],

  methods: {
    confirmInput() {
      //Do something
      this.$router.push('/teams');
    },

    saveChanges() {
      this.changesSaved = true;
    }
  },

  beforeRouteEnter(to, from, next) {
    console.log('BeforeEnter from component lifecycle hook');
    console.log(to, from);
    next();
  },

  beforeRouteLeave(to, from, next) {
    console.log('UserList Component beforeRouteLeave');
    console.log(to, from);
    if (this.changesSaved === true) {
      next();
    } else {
      const wantsToLeave = confirm('You have unsaved changes! Are you sure?'); //'confirm' sets true or false to 'wantsToLeave'
      next(wantsToLeave); //if 'wantsToLeave' is true, next route will be loaded. If false, routing will be cancelled
    }
  }
};
</script>

<style scoped>
ul {
  list-style: none;
  margin: 2rem auto;
  max-width: 20rem;
  padding: 0;
}
</style>