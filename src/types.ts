export type Frequency = 'daily' | 'weekly' | 'monthly' | 'yearly' | 'custom';
export type Status = 'idle' | 'in-progress' | 'completed' | 'over-time';

export interface Habit {
  id: number;
  name: string;
  frequency: Frequency;
  status: Status;
}

// export interface HabitInstance {
//   id: number;
//   habitId: number;
//   isCompleted: boolean;
//   date: string;
// }