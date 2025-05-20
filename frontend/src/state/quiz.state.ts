import { ObjectCollection } from '@wonderlandlabs/forestry';
import { useEffect, useRef, useState } from 'react';
import type { StateValue } from './cats.state';
import { isLevel, type Level } from './level.state';
const QUIZ_LENGTH = 5;
type StateFactoryProps = {
  fetch?: (url: string, options?: Record<string, any>) => Promise<any>;
};
export const STATE = {
  START: 'START',
  LOADIND: 'LOADING',
  LOADED: 'LOADED',
  QUIZTITLE: 'QUIZTITLE',
  QUIZ: 'QUIZ',
  ERROR: 'ERROR',
} as const;
export type StateValue = (typeof STATE)[keyof typeof STATE];

export type QuizStateValue = {
  chosenCats: Set<string>; // chosen ids
  status: StateValue;
  level: Level;
  current?: string;
  answers: Map<string, number>;
  isStupid: boolean;
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
        level: -1,
        status: STATE.START,
        quests: [],
        answers: [],
        currentQuest: 0,
        current: '',
      },
    },
    {
      async getQuest() {
        const cats = Array.from(this.value.chosenCats.values());
        const question = await fetch!(
          ['/api/quiz/question', this.value.level, cats.join(',')].join('/'),
        );

        if (!question) {
          throw new Error('cannot get question');
        }

        this.set('quests', [...this.get('quests'), question]);
        this.set('current', question._id);
      },
      async resetQuiz() {
        this.update((v) => ({
          ...v,
          currentQuest: 0,
          status: STATE.QUIZTITLE,
          quests: [],
          answers: new Map(),
        }));
      },

      currentQuestion() {
        const { quests, current } = this.value;
        if (!current) return null;
        return quests.find((q) => q._id === current);
      },
      choose(id: string, index: number) {
        const answers = new Map(...this.get('answers'));
        answers.set(id, index);
        this.set('answers', answers);
        if (answers.size >= QUIZ_LENGTH) {
          return this.finish();
        }
        this.acts.getQuest();
      },

      getQ(id: string) {
        const { quests } = this.value;
        return quests.find((q) => q._id === id);
      },
      startQuiz() {
        this.set('status', STATE.QUIZ);
        this.acts.getQuest();
      },
      async init() {
        if (!(typeof window === 'object' && window.sessionStorage)) {
          return null;
        }

        const chosenCats = window.sessionStorage.getItem('chosenCats');
        if (chosenCats) {
          try {
            const catItems = JSON.parse(chosenCats);
            this.update((value: StateValue, seed: string[]) => {
              return { ...value, chosenCats: new Set(seed) };
            }, catItems);
          } catch (err) {
            console.error('cannot parse cats', err);
          }
        }

        this.set('level', Number(window.sessionStorage.getItem('level') ?? -1));

        return this.observe((value: QuizStateValue) => {
          const cats = Array.from(value.chosenCats.values());
          const level = this.get('level');
          if (isLevel(level)) {
            window.sessionStorage.setItem('level', `${level}`);
          }

          try {
            window.sessionStorage.setItem('chosenCats', JSON.stringify(cats));
          } catch (err) {
            console.error('serialization error:', err);
          }

          window.sessionStorage.setItem('current', value.current ?? '');
        });
      },
      saveCategories(ids: string[]) {
        this.set('chosenCats', new Set(ids));
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
    sessionSub = quizState.acts.init();
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
    const sub = state.current?.observe((v) => {
      setValue(v);
    });

    state.current?.acts.init();
    return () => sub?.unsubscribe();
  }, []);

  return [state.current, value];
}
