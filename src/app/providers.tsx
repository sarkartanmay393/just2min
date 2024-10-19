'use client';

import React, { Fragment, useCallback } from "react";
import useLocalStorage from "~/hooks/useLocalStorage";
import type { Habit, Status } from "~/types";

export interface IRootContext {
  habits: Habit[];
  setHabits: (habits: Habit[]) => void;
  handleHabitStatusChange: (habitId: number, status: Status) => void;
};

export const RootContext = React.createContext<IRootContext>({
  habits: [],
  setHabits: function (_: Habit[]): void {
    throw new Error("Function not implemented.");
  },
  handleHabitStatusChange: function (_: number, __: Status): void {
    throw new Error("Function not implemented.");
  },
});

export default function Providers({ children }: { children: React.ReactNode }) {
  const [storedValueHabits, setValueHabits] = useLocalStorage<Habit[]>("habits", []);
  const handleHabitStatusChange = useCallback((habitId: number, status: Status) => {
    setValueHabits(habits => habits.map(habit => habit.id === habitId ? { ...habit, status } : habit));
  }, [setValueHabits]);

  return (
    <Fragment>
      <RootContext.Provider value={{ habits: storedValueHabits, setHabits: setValueHabits, handleHabitStatusChange }}>
        {children}
      </RootContext.Provider>
    </Fragment>
  );
}