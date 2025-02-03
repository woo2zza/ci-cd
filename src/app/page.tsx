"use client";
import React, { useState } from "react";
import { format, startOfWeek, addDays } from "date-fns";
import { Card, AnimatedCard } from "../components/ui/card";
import { Button } from "../components/ui/button";

interface Todo {
  id: number;
  date: string;
  task: string;
}

export default function Home() {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [selectedDate, setSelectedDate] = useState<string>("");
  const [newTask, setNewTask] = useState<string>("");
  const weekStart = startOfWeek(new Date(), { weekStartsOn: 1 });

  const handleDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSelectedDate(e.target.value);
  };

  const addTodo = () => {
    if (!selectedDate) {
      alert("날짜를 선택해야 합니다!");
      return;
    }
    const newTodo: Todo = {
      id: Date.now(),
      date: selectedDate,
      task: newTask,
    };
    setTodos([...todos, newTodo]);
    setNewTask("");
  };

  const updateTodo = (id: number, updatedTask: string) => {
    setTodos(
      todos.map((todo) => {
        if (todo.id === id) {
          return { ...todo, task: updatedTask };
        }
        return todo;
      })
    );
  };

  const deleteTodo = (id: number) => {
    setTodos(
      todos.filter((todo) => {
        return todo.id !== id;
      })
    );
  };

  return (
    <div className="p-4">
      <div className="text-[80px] mb-4 text-center animate-moveUpFast">
        TO DO THIS WEEK
      </div>
      <div className="grid grid-cols-7 gap-2 border p-4">
        {[...Array(7)].map((_, i) => {
          const date = format(addDays(weekStart, i), "yyyy-MM-dd");
          return (
            <div
              key={i}
              className="border p-2 cursor-pointer"
              onClick={() => setSelectedDate(date)}
            >
              <h3 className="text-center">
                {format(addDays(weekStart, i), "EEEE")}
              </h3>
              <p className="text-center">{date}</p>
              {todos
                .filter((todo) => todo.date === date)
                .map((todo) => (
                  <Card key={todo.id}>
                    <AnimatedCard>
                      <div className="flex justify-between items-center animate-slideIn">
                        <span>{todo.task}</span>
                        <div className="animate-spin">
                          <Button
                            onClick={() =>
                              updateTodo(
                                todo.id,
                                prompt(
                                  "새로운 할 일을 입력하세요",
                                  todo.task
                                ) || todo.task
                              )
                            }
                          >
                            수정
                          </Button>
                          <Button onClick={() => deleteTodo(todo.id)}>
                            삭제
                          </Button>
                        </div>
                      </div>
                    </AnimatedCard>
                  </Card>
                ))}
            </div>
          );
        })}
      </div>
      <div className="mt-4">
        <input
          type="date"
          value={selectedDate}
          onChange={handleDateChange}
          className="border p-2 mb-2"
        />
        <input
          type="text"
          placeholder="할 일을 입력하세요"
          value={newTask}
          onChange={(e) => setNewTask(e.target.value)}
          className="border p-2 mb-2"
        />
        <Button onClick={addTodo}>할 일 추가</Button>
      </div>
    </div>
  );
}
