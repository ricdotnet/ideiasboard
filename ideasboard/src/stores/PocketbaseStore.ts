import { defineStore } from 'pinia';
import PocketBase from 'pocketbase';

// TODO: Define better types
const usePocketbaseStore = defineStore('pocketbase', {
  state: (): any => ({
    client: null,
  }),
  getters: {
    getClient: (state) => state.client,
  },
  actions: {
    initClient() {
      this.client = new PocketBase('http://localhost:8090');
      console.log('Pocketbase client initiated.');
    },
    subToCollection(collectionId: string, fn: any) {
      this.client.Realtime.subscribe(collectionId, function (e: any) {
        fn(e.record);
      });
    }
  }
});

export {
  usePocketbaseStore,
};
