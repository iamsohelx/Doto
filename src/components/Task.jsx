"use client";
import React, { useEffect } from "react";
import { Button } from "./ui/button";
import { CloudCheck, Trash } from "lucide-react";
import { useState } from "react";

const Task = ({ task, idx, setMyTask, setCompletedTask, completedTask }) => {
  const [index, setIndex] = useState(null);

  useEffect(()=>{
      toLoadFunc();
  },[])

  // Delete Task
  const deleteTask = (idx) => {
    let taskArr = JSON.parse(localStorage.getItem("Tasks")) || [];
    let IndexArr = JSON.parse(localStorage.getItem("Index")) || [];

    IndexArr.splice(idx + 1,1)
    taskArr.splice(idx, 1);
    IndexArr.push(idx - 1);
    localStorage.setItem("Index", JSON.stringify(IndexArr));
    localStorage.setItem("Tasks", JSON.stringify(taskArr));

    toLoadFunc();
  };

  const toLoadFunc = () => {
    const storedTasks = JSON.parse(localStorage.getItem("Tasks")) || []; // Fallback to []
    const doneTasks = JSON.parse(localStorage.getItem("Index")) || [];
    setCompletedTask(doneTasks);
    setMyTask(storedTasks);
  };

  // Function For Completed Task
  const handleComplete = (idx) => {
    let arrIdx = JSON.parse(localStorage.getItem("Index")) || [];
    let res = arrIdx.find((num) => num == idx);
    console.log("ELe");
    console.log(res);

    if (res == idx) {
      let index = arrIdx.indexOf(res);
      arrIdx.splice(index, 1);
    } else {
      arrIdx.push(idx);
    }
    arrIdx.sort()
    localStorage.setItem("Index", JSON.stringify(arrIdx));

    toLoadFunc();
  };

  return (
    <div className="bg-white shadow-sm w-full font-bold rounded-2xl p-5 my-3 flex items-center justify-between">
      <div className="flex gap-5 items-center">
        <Button
          onClick={() => handleComplete(idx)}
          size={"icon"}
          className={`${idx == completedTask.find(num=>num ==idx) ? "text-green-400" : ""}`}
        >
          <CloudCheck strokeWidth={3} />
        </Button>
        <p className={`${idx == completedTask.find(num=>num ==idx) ? "line-through text-gray-600" : ""}`}>
          {task.task}
        </p>
      </div>
      <Button onClick={() => deleteTask(idx)} size={"icon"} variant={"outline"}>
        <Trash strokeWidth={3} />
      </Button>
    </div>
  );
};

export default Task;
