import { Ref, ref, UnwrapRef } from 'vue';

type Events = Ref<UnwrapRef<Event[]>>

interface Event {
  key: string;
  cb: (...data: any[]) => void;
}

const eventList: Events = ref([]);

export const useEvent = () => {

  const addEvent = (key: string, cb: (...data: any[]) => void): void => {
    const event: Event = {
      key: key,
      cb: cb,
    };
    if ( eventList.value.length === 0 ) {
      eventList.value.push(event);
    } else {
      eventList.value.map((event: Event) => {
        if ( event.key === key ) {
          event.cb = cb;
        }
      });
    }
  };

  const removeEvent = (key: string) => {
    eventList.value.splice(eventList.value.findIndex((e: Event) => e.key === key), 1);
  };

  const dispatch = (key: string, ...data: any[]): void => {
    eventList.value.forEach((e): void => {
      if ( e.key === key ) {
        e.cb(...data);
      }
    });
  };

  return {
    addEvent,
    removeEvent,
    dispatch,
  };
};
