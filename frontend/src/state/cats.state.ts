import { ObjectCollection } from '@wonderlandlabs/forestry';
import { sortBy } from 'lodash-es';
import { useEffect, useRef, useState } from 'react';

type StateFactoryProps = {
  fetch: (url: string, options?: Record<string, any>) => Promise<any>;
};

export const stateFactory = ({ fetch }: StateFactoryProps) => {
  if (!fetch && typeof window !== 'undefined') {
    fetch = async (url, params) => {
      const res = await window.fetch(url, params);
      const json = await res.json();
      return json;
    };
  }
  const state = new ObjectCollection(
    'catState',
    {
      initial: {
        cats: [],
      },
    },
    {
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
    const sub = state.current?.subscribe(setValue);
    console.log('state.current', state.current);
    state.current?.acts.load();
    return () => sub?.unsubscribe();
  }, []);

  return [state.current, value];
}
