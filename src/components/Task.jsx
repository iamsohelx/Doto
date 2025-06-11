'use client'
import React from 'react'
import { Button } from "./ui/button";
import { CloudCheck, Trash } from "lucide-react";
import { useState } from 'react';


const Task = ( {task, idx, setMyTask}) => {

  // Delete Task
const deleteTask = (idx) => {
  let taskArr = JSON.parse(localStorage.getItem("Tasks")) || [];

  taskArr.splice(idx, 1);
  localStorage.setItem("Tasks", JSON.stringify(taskArr));

  toLoadFunc();
};

const toLoadFunc = () => {
  const storedTasks = JSON.parse(localStorage.getItem("Tasks")) || []; // Fallback to []
  setMyTask(storedTasks);
};

  return (
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
  )
}

export default Task
