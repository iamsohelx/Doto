"use client";
import React, { useEffect, useState } from "react";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form, FormField, FormItem, FormMessage } from "./ui/form";
import { Label } from "./ui/label";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import Task from "./Task";

const ZodSchema = z.object({
  task: z.string().min(2, { message: "Please Enter Any Task" }),
});

const Todo = () => {
  // Array to store index of completed tasks
  const [completedTask, setCompletedTask] = useState([]);
  // Array For Tasks
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
  // let IndexArr = JSON.parse(localStorage.getItem("Index")) || [];

  //  let idxDelete = IndexArr.indexOf(idx + 1);
  // IndexArr.splice(idxDelete, 1);

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






  return (
    <div className="flex justify-center w-full h-full">
      <div className="w-[90%] md:w-[80%]">
        {myTask &&
          myTask.map((task, idx) => (
            <div key={idx}>
            <Task task={task} idx={idx} setMyTask={setMyTask} setCompletedTask={setCompletedTask} completedTask={completedTask}/>
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
