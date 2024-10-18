'use client';

import React, { Fragment } from "react";
import useLocalStorage from "~/hooks/useLocalStorage";
import { type Habit } from "./page";

export interface IRootContext {
  habits: Habit[];
  setHabits: (habits: Habit[]) => void;
};

export const RootContext = React.createContext<IRootContext>({
  habits: [],
  setHabits: function (habits: Habit[]): void {
    throw new Error("Function not implemented.");
  }
});

export default function Providers({ children }: { children: React.ReactNode }) {
  const [storedValueHabits, setValueHabits] = useLocalStorage<Habit[]>("habits", []);

  return (
    <Fragment>
      <RootContext.Provider value={{ habits: storedValueHabits, setHabits: setValueHabits }}>
        {children}
      </RootContext.Provider>
    </Fragment>
  );
}