'use client';

import { useState } from "react";
import { PlusCircle, Grid, List, Trash2 } from 'lucide-react'
import { Button } from "~/components/ui/button"
import { Switch } from "~/components/ui/switch"
import { Input } from "~/components/ui/input"
import { Label } from "~/components/ui/label"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "~/components/ui/card"

export type Frequency = 'daily' | 'weekly' | 'monthly' | 'yearly' | 'custom';

export interface Habit {
  id: number;
  name: string;
  frequency: Frequency;
  status: 'Not Started' | 'In Progress' | 'Completed'

}

export default function HabitList() {
  const [habits, setHabits] = useState<Habit[]>([
    { id: 1, name: 'Drink water', frequency: 'daily', status: 'In Progress' },
    { id: 2, name: 'Read a book', frequency: 'weekly', status: 'Not Started' },
    { id: 3, name: 'Meditate', frequency: 'daily', status: 'Completed' },
    { id: 4, name: '2 Meditate', frequency: 'daily', status: 'Completed' },
    { id: 5, name: 'Detate', frequency: 'daily', status: 'Completed' },
    { id: 6, name: 'Tate', frequency: 'daily', status: 'Completed' },
    { id: 7, name: 'Med', frequency: 'daily', status: 'Completed' },
  ])
  const [isGridView, setIsGridView] = useState(true)
  const [newHabitName, setNewHabitName] = useState('')

  const addHabit = () => {
    if (newHabitName.trim() !== '') {
      const newHabit: Habit = {
        id: habits.length + 1,
        name: newHabitName,
        frequency: 'daily',
        status: 'Not Started',
      }
      setHabits([...habits, newHabit])
      setNewHabitName('')
    }
  }

  const removeHabit = (id: number) => {
    setHabits(habits.filter(habit => habit.id !== id))
  }

  return (
    <div className="flex flex-col justify-start space-y-4 h-[calc(100vh-84px)]">
      {/* Top Part */}
      <div className="flex justify-between items-center py-1">
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
          <Input
            type="text"
            placeholder="New habit name"
            value={newHabitName}
            onChange={(e) => setNewHabitName(e.target.value)}
            onKeyUp={(e) => e.key === 'Enter' && addHabit()}
            className="max-w-[200px] bg-white"
          />
          <Button onClick={addHabit}>
            <PlusCircle className="h-4 w-4 mr-2" />
            Add Habit
          </Button>
        </div>
      </div>

      {/* Habit List */}
      <div className={`flex-grow overflow-y-auto grid gap-4 ${isGridView ? 'sm:grid-cols-2 lg:grid-cols-3' : 'grid-cols-1'}`}>
        {habits.map((habit) => (
          <HabitCard key={habit.id} habit={habit} removeHabit={() => removeHabit(habit.id)} />
        ))}
      </div>
    </div>
  );
}

function HabitCard({ habit, removeHabit }: { habit: Habit, removeHabit: () => void }) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>{habit.name}</CardTitle>
        <CardDescription>{habit.frequency}</CardDescription>
      </CardHeader>
      <CardContent>
        <p className="text-sm">Status: {habit.status}</p>
      </CardContent>
      <CardFooter className="flex justify-between">
        <Button variant="outline" size="sm" onClick={removeHabit}>
          <Trash2 className="h-4 w-4 mr-2" />
          Remove
        </Button>
      </CardFooter>
    </Card>
  );
}