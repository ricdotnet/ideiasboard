import { defineStore } from 'pinia';
import axios from 'axios';

const useSubscriptionStore = defineStore('subscription', {
  state: (): any => ({
    eventSource: null,
    subscriptions: <any>[],
    clientId: <string>'',
  }),
  getters: {
    getSub: (state) => state.eventSource,
    getClientId: (state) => state.clientId,
  },
  actions: {
    subscribe(boardId: string) {
      if ( !this.eventSource ) {
        this.eventSource = new EventSource(`${this.api}/api/realtime`);

        this.eventSource.addEventListener('ES_CONNECT', async (e: any) => {
          const { clientId } = JSON.parse(e.data);
          this.clientId = clientId;

          await axios.post(`${this.api}/api/realtime`, {
            clientId,
            boardId,
          });
        });
      }
    }
  }
});

export {
  useSubscriptionStore
};
