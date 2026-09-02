import React from "react";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { Card } from "@/components/ui/card";
import {
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../../components/ui/card";
import CardStatus from "./CardStatus";
import TaskForm from "../tasks/TaskForm";

const WelcomeSection = ({onCreateTask,showCreateForm}) => {
  return (
    <Card className="flex justify-between border-0 shadow-sm bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-ble-950 dark:to-indgo-950">
      <CardHeader className={"pb-4"}>
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="space-y-2 flex flex-col items-start">
            <CardTitle className={"text-2xl font-semibold"}>
              Welcome Back!
            </CardTitle>
            <CardDescription className={"text-base"}>
              Here's what's hepping with your task today
            </CardDescription>
          </div>
          <Button 
          onClick={onCreateTask}
          className="cursor-pointer">
            <Plus className="mr-2" /> 
            Create new Task
          </Button>
        </div>
      </CardHeader>
      <CardContent className={"p-6"}>
        {/* Card status  */}
        <CardStatus />
      </CardContent>
    </Card>
  );
};

export default WelcomeSection;
