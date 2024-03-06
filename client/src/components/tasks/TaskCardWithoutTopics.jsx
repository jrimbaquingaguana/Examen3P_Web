import React from "react";
import { useTasks } from "../../context/tasksContext";
import { Button, ButtonLink, Card } from "../ui";

export function TaskCardWithoutTopics({ task }) {
  const { deleteTask } = useTasks();

  const handleDelete = () => {
    deleteTask(task._id);
  };

  
}
