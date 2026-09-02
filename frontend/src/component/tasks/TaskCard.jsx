import React, { useState } from "react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "../../components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Calendar, Edit2, MoreVertical, Trash2 } from "lucide-react";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import {
  QueryClient,
  useMutation,
  useQueryClient,
} from "@tanstack/react-query";
import Api from "../../lib/api/ApiClient";
import { toast } from "@/components/ui/toast";


const STATUS_CONFIG = {
  pending: {
    variant: "secondary",
    label: "Pending",
    color: "text-yellow-600",
  },
  "in progress": {
    variant: "destructive",
    label: "In progress",
    color: "text-blue-600",
  },
  completed: {
    variant: "outline",
    label: "Completed",
    color: "text-green-600",
  },
};
const TaskCard = ({
  task,
  onEdit,
  onDelete,
  onStatusChange,
  isLoading = false,
}) => {
  const statusCOnfig = STATUS_CONFIG[task.status] || STATUS_CONFIG["pending"];
  const [deleteDialog, setDeleteDialog] = useState(false);
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);
  const queryClient = useQueryClient();

  //Delete Mutation
  const deleteMutation = useMutation({
    mutationFn: async () => {
      const response = await Api.delete(`/tasks/${task._id}`);
      return response.data;
    },
    onSuccess: () => {
      toast.add({
        title: "Success",
        description: "Task deleted successfully",
      });
      queryClient.invalidateQueries({
        queryKey: ["tasks"],
      });
    },
    onError: (err) => {
      toast.add({
        variant: "destructive",
        title: "Error",
        description: "Failed to delete task",
      });
      console.error("error deleting task occour", err);
    },
  });

  const handleDeleteConfirm = async () => {
    try {
      await deleteMutation.mutateAsync(task._id);
      setShowDeleteDialog(false);
    } catch (error) {
      console.error("Error deleting confirm ", error);
      toast({
        variant: "destructive",
        title: "Error",
        description: error.message,
      });
    }
  };

  const formatDate = (dateString) => {
    if (!dateString) return null;
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };
  const isOverdue = (dueDate) => {
    if (!dueDate || task.status === "completed") return false;
    return new Date(dueDate) < new Date();
  };

  const dueDate = formatDate(task.DueDate);
  const overdue = isOverdue(task.DueDate);

  return (
    <>
      <Card className={"w-full transition-shadow hover:shadow-md"}>
        <CardHeader className={"pb-3"}>
          <div className="flex items-center justify-between">
            <CardTitle className={"text-lg leading-tight"}>
              {task.title}
            </CardTitle>
            <div className="flex items-center gap-4">
              <Badge
                variant={statusCOnfig.variant}
                className={`text-sm ${statusCOnfig.color}`}
              >
                {statusCOnfig.label}
              </Badge>

              {/* DropDown menu  */}
              <DropdownMenu>
                <DropdownMenuTrigger>
                  <Button
                    variant={"ghost"}
                    size={"sm"}
                    disabled={isLoading}
                    className="h-8 w-8 p-0 cursor-pointer"
                  >
                    <span className="sr-only">Open menu</span>
                    <MoreVertical className="h-4 w-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuItem
                  onClick={()=>onEdit(task)}
                  >
                    <Edit2 className="w-4 h-4 mr-2" /> Edit
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => setShowDeleteDialog(true)}>
                    <Trash2 className="w-4 h-4 mr-2" /> Delete
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>
        </CardHeader>
        <CardContent className={"space-y-3 leading-relaxed"}>
          {/* Description  */}
          {task.description && (
            <p className="text-muted-foreground">{task.description}</p>
          )}
          {/* DeuDate  */}
          {
            <div className="flex items-center gap-2">
              <Calendar className="h-4 w-4 text-muted-foreground" />
              <span className="text-sm text-muted-foreground">Due</span>
              <Badge
                variant={overdue ? "destructive" : "outline"}
                className="text-xs"
              >
                {dueDate}
                {overdue && " (overdue)"}
              </Badge>
            </div>
          }
          <div>{task.status}</div>
          {/* simple status indicator  */}
          <div className="flex items-center justify-between text-xs text-muted-foreground pt-2 border-t">
            <span>Created: {formatDate(task.createdAt)}</span>
            <span className={statusCOnfig.color}>{statusCOnfig.label}</span>
          </div>
        </CardContent>
      </Card>

      {/* Alert dialog box
       */}
      <AlertDialog open={showDeleteDialog} onOpenChange={setShowDeleteDialog}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This action can not be undone. this will permanetly delete the
              task <span className="text-lg font-bold">{task.title}</span>
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cencel</AlertDialogCancel>
            <AlertDialogAction
              className="cursor-pointer"
              onClick={handleDeleteConfirm}
            >
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
};

export default TaskCard;
