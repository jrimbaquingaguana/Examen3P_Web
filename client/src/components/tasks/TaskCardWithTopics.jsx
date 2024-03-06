import React from "react";
import { useTasks } from "../../context/tasksContext";
import { Button, ButtonLink, Card } from "../ui";

export function TaskCardWithTopics({ task }) {
  const { deleteTask } = useTasks();

  const handleDelete = () => {
    deleteTask(task._id);
  };

  return (
    <div>
      <header className="flex justify-between">
      </header>
      <Card>
      <h1 className="text-2xl font-bold">{task.title}</h1>

        <p className="text-slate-300">{task.description}</p>
        {/* format date */}
        <p>
          {task.date &&
            new Date(task.date).toLocaleDateString("en-US", {
              weekday: "long",
              year: "numeric",
              month: "long",
              day: "numeric",
            })}
        </p>
        {/* Display topics */}
        <div className="flex flex-wrap mt-2">
          {task.topics && task.topics.length > 0 &&
            task.topics.map((topic, index) => (
              <span
                key={index}
                className="bg-gray-200 rounded-full px-2 py-1 text-sm text-gray-700 mr-2 mb-2"
              >
                {topic}
              </span>
            ))
          }
           
        </div>
        <div>
        <Button onClick={handleDelete}>Delete</Button>
        
        <ButtonLink to={`/tasks/${task._id}`}>Edit</ButtonLink>
        </div>
      </Card>
      
    </div>
  );
}
