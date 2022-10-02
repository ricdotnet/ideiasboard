import { RouteParams } from 'vue-router';
import { IBoard, IBoardPageState, IIdea } from '../types';
import { useSubscriptionStore } from '../stores';

type ISubStore = typeof useSubscriptionStore.prototype;

function processBoard(state: IBoardPageState, sub: ISubStore, params: RouteParams) {
  return function (board: IBoard) {
    state.board = board;
    state.ideias = board.ideias.sort((a: IIdea, b: IIdea) => b.likes - a.likes);
    sub.subscribe(params['key']);
    sub.getSub.addEventListener('ES_IDEIA', (e: MessageEvent) => {
      addNote(JSON.parse(e.data).ideia, state);
    });
    sub.getSub.addEventListener('ES_IDEIA_LIKE', (e: MessageEvent) => {
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
