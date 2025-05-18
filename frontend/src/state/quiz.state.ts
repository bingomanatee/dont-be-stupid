import { ObjectCollection } from '@wonderlandlabs/forestry';
import { useEffect, useRef, useState } from 'react';
import type { StateValue } from './cats.state';

type StateFactoryProps = {
  fetch?: (url: string, options?: Record<string, any>) => Promise<any>;
};
export const STATE = {
  START: 'START',
  LOADIND: 'LOADING',
  LOADED: 'LOADED',
  ERROR: 'ERROR',
} as const;
export type StateValue = (typeof STATE)[keyof typeof STATE];

export type QuizStateValue = {
  chosenCats: Set<string>; // chosen ids
  status: StateValue;
};

export const stateFactory = ({ fetch }: StateFactoryProps) => {
  if (!fetch && typeof window !== 'undefined') {
    fetch = async (url, ...params: any[]) => {
      const res = await window.fetch(url, ...params);
      const json = await res.json();
      return json;
    };
  }

  const state = new ObjectCollection(
    'catState',
    {
      initial: {
        chosenCats: new Set(),
        status: STATE.START,
      },
    },
    {
      async init() {
        if (!(typeof window === 'object' && window.sessionStorage)) {
          return null;
        }
        const chosenCats = window.sessionStorage.getItem('chosenCats');
        if (chosenCats)
          try {
            const catItems = JSON.parse(chosenCats);
            this.update((value: StateValue, seed: string[]) => {
              return { ...value, chosenCats: new Set(seed) };
            }, catItems);
          } catch (err) {
            console.error('cannot parse cats', err);
          }
        return this.subscribe((value: QuizStateValue) => {
          const cats = Array.from(value.chosenCats.values());
          try {
            window.sessionStorage.setItem('chosenCats', JSON.stringify(cats));
          } catch (err) {
            console.error('serialization error:', err);
          }
        });
      },
      saveCategories(ids: string[]) {
        this.update((value: StateValue, seed: string[]) => {
          return { ...value, chosenCats: new Set(seed) };
        }, ids);
      },
    },
  );

  return state;
};

let quizState;
let sessionSub;

export default function getQuizState() {
  if (!quizState) {
    quizState = stateFactory({});
    sessionStorage = quizState.acts.init();
  }
  return quizState;
}

export function closeState() {
  sessionSub?.unsubscribe();
}

export function useQuizState() {
  const state = useRef(null);
  state.current ||= getQuizState();

  const [value, setValue] = useState(state.current?.value ?? {});

  useEffect(() => {
    const sub = state.current?.subscribe((v) => {
      console.log('updating ', v);
      setValue(v);
    });

    state.current?.acts.load();
    return () => sub?.unsubscribe();
  }, []);

  return [state.current, value];
}
