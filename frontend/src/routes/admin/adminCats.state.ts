import { ObjectCollection } from '@wonderlandlabs/forestry';

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
      async init() {
        const cats = await fetch('/api/cats/init');
        this.set('cats', cats);
      },
      async load() {
        const cats = await fetch('/api/cats');
        this.set('cats', cats);
      },
    },
  );

  return state;
};
