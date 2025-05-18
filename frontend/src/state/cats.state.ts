import { ObjectCollection } from '@wonderlandlabs/forestry';
import { sortBy } from 'lodash-es';
import { useEffect, useRef, useState } from 'react';
import type { Category } from '../types';

type StateFactoryProps = {
  fetch?: (url: string, options?: Record<string, any>) => Promise<any>;
};

export type StateValue = {
  chosen: Set<string>;
  cats: Category[];
};
export const stateFactory = ({ fetch }: StateFactoryProps) => {
  if (!fetch && typeof window !== 'undefined') {
    fetch = async (url, params) => {
      const res = await window.fetch(url, params);
      const json = await res.json();
      return json;
    };
  }

  type CatStateValue = {
    cats: Category[];
    chosen: Set<string>;
  };
  const state = new ObjectCollection(
    'catState',
    {
      initial: {
        cats: [],
        chosen: new Set(),
      },
    },
    {
      pick(id: string) {
        if (!id) return;
        this.update((value: CatStateValue, seed: string) => {
          const chosen = new Set(value.chosen.values());
          if (!chosen.has(id)) chosen.add(seed);
          else chosen.delete(id);
          return { ...value, chosen };
        }, id);

        console.log('chosen is now:', this.value.chosen);
      },
      saveButtonPrompt() {
        const { cats, chosen } = this.value as CatStateValue;

        switch (chosen.size) {
          case 0:
            return 'Choose Categories to continue';
          case 1: {
            let id = Array.from(chosen.values())[0];
            return (
              'Continue with ' +
              (cats.find((cat) => cat.id === id)?.name ?? 'Your Category')
            );
          }

          default:
            return 'Continue with ' + chosen.size + ' Categories';
        }
      },
      clearAll() {
        this.update((value: CatStateValue) => ({
          ...value,
          chosen: new Set(),
        }));
      },
      pickAll() {
        this.update((value: CatStateValue) => {
          const { cats } = value;
          const chosen = new Set(cats.map(({ id }) => id));
          return { ...value, chosen };
        });
      },
      columns() {
        if (!Array.isArray(this.value?.cats)) return [];
        const midpoint = Math.ceil(this.value.cats.length / 2);
        return [
          this.value.cats.slice(0, midpoint),
          this.value.cats.slice(midpoint),
        ];
      },
      async init() {
        const cats = await fetch('/api/cats/init');
        this.set('cats', cats);
      },
      async load() {
        const cats = await fetch('/api/cats');
        this.set('cats', sortBy(cats, 'name'));
      },
    },
  );

  return state;
};

export function useCatState() {
  const state = useRef(null);
  state.current ||= stateFactory({});

  const [value, setValue] = useState(state.current.value);

  useEffect(() => {
    console.log('loading from ', state.current);
    const sub = state.current?.subscribe((v) => {
      console.log('updating ', v);
      setValue(v);
    });
    console.log('state.current', state.current);
    state.current?.acts.load();
    return () => sub?.unsubscribe();
  }, []);

  return [state.current, value.cats, value.chosen];
}
