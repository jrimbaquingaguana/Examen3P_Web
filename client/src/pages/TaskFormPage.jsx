import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";
import { Button, Card, Input, Label } from "../components/ui";
import { useTasks } from "../context/tasksContext";
import { Textarea } from "../components/ui/Textarea";
import { useForm } from "react-hook-form";
dayjs.extend(utc);

export function TaskFormPage() {
  const { createTask, getTask, updateTask } = useTasks();
  const navigate = useNavigate();
  const params = useParams();
  const {
    register,
    setValue,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const [error, setError] = useState(null); // Variable de estado para almacenar el error de temas duplicados

  const onSubmit = async (data) => {
    try {
      const formattedData = {
        ...data,
        date: dayjs.utc(data.date).format(),
        topics: data.topics.split(",").map(topic => topic.trim()), // Convertir la cadena de temas en un array
      };

      // Verificar temas duplicados
      const uniqueTopics = [...new Set(formattedData.topics)];
      if (uniqueTopics.length !== formattedData.topics.length) {
        setError("Duplicate topics found"); // Establecer el mensaje de error
        return;
      } else {
        setError(null); // Limpiar el error si no hay temas duplicados
      }

      if (params.id) {
        await updateTask(params.id, formattedData);
      } else {
        await createTask(formattedData);
      }

      navigate("/tasks"); // Redirigir a otra página después de enviar el formulario
    } catch (error) {
      console.log(error);
      // window.location.href = "/";
    }
  };

  useEffect(() => {
    const loadTask = async () => {
      if (params.id) {
        const task = await getTask(params.id);
        setValue("title", task.title);
        setValue("description", task.description);
        setValue(
          "date",
          task.date ? dayjs(task.date).utc().format("YYYY-MM-DD") : ""
        );
        setValue("completed", task.completed);
        setValue("topics", task.topics.join(", ")); // Convertir el array de temas en una cadena separada por comas
      }
    };
    loadTask();
  }, []);

  return (
    <Card>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Label htmlFor="title">Title</Label>
        <Input
          type="text"
          name="title"
          placeholder="Title"
          {...register("title")}
          autoFocus
        />
        {errors.title && (
          <p className="text-red-500 text-xs italic">Please enter a title.</p>
        )}

        <Label htmlFor="description">Description</Label>
        <Textarea
          name="description"
          id="description"
          rows="3"
          placeholder="Description"
          {...register("description")}
        ></Textarea>

        <Label htmlFor="date">Date</Label>
        <Input type="date" name="date" {...register("date")} />

        <Label htmlFor="topics">Topics</Label>
        <Input
          type="text"
          name="topics"
          placeholder="Topics (separated by commas)"
          {...register("topics")}
        />
        {/* Mostrar mensaje de error si existe */}
        {error && <p className="text-red-500 text-xs italic">{error}</p>}

        <Button type="submit">Save</Button> {/* Agregar type="submit" al botón */}
      </form>
    </Card>
  );
}
