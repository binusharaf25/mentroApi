import { ClipboardCheck } from "lucide-react";
import React, { useState } from "react";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import TaskCard from "./TaskCard";

const TaskList = ({
  tasks = [],
  isLoading = false,
  onEdit,
  onDelete,
  onStatusChange,
}) => {
  
  const [searchTerm, setSearchTerm] = useState("");
  // Filter tasks based on search term
  const filteredTasks=tasks.filter(task=>{
    const matchSearch=task.title.toLowerCase().includes(searchTerm.toLocaleLowerCase())
    return matchSearch
  })
  const getTaskStatus = () => {
    const AllTasksByStatus = {
      pending: tasks.filter((task) => task.status === "pending").length,
      inProgress: tasks.filter((task) => task.status === "in progress").length,
      completed: tasks.filter((task) => task.status === "completed").length,
    };
    const categorizedTask = {
      all: filteredTasks,
      pending: filteredTasks.filter((task) => task.status === "pending"),
      inProgress: filteredTasks.filter((task) => task.status === "in progress"),
      completed: filteredTasks.filter((task) => task.status === "completed"),
    };

    const status = {
      total: tasks.length,
      pending: AllTasksByStatus.pending,
      inProgress: AllTasksByStatus.inProgress,
      completed: AllTasksByStatus.completed,
    };
    const total = tasks.length;

    return { total, status, categorizedTask };
  };

  // const stat = getTaskStatus(total,status,categorizedTask);

  const { total, status, categorizedTask } = getTaskStatus();
  const TaskGrid = ({tasks=[], emptMessage}) => {
    
    if (tasks?.length === 0) {
      return (
        <div className="text-center p-12">
          <div className="mx-auto max-w-md">
            <ClipboardCheck className="mx-auto h-12 w-12 text-accent-foreground " />
            <h3 className="mt-4 text-sm font-medium text-foreground">
              No task found
            </h3>
            <p className="mt-2 text-sm text-accent-foreground">{emptMessage}</p>
          </div>
        </div>
      );
    }
    return (
      <div className="grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 cursor-pointer space-y-4">
        {tasks.map((task) => (
          <TaskCard
          
            key={task._id}
            task={task}
            onEdit={onEdit}
            onDelete={onDelete}
            onStatusChange={onStatusChange}
            isLoading={isLoading}
          />
        ))}
      </div>
    );
  };


  return (
    <div className="space-y-6 mx-2">
      {/* overview  */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="bg-card g-4 rounded-lg border shadow-sm px-4 py-2">
          <div className="flex items-center justify-between">
            <p className="text-sm font-medium text-muted-foreground">Total</p>
            <ClipboardCheck className="text-2xl font-bold" />
          </div>
          <p>{status.total}</p>
        </div>
        <div className="bg-card g-4 rounded-lg border shadow-sm px-4 py-2">
          <div className="flex items-center justify-between">
            <p className="text-sm font-medium text-muted-foreground">Pending</p>
            <div className="h-2 w-2 bg-muted-foreground rounded-full"></div>
          </div>
          <p className="text-2xl font-bold text">{status.pending}</p>
        </div>
        <div className="bg-card g-4 rounded-lg border shadow-sm px-4 py-2">
          <div className="flex items-center justify-between">
            <p className="text-sm font-medium text-muted-foreground">
              In progress
            </p>
            <div className="h-2 w-2 bg-yellow-600 rounded-full"></div>
          </div>
          <p className="text-2xl font-bold text-yellow-600">
            {status.inProgress}
          </p>
        </div>
        <div className="bg-card g-4 rounded-lg border shadow-sm px-4 py-2">
          <div className="flex items-center justify-between">
            <p className="text-sm font-medium text-muted-foreground">
              Completed
            </p>
            <div className="h-2 w-2 rounded-full bg-blue-600"></div>
          </div>
          <p className="text-2xl text-blue-600">{status.completed}</p>
        </div>
      </div>

      {/* search input  */}
      <div className="relative">
        <Search className="absolute h-4 top-2 left-3" />
        <Input
          type="text"
          placeholder="Search tasks"
          className="w-[430px] border-rose-400 pl-10 "
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      {/* Tabs section  */}
      <Tabs defaultValue="all" className="w-full ">
        <TabsList className="grid grid-cols-4 w-full ">
          <TabsTrigger value="all" className="w-full cursor-pointer">
            All<Badge variant="default">{status.total}</Badge>
          </TabsTrigger>
          <TabsTrigger value="pending" className="w-full cursor-pointer">
            Pending <Badge variant="default">{status.pending}</Badge>
          </TabsTrigger>
          <TabsTrigger value="inprogress" className="w-full cursor-pointer">
            In progress <Badge variant="default">{status.inProgress}</Badge>
          </TabsTrigger>
          <TabsTrigger value="completed" className="w-full cursor-pointer">
            Completed <Badge variant="default">{status.completed}</Badge>
          </TabsTrigger>
        </TabsList>
        <TabsContent value="all">
          <TaskGrid 
          tasks={categorizedTask.all} 
          emptMessage="No tasks found" />
        </TabsContent>
        <TabsContent value="pending">
          <TaskGrid
            tasks={categorizedTask.pending}
            emptMessage="No pending task"
          />
        </TabsContent>
        <TabsContent value="inprogress">
          <TaskGrid 
          tasks={categorizedTask.inProgress}
          emptMessage="No inprogress task" />
        </TabsContent>
        <TabsContent value="completed">
          <TaskGrid
            tasks={categorizedTask.completed}
            emptMessage="No completed task"
          />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default TaskList;
