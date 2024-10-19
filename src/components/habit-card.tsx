/* eslint-disable @typescript-eslint/no-explicit-any */
// import {
//   Card,
//   CardContent,
//   CardDescription,
//   CardFooter,
//   CardHeader,
//   CardTitle,
// } from "~/components/ui/card"
import { Button } from "~/components/ui/button";
import { CheckCircle, Circle, Clock, 
  // Flame,
   MoreHorizontal, MoreVertical, Trash2 } from "lucide-react";
import type { Habit } from "~/types";
import { Badge } from "./ui/badge";
import { Checkbox } from "./ui/checkbox";
import { useContext, useState } from "react";
// import { Progress } from "./ui/progress";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "~/components/ui/dropdown-menu"
import { RootContext } from "~/app/providers";

export function TaskCard() {
  return (
    <div className="flex items-center space-x-4 p-4 bg-white border border-gray-200 rounded-lg shadow-sm max-w-3xl">
      <Checkbox id="task" className="h-5 w-5 rounded-sm border-gray-300" />
      <div className="flex-1 min-w-0">
        <div className="flex items-center space-x-2">
          <span className="text-sm font-medium text-gray-700">TASK-8782</span>
          <Badge variant="secondary" className="bg-gray-100 text-gray-600 rounded-full px-2 py-0.5 text-xs font-medium">
            Documentation
          </Badge>
        </div>
        <p className="mt-1 text-sm text-gray-900 truncate">
          You can't compress the program without quantifying the open-source SSD...
        </p>
      </div>
      <div className="flex items-center space-x-2">
        <Badge variant="secondary" className="bg-blue-50 text-blue-600 rounded-full px-2 py-0.5 text-xs font-medium flex items-center">
          <Clock className="w-3 h-3 mr-1" />
          In Progress
        </Badge>
        <Badge variant="secondary" className="bg-gray-100 text-gray-600 rounded-full px-2 py-0.5 text-xs font-medium">
          Medium
        </Badge>
        <DropdownMenu>
          <DropdownMenuTrigger>
            <Button className="text-gray-400 hover:text-gray-600">
              <MoreHorizontal className="w-5 h-5" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuLabel>My Account</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem>Profile</DropdownMenuItem>
            <DropdownMenuItem>Billing</DropdownMenuItem>
            <DropdownMenuItem>Team</DropdownMenuItem>
            <DropdownMenuItem>Subscription</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </div>
  )
}

type HabitCardProps = {
  habit: Habit;
  habitName?: string;
  streak?: number;
  weekProgress?: number;
  removeHabit: () => void;
}

export default function HabitCard({ habit, habitName = "Read for 30 minutes", streak = 5, weekProgress = 4, removeHabit }: HabitCardProps) {
  const { handleHabitStatusChange } = useContext(RootContext);

  const toggleCompletion = () => {
    handleHabitStatusChange(habit.id, habit.status === 'completed' ? 'idle' : 'completed');
  }

  return (
    <div className="bg-white rounded-lg shadow-sm p-2 w-full h-fit">
      <div className="flex justify-between items-start m b-3">
        <div className="flex items-center">
          <Button
            variant="ghost"
            size="icon"
            onClick={toggleCompletion}
            className="mr-2 p-0 hover:bg-transparent"
          >
            {['completed', 'over-time'].includes(habit.status) ? (
              <CheckCircle className="h-6 w-6 text-green-500" />
            ) : (
              <Circle className="h-6 w-6 text-gray-300" />
            )}
          </Button>
          <h3 className="font-semibold text-lg text-gray-800">{habit.name}</h3>
        </div>
        <DropdownMenu>
          <DropdownMenuTrigger>
            <Button variant="ghost" size="icon" className="text-gray-400 hover:text-gray-600">
              <MoreVertical className="h-5 w-5" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuItem onClick={() => removeHabit()}>
              <Trash2 /> Remove
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
      {/* <div className="flex justify-between items-center mb-2">
        <div className="flex items-center">
          <Flame className="h-5 w-5 text-orange-500 mr-1" />
          <span className="text-sm font-medium text-gray-600">{streak} day streak</span>
        </div>
        <span className="text-sm text-gray-500">{weekProgress}/7 this week</span>
      </div>
      <Progress value={(weekProgress / 7) * 100} className="h-2" /> */}
    </div>
  )
}