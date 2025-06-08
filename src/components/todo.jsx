"use client";
import React, { useEffect, useState } from "react";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form, FormField, FormItem, FormMessage } from "./ui/form";
import { Label } from "./ui/label";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { CloudCheck, Trash } from "lucide-react";

const ZodSchema = z.object({
  task: z.string().min(2, { message: "Please Enter Any Task" }),
});

const Todo = () => {
  // Array For Tasks
  const [tasks, setTasks] = useState([]);
  const [myTask, setMyTask] = useState([]);
  // Zod for handeling Form
  const form = useForm({
    resolver: zodResolver(ZodSchema),
    defaultValues: {
      task: "",
    },
  });

  

// Handle Form Data
const handleFormData = (data) => {
  let taskArr = JSON.parse(localStorage.getItem("Tasks")) || []; // Fallback to []

  taskArr.push(data);
  localStorage.setItem("Tasks", JSON.stringify(taskArr));

  toLoadFunc();
};

// Get Data From Local Storage
useEffect(() => {
  toLoadFunc();
}, []);

const toLoadFunc = () => {
  const storedTasks = JSON.parse(localStorage.getItem("Tasks")) || []; // Fallback to []
  setMyTask(storedTasks);
};

// Delete Task
const deleteTask = (idx) => {
  let taskArr = JSON.parse(localStorage.getItem("Tasks")) || [];

  taskArr.splice(idx, 1);
  localStorage.setItem("Tasks", JSON.stringify(taskArr));

  toLoadFunc();
};


  return (
    <div className="flex justify-center w-full h-full">
      <div className="w-[90%] md:w-[80%]">
        {myTask &&
          myTask.map((task, idx) => (
            <div
              key={idx}
              className="bg-white shadow-sm w-full font-bold rounded-2xl p-5 my-3 flex items-center justify-between"
            >
              <div className="flex gap-5 items-center">
                <Button size={"icon"}>
                  <CloudCheck strokeWidth={3} />
                </Button>
                <p>{task.task}</p>
              </div>
              <Button
                onClick={() => deleteTask(idx)}
                size={"icon"}
                variant={"outline"}
              >
                <Trash strokeWidth={3} />
              </Button>
            </div>
          ))}
      </div>
      <div className="fixed bottom-5 w-[90%] md:w-[80%] ">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(handleFormData)}>
            <FormField
              control={form.control}
              name="task"
              render={({ field }) => (
                <FormItem className={"p-5 shadow-sm bg-white rounded-2xl"}>
                  <FormMessage />
                  <Label className={"text-gray-600 font-bold"}>
                    Enter Task
                  </Label>
                  <Input {...field}></Input>
                </FormItem>
              )}
            ></FormField>
            <Button type={"submit"} className={"w-full mt-3 font-bold"}>
              Add Task
            </Button>
          </form>
        </Form>
      </div>
    </div>
  );
};

export default Todo;
