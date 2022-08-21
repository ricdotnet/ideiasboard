import { Ref, ref, UnwrapRef } from 'vue';

type Events = Ref<UnwrapRef<any[]>>

const eventList: Events = ref([]);

export const useEvent = () => {

  const addEvent = (key: string, cb: () => any) => {
    const event = {
      key: key,
      cb: cb,
    };
    eventList.value.push(event);
  };

  const removeEvent = (key: string) => {
    console.log('removing', key);
  };

  const dispatch = (key: string) => {
    eventList.value.forEach((e) => {
      if ( e.key === key ) {
        e.cb();
      }
    });
  };

  return {
    addEvent,
    removeEvent,
    dispatch,
  };
};
