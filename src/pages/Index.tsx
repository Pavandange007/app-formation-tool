
import { useState, useEffect } from "react";
import TaskForm from "../components/TaskForm";
import TaskList from "../components/TaskList";
import Header from "../components/Header";
import { Task } from "../types/Task";
import { ThemeProvider } from "next-themes";

const Index = () => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [filter, setFilter] = useState<string>("all");

  // Load tasks from localStorage when the component mounts
  useEffect(() => {
    const savedTasks = localStorage.getItem('tasks');
    if (savedTasks) {
      try {
        setTasks(JSON.parse(savedTasks));
      } catch (error) {
        console.error("Failed to parse saved tasks:", error);
        // Fall back to default tasks if parsing fails
        setDefaultTasks();
      }
    } else {
      // Set default tasks if no saved tasks exist
      setDefaultTasks();
    }
  }, []);

  // Set default tasks function
  const setDefaultTasks = () => {
    const defaultTasks: Task[] = [
      {
        id: "1",
        title: "Complete project proposal",
        description: "Write up the initial proposal for the new client project",
        priority: "high" as "high",
        completed: false,
      },
      {
        id: "2",
        title: "Go grocery shopping",
        description: "Buy fruits, vegetables, and other essentials",
        priority: "medium" as "medium",
        completed: false,
      },
      {
        id: "3",
        title: "Morning workout",
        description: "30 minutes cardio and strength training",
        priority: "low" as "low",
        completed: true,
      },
    ];
    setTasks(defaultTasks);
    localStorage.setItem('tasks', JSON.stringify(defaultTasks));
  };

  // Save tasks to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem('tasks', JSON.stringify(tasks));
  }, [tasks]);

  const addTask = (task: Omit<Task, "id" | "completed">) => {
    const newTask: Task = {
      ...task,
      id: Date.now().toString(),
      completed: false,
    };
    setTasks([...tasks, newTask]);
  };

  const toggleTaskCompletion = (id: string) => {
    setTasks(tasks.map(task => 
      task.id === id ? { ...task, completed: !task.completed } : task
    ));
  };

  const deleteTask = (id: string) => {
    setTasks(tasks.filter(task => task.id !== id));
  };

  const editTask = (id: string, title: string, description: string) => {
    setTasks(tasks.map(task => 
      task.id === id ? { ...task, title, description } : task
    ));
  };

  return (
    <ThemeProvider attribute="class" defaultTheme="light">
      <div className="min-h-screen bg-background">
        <Header />
        <main className="container max-w-md mx-auto p-4 pt-20 pb-24">
          <TaskForm onAddTask={addTask} />
          
          <div className="mt-6">
            <h2 className="text-xl font-bold mb-4">Your Tasks</h2>
            <TaskList 
              tasks={tasks} 
              onToggleComplete={toggleTaskCompletion}
              onDeleteTask={deleteTask}
              onEditTask={editTask}
              filter={filter}
              onFilterChange={setFilter}
            />
          </div>
        </main>
      </div>
    </ThemeProvider>
  );
};

export default Index;
