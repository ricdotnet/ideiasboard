import { RouteParams } from 'vue-router';
import { IBoard, IBoardPageState, IIdea } from '../types';
import { subscriptionStore } from '../stores/SubscriptionStore';

type ISubStore = typeof subscriptionStore;

function processBoard(state: IBoardPageState, subscriptionStore: ISubStore, params: RouteParams) {
  return function (board: IBoard) {
    state.board = board;
    state.ideias = board.ideias.sort((a: IIdea, b: IIdea) => b.likes - a.likes);
    subscriptionStore.subscribe(params['key'] as string);
    subscriptionStore.sub?.addEventListener('ES_IDEIA', (e: MessageEvent) => {
      addNote(JSON.parse(e.data).ideia, state);
    });
    subscriptionStore.sub?.addEventListener('ES_IDEIA_LIKE', (e: MessageEvent) => {
      console.log(e);
      const data = JSON.parse(e.data);
      // todo: maybe refactor this...
      state.ideias.map((i: IIdea) => {
        if ( i.id === +data.ideia ) {
          i.likes++;
        }
      });
      state.ideias.sort((a: IIdea, b: IIdea) => b.likes - a.likes);
    });

    state.loading = false;
    document.title = `Board: ${state.board.name}`;
  };
}

function addNote(ideia: IIdea, state: IBoardPageState) {
  state.ideias.push({ id: ideia.id, content: ideia.content, likes: 0 });
}

export {
  processBoard
};
