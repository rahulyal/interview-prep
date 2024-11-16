"use client";

import { useState } from "react";

type ToDoItem = {
  id: number;
  task: string;
  description: string;
  status: boolean;
};
type ToDoList = ToDoItem[];

const Page = () => {
  const sampleData: ToDoList = [
    {
      id: 1,
      task: "Do Laundry",
      description: "maybe tonight or at tops tomorrow",
      status: true,
    },
    {
      id: 2,
      task: "Buy Shampoo",
      description: "on monday after the interview",
      status: false,
    },
    {
      id: 3,
      task: "Prepare for interview",
      description: "working on it now",
      status: true,
    },
  ];

  const [searchQuery, setSearchQuery] = useState("");
  const [ifSearchHits, setIfSearchHits] = useState({
    id: 0,
    task: "NULL",
    description: "NULL",
    status: false,
    checker: "false",
  });
  const [noSearchHit, setNoSearchHit] = useState(true);

  const updateSearchQuery = (event: any) => {
    // console.log(event.target.value);
    setSearchQuery(event.target.value);
  };

  const searchHandler = (event: any) => {
    event.preventDefault();

    // check for the search query within all the todo items in the lsit we have
    for (const element of sampleData) {
      if (element.description.includes(searchQuery)) {
        setIfSearchHits({
          id: element.id,
          task: element.task,
          description: element.description,
          status: element.status,
          checker: "true",
        });
      }
    }
    // return back the particular todo element if there is a match
    // otherwise just there is no match
  };

  return (
    <div>
      <p className="text-4xl">ToDo:</p>
      {sampleData.map((element: ToDoItem) => (
        <ToDoItem
          key={element.id}
          task={element.task}
          description={element.description}
          status={element.status}
        />
      ))}
      <div className=" flex flex-col box-border h-32 w-80 border-2 border-black m-5 p-5">
        <div className="flex flex-row">
          <form onSubmit={searchHandler}>
            <input
              onChange={updateSearchQuery}
              className="border-2"
              value={searchQuery}
            ></input>
            <button className="border-2 border-black ml-2" type="submit">
              Search
            </button>
          </form>
          {ifSearchHits.checker === "true" && (
            <ToDoItem
              key={ifSearchHits.id}
              task={ifSearchHits.task}
              description={ifSearchHits.description}
              status={ifSearchHits.status}
            />
          )}
        </div>
      </div>
    </div>
  );
};

type ToDoItemProps = {
  task: string;
  description: string;
  status: boolean;
};

const ToDoItem = ({ task, description, status }: ToDoItemProps) => {
  return (
    <div className=" flex flex-col box-border h-32 w-80 border-2 border-black m-5 p-5">
      <div className="flex flex-row">
        <p className="text-xl p-2">{task}</p>
        {status ? (
          <p className="text-l p-2 text-green-400">Status: done</p>
        ) : (
          <p className="text-l p-2 text-red-400">Status: not done</p>
        )}
      </div>
      <p>{description}</p>
    </div>
  );
};

export default Page;

// ToDo: Notes - type definitions
/*
task, status -> 
todoitem component: 
Phase 1
---
Phase 2 

*/
