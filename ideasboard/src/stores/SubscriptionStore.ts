import { defineStore } from 'pinia';
import axios from 'axios';

interface IState {
  eventSource: EventSource | null;
  clientId: string;
  api?: string; // because we inject some global state into the store (api and base) we need this
  base?: string;
}

const useSubscriptionStore = defineStore('subscription', {
  state: (): IState => ({
    eventSource: null,
    clientId: '',
  }),
  getters: {
    getSub: (state) => state.eventSource,
    getClientId: (state) => state.clientId,
  },
  actions: {
    subscribe(boardId: string) {
      if ( !this.eventSource ) {
        this.eventSource = new EventSource(`${this.api}/api/realtime`);

        this.eventSource.addEventListener('ES_CONNECT', async (e): Promise<void> => {
          const { clientId } = JSON.parse(e.data);
          this.clientId = clientId;

          await axios.post(`${this.api}/api/realtime`, {
            clientId,
            boardId,
          });
        });
      }
    },
    unsub() {
      this.eventSource?.close();
      this.eventSource = null;
    }
  }
});

export {
  useSubscriptionStore
};
