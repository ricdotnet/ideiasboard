<template>
  <template v-if="userStore.$loading">
    Loading boards...
  </template>
  <template v-else-if="!userStore.$userBoards">
    You have not created or interacted with any board.
  </template>
  <template v-else>
    <div class="list">
      My Boards
      <Table :header="['Id', 'Name', 'Created On', 'Ideias']"
             :data="userStore.$userBoards.owned" />
      <!-- <div v-for="({key, name, ideias, created_at}, index) in userStore.$userBoards.owned" :key="index">
        <router-link :to="'/board/' + key">{{ key }}</router-link>
        :: {{ name }} :: {{ ideias }} :: {{ new Date(created_at).toDateString() }}
      </div> -->
    </div>
    <div class="list" v-if="userStore.$userBoards.other[0].key">
      Other Boards
      <div v-for="({key, name, ideias, created_at}, index) in userStore.$userBoards.other" :key="index">
        <router-link :to="'/board/' + key">{{ key }}</router-link>
        :: {{ name }} :: {{ ideias }} :: {{ new Date(created_at).toDateString() }}
      </div>
    </div>
  </template>
</template>

<script setup lang="ts">
  import { onBeforeMount } from 'vue';
  import { userStore } from '../stores/UserStore';
  import Table from '../components/common/table/Table';

  onBeforeMount(async () => {
    await userStore.boards();
  });
</script>

<style scoped lang="scss">
  .list {
    &:last-of-type {
      @apply mt-10;
    }
  }
</style>
