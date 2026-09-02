import React, { useEffect, useState } from "react";

import { Dialog } from "@/components/ui/dialog";
import {
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "../../components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import Api from "../../lib/api/ApiClient";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import globalError from "../../utils/globalError";
import { LoaderCircle, SplinePointer } from "lucide-react";
import useAuthStore from "../../lib/stores/authStore";
import { toast } from "@/components/ui/toast";

const TaskForm = ({ tasks, isLoading,open, onOpenChange, setShowCreateForm }) => {
  const [formValue, setFormValue] = useState({
    title: "",
    description: "",
    status: "pending",
    DueDate: "",
  });
  const [validationError, setvVlidationError] = useState(null);
  const { user, token } = useAuthStore();
  const queryClient = useQueryClient();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formValue.title) {
      setvVlidationError("Title is required");
      return;
    }
    const task = {
      title: formValue.title.trim(),
      description: formValue.description.trim(),
      status: formValue.status,
      DueDate: formValue.DueDate
        ? new Date(formValue.DueDate).toISOString()
        : null,
    };
    if (tasks) {
      updateMutation.mutate(task);
    } else {
      registerTask.mutate(task);
    }
    registerTask.mutate();
    formValue.title = "";
    formValue.description = "";
    formValue.status = "";
    formValue.DueDate = "";
  };
  const handleIputChange = (e) => {
    const { name, value } = e.target;
    setFormValue({
      ...formValue,
      [name]: value,
    });
  };
  const registerTask = useMutation({
    mutationKey: ["tasks"],
    mutationFn: async (taskData) => {
      const response = await Api.post("/tasks/create", taskData);

      return response.data;
    },
    onSuccess: (data) => {
      toast.add({
        title: `${formValue.title}`,
        description: "Seccussful Created",
      });
      queryClient.invalidateQueries({ queryKey: ["tasks"] });
      setShowCreateForm(false);
    },
    onError: (err) => {
      setvVlidationError(globalError(err));
    },
  });

  //editting
  useEffect(() => {
    if (tasks) {
      setFormValue({
        title: tasks.title || "",
        description: tasks.description || "",
        status: tasks.status || "status",
        DueDate: tasks.DueDate
          ? new Date(tasks.DueDate).toISOString().split("T")[0]
          : "",
      });
    } else {
      setFormValue({
        title: "",
        description: "",
        status: "",
        DueDate: "",
      });
    }
    setvVlidationError(null);
  }, [open, tasks]);

  //Task status
  const taskStatus = [
    { value: "pending", label: "Pending" },
    { value: "in progress", label: "In progress" },
    { value: "completed", label: "Completed" },
  ];

  const handleStatusChange = (value) => {
    setFormValue({
      ...formValue,
      status: value,
    });
  };

  //Update mutation
  const updateMutation = useMutation({
    mutationKey: ["tasks"],
    mutationFn: async (taskData) => {
      const response = await Api.put(`/tasks/${tasks._id}`, taskData);
      return response.data;
    },
    onSuccess: (data) => {
      console.log("Task updated succesfully ", data);
      toast.add({
        title: "Updated",
        description: "Seccussfull Updated",
      });
      queryClient.invalidateQueries({
        queryKey: ["tasks"],
      });
      onOpenChange?.(false)
      setShowCreateForm(false);
    },
    onError: (err) => {
      globalError(err);
    },
  });

  //Get display error from validation or mutation errors
  const displayError = validationError || globalError(registerTask.error);

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      {/* <DialogTrigger>Create new Task</DialogTrigger> */}
      <DialogContent className={"sm:max-w-[500px]"}>
        <DialogHeader>
          <DialogTitle className={"text-lg font-semibold"}>
            Create new Task
          </DialogTitle>
          <DialogDescription className={"text-sm text-muted-foreground"}>
            Fill in the details below to create a new task
          </DialogDescription>
        </DialogHeader>

        {/* inputs  */}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label>Title*</Label>
            <Input
              value={formValue.title}
              onChange={handleIputChange}
              name="title"
              type="text"
              placeholder="Enter task title"
              required
            />
          </div>
          <div className="space-y-2">
            <Label>description</Label>
            <Textarea
              value={formValue.description}
              onChange={handleIputChange}
              name="description"
              type="text"
              placeholder="Enter task description"
            />
          </div>

          <div className="space-y-2">
            <Select onValueChange={handleStatusChange} value={formValue.status}>
              <SelectTrigger className="w-full cursor-pointer">
                <SelectValue placeholder="Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  {taskStatus.map((item) => (
                    <SelectItem key={item.value} value={item.value}>
                      {item.label}
                    </SelectItem>
                  ))}
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-2">
            <Label>description</Label>
            <Input
              className="cursor-pointer"
              value={formValue.DueDate}
              onChange={handleIputChange}
              name="DueDate"
              type="date"
              placeholder="Enter task description"
            />
          </div>
          <DialogFooter>
            <Button
              type="submit"
              className={"w-full bg-primary h-8 text-secondary cursor-pointer"}
              
            >
              {
                isLoading?(
                  <span>
                    <SplinePointer  className="flex items-center gap-2"/>
                    {tasks?'Updating....':'Creating....'}
                  </span>
                ):(
                  tasks?'Update task':'Create task'
                )
              }
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default TaskForm;
