import { Store } from '@idevelopthings/vue-class-stores/vue';
import axios from 'axios';

interface SubscriptionStoreInterface {
  eventSource: EventSource | null;
  clientId: string;
}

class SubscriptionStore extends Store<SubscriptionStore, SubscriptionStoreInterface>() {
  get state(): SubscriptionStoreInterface {
    return {
      eventSource: null,
      clientId: '',
    };
  }

  get sub() {
    return this.$eventSource;
  }

  get clientId() {
    return this.$clientId;
  }

  subscribe(boardId: string) {
    if (this.$eventSource) return;

    this.$eventSource = new EventSource(`${this.api}/realtime`);

    this.$eventSource.addEventListener('ES_CONNECT', async (e): Promise<void> => {
      const { clientId } = JSON.parse(e.data);
      this.$clientId = clientId;

      await axios.post(`${this.api}/realtime`, {
        clientId,
        boardId,
      });
    });
  }

  unsub() {
    this.$eventSource?.close();
    this.$eventSource = null;
  }

}

export const subscriptionStore = new SubscriptionStore();
