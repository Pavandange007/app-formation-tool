
import TaskItem from "./TaskItem";
import { Task } from "../types/Task";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { useState } from "react";

interface TaskListProps {
  tasks: Task[];
  onToggleComplete: (id: string) => void;
  onDeleteTask: (id: string) => void;
  onEditTask: (id: string, title: string, description: string) => void;
  filter: string;
  onFilterChange: (filter: string) => void;
}

const TaskList = ({ 
  tasks, 
  onToggleComplete, 
  onDeleteTask, 
  onEditTask,
  filter,
  onFilterChange
}: TaskListProps) => {
  const [searchTerm, setSearchTerm] = useState("");
  
  // Filter tasks based on completion status and search term
  const filteredTasks = tasks.filter(task => {
    // First filter by completion status
    if (filter === "completed" && !task.completed) return false;
    if (filter === "active" && task.completed) return false;
    
    // Then filter by search term
    if (searchTerm && !task.title.toLowerCase().includes(searchTerm.toLowerCase())) {
      return false;
    }
    
    return true;
  });

  return (
    <div className="space-y-4">
      <div className="flex flex-col space-y-2 sm:flex-row sm:space-y-0 sm:space-x-2">
        <Input
          placeholder="Search tasks..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="flex-1"
        />
        
        <Select value={filter} onValueChange={onFilterChange}>
          <SelectTrigger className="w-full sm:w-[180px]">
            <SelectValue placeholder="Filter tasks" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All</SelectItem>
            <SelectItem value="active">Active</SelectItem>
            <SelectItem value="completed">Completed</SelectItem>
          </SelectContent>
        </Select>
      </div>
      
      {filteredTasks.length === 0 ? (
        <div className="text-center py-8 text-muted-foreground">
          No tasks found
        </div>
      ) : (
        <div className="space-y-2">
          {filteredTasks.map((task) => (
            <TaskItem
              key={task.id}
              task={task}
              onToggleComplete={onToggleComplete}
              onDelete={onDeleteTask}
              onEdit={onEditTask}
            />
          ))}
        </div>
      )}
      
      <div className="text-sm text-muted-foreground">
        {tasks.filter(t => !t.completed).length} tasks remaining
      </div>
    </div>
  );
};

export default TaskList;
