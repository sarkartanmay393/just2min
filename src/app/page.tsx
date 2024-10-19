'use client';

import { useCallback, useContext, useState } from "react";
import { PlusCircle, Grid, List } from 'lucide-react'
import { Button } from "~/components/ui/button"
import { Switch } from "~/components/ui/switch"
import { Input } from "~/components/ui/input"
import { Label } from "~/components/ui/label"
import { RootContext } from "./providers";
import HabitCard from "~/components/habit-card";
import type { Frequency, Habit } from "~/types";

import {
  Sheet,
  // SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "~/components/ui/sheet";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "~/components/ui/select"

export default function HabitList() {
  const { habits = [], setHabits } = useContext(RootContext);
  const [isGridView, setIsGridView] = useState(false);
  const [newHabitName, setNewHabitName] = useState('');
  const [frequency, setFrequency] = useState('');
  const [sheetOpen, setSheetOpen] = useState(false);

  const addHabit = useCallback(() => {
    if (!newHabitName.trim() || !frequency) {
      return;
    }
    if (newHabitName.trim() !== '') {
      const newHabit: Habit = {
        id: habits.length,
        name: newHabitName,
        frequency: frequency as Frequency,
        status: 'idle',
      }
      setHabits([...habits, newHabit]);
      setNewHabitName('');
      setFrequency('');
      setSheetOpen(false);
    }
  }, [newHabitName, frequency, habits, setHabits]);

  const removeHabit = (id: number) => {
    setHabits(habits.filter(habit => habit.id !== id))
  }

  return (
    <main className="flex flex-col justify-start space-y-3 h-[calc(100vh-84px)] py-2 px-4">
      {/* Top Part */}
      <div className="flex justify-between items-center">
        <div className="flex items-center space-x-2">
          <Switch
            id="view-mode"
            checked={isGridView}
            onCheckedChange={setIsGridView}
          />
          <Label htmlFor="view-mode">
            {isGridView ? <Grid className="h-4 w-4" /> : <List className="h-4 w-4" />}
          </Label>
        </div>
        <div className="flex space-x-2">
          {/* Habit Creation Sheet */}
          <Sheet open={sheetOpen} onOpenChange={setSheetOpen}>
            <SheetTrigger asChild>
              <Button variant='outline'>
                <PlusCircle className="" />
                Add Habit
              </Button>
            </SheetTrigger>
            <SheetContent className="w-screen max-w-sm">
              <SheetHeader>
                <SheetTitle>Create Habit</SheetTitle>
                <SheetDescription>
                  This would be a habit and you will work with habit instances.
                </SheetDescription>
              </SheetHeader>
              <div className="grid gap-4 py-4">
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="name" className="text-right">
                    Name
                  </Label>
                  <Input
                    id="name"
                    placeholder="Meditation"
                    value={newHabitName}
                    className="col-span-3"
                    onChange={(e) => setNewHabitName(e.target.value)}
                  />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="frequency" className="text-right">
                    Frequency
                  </Label>
                  <Select value={frequency} onValueChange={setFrequency}>
                    <SelectTrigger className="col-span-3">
                      <SelectValue placeholder="Select a frequency" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="daily">Daily</SelectItem>
                      <SelectItem value="weekly">Weekly</SelectItem>
                      <SelectItem value="monthly">Monthly</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <SheetFooter>
                <Button type="submit" onClick={addHabit}>Save</Button>
              </SheetFooter>
            </SheetContent>
          </Sheet>
        </div>
      </div>

      {/* Habit List */}
      <div className={`flex-grow overflow-y-auto grid gap-4 ${isGridView ? 'sm:grid-cols-2 lg:grid-cols-3' : 'grid-cols-1'}`}>
        {habits.map((habit, index) => (
          <HabitCard key={habit.id} habit={habit} removeHabit={() => removeHabit(index)} />
        ))}
      </div>
    </main>
  );
}