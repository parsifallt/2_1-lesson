import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { addTodo, deleteTodo, editTodo } from "../store/store";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import TodoItem from "./TodoItem";

export default function TodoParent() {
    const list = useSelector((state) => state.todos);
    const dispatch = useDispatch();

    function addItem(e) {
        e.preventDefault();
        const data = new FormData(e.target);
        const newTodo = {
            todoName: data.get("TodoName"),
            id: Date.now(),
        };
        dispatch(addTodo(newTodo));
        e.target.reset();
    }

    function deleteItem(todoid) {
        if (confirm("Rostan Ochirmoqchimisiz?")) {
            dispatch(deleteTodo(todoid));
        }
    }

    function editItem(todoid) {
        if (confirm("Rostan Yangilamoqchimis?")) {
            const currentTodo = list.find((todo) => todo.id === todoid);
            const newTodo = prompt("Edit Todo", currentTodo.todoName);
            if (newTodo) {
                dispatch(editTodo({ id: todoid, newTodo }));
            }
        }
    }

    return (
        <form
            onSubmit={addItem}
            className="flex justify-center  items-center flex-col py-10"
        >
            <div className="grid w-full max-w-sm mb-5 items-center gap-1.5">
                <Label htmlFor="Todo">Todo</Label>
                <Input
                    type="text"
                    id="Todo"
                    name="TodoName"
                    placeholder="Enter Task"
                />
            </div>
            <ul className="flex flex-col max-w-sm w-full gap-5 ">
                {list.length > 0 ? (
                    list.map(({ todoName, id }) => {
                        return (
                            <li key={id}>
                                <TodoItem
                                    id={id}
                                    editItem={editItem}
                                    deleteItem={deleteItem}
                                    title={todoName}
                                ></TodoItem>
                            </li>
                        );
                    })
                ) : (
                    <li>No Data</li>
                )}
            </ul>
        </form>
    );
}
