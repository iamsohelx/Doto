"use client"
import React from 'react'
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form, FormField, FormItem, FormMessage } from './ui/form';
import { Label } from './ui/label';
import { Input } from './ui/input';
import { Button } from './ui/button';

const ZodSchema = z.object({
    task:z.string().min(2,{message:"Please Enter Any Task"}),
})

const Todo = () => {
    // Zod for handeling Form
    const form = useForm({
        resolver: zodResolver(ZodSchema),
        defaultValues:{
            task: ""
        }
    })

    // Handle Form Data
    const handleFormData = (data) => {
       console.log(data);
       
    }

  return (
    <div className='flex justify-center w-full h-full'>
      <div className='w-[80%'></div>
      <div className='fixed bottom-5 w-[80%] '>
         <Form {...form}>
          <form onSubmit={form.handleSubmit(handleFormData)}>
              <FormField
               control={form.control}
               name="task"
               render={({ field }) => (
                 <FormItem className={"p-5 bg-white rounded-2xl"}>
                    <FormMessage/>
                    <Label className={"text-gray-600 font-bold"}>Enter Task</Label>
                    <Input {...field}></Input>
                 </FormItem>
               )}
              >

              </FormField>
              <Button type={'submit'} className={'mt-3 font-bold'}>Add Task</Button>
          </form>
         </Form>
      </div>
    </div>
  )
}

export default Todo
