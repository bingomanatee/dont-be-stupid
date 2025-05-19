import { ObjectCollection } from '@wonderlandlabs/forestry';
import { useEffect, useRef, useState } from 'react';
import type { Question } from '../types';
import getQuizState, { type QuizStateValue } from './quiz.state';

type StateFactoryProps = {
  fetch?: (url: string, options?: Record<string, any>) => Promise<any>;
};

export const stateFactory = ({ fetch }: StateFactoryProps) => {
  if (!fetch && typeof window !== 'undefined') {
    fetch = async (url, params) => {
      const res = await window.fetch(url, params);
      const json = await res.json();
      return json;
    };
  }

  type QuestSateValue = {
    quests: Question[];
    difficulty: number;
    count: number;
    catName: string;
  };

  const state = new ObjectCollection(
    'questState',
    {
      initial: {
        quests: [],
        difficulty: 5,
        count: 4,
        catName: '',
      },
    },
    {
      pick(id: string) {
        if (!id) return;
        const chosen = new Set(this.get('chosen').values());
        if (!chosen.has(id)) chosen.add(id);
        else chosen.delete(id);
        this.set('chosen', chosen);
      },
      saveButtonPrompt(): string {},
      clearAll() {
        this.set('quests', []);
      },

      loadGlobalState() {
        const { value } = getQuizState() as { value: QuizStateValue };
      },
    },
  );

  state.acts.loadGlobalState();
  return state;
};

export function useQuestState() {
  const state = useRef(null);
  state.current ||= stateFactory({});

  const [value, setValue] = useState(state.current.value);

  useEffect(() => {
    const sub = state.current?.subscribe((v) => {
      setValue(v);
    });
    // state.current?.acts.load();
    return () => sub?.unsubscribe();
  }, []);

  return [state.current, value.quests];
}
