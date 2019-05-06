import React, { useState, useRef, useContext, useEffect } from "react";
import Axios, { AxiosResponse, AxiosError } from "axios";
import classNames from "classnames";
import { AppContext, AppAction } from "./context";

export interface TodoItemComponentProps { 
  todo: any
}

export const TodoItemComponent = (props: TodoItemComponentProps) => {
  if(!props.todo) return null;

  const [ description, setDescription ] = useState(props.todo.description);
  const [ isEditing, setIsEditing ] = useState(false);
  const [ appState, appDispatch ] = useContext(AppContext);
  const editTb = useRef(null);

  const handleListItemDoubleClick = (e: any) => {
    setDescription(props.todo.description);
    setIsEditing(true);
  }

  const handleTextboxChange = (e: any) => {
    setDescription(e.currentTarget.value);
  }

  const handleTextboxKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if(e.keyCode === 13) {
      editTb.current.blur();
    }
    else if (e.keyCode === 27) {
      setIsEditing(false);
    }
  }

  const handleCheckboxChange = (e: any) => {  
    updateTodo({ ...props.todo, done: e.currentTarget.checked });
  }

  const handleDeleteClick = () => {
    deleteTodo(props.todo.id);
  }

  const handleSubmit = (e: React.ChangeEvent<HTMLInputElement>) => {
    if(!description) {
      deleteTodo(props.todo.id);
    }
    else {
      updateTodo({ ...props.todo, description });
    }
  }
  
  const updateTodo = (todo: any) => {
    Axios.post(`http://localhost:11223/todo/${props.todo.id}`, { ...props.todo, ...todo })
      .then(
        (response: AxiosResponse) => {
          appDispatch({ type: AppAction.UpdateTodo, todo: { ...props.todo, ...response.data }});
        },
        (error: AxiosError) => {
          console.log(error);
        },
      )
      .finally(() => {
        setIsEditing(false)
      });
  }

  const deleteTodo = (id: string) => {
    let deleted: boolean = false;
    Axios.delete(`http://localhost:11223/todo/${id}`)
      .then(
        (response: AxiosResponse) => {
          appDispatch({ type: AppAction.RemoveTodo, todo: props.todo });
          deleted = response.data;
        },
        (error: AxiosError) => {
          console.log(error);
        }
      )
      .finally(() => {
        // we check this because if has been deleted, we unmount the component and there is no state to set
        if(deleted) return;
        setIsEditing(false);
      });
  }

  useEffect(() => {
    if(isEditing) editTb.current.focus();
  }, [isEditing])

  return (
    <li 
      className={classNames({ "completed": props.todo.done }, { "editing": isEditing })}
      onDoubleClick={handleListItemDoubleClick}
    >
      <div className="view">
        <input 
          type="checkbox" 
          className="toggle"
          checked={props.todo.done} 
          onChange={handleCheckboxChange}
        />
        <label>{props.todo.description}</label>
        <button 
          className="destroy"
          onClick={handleDeleteClick}
        />
      </div>
      <input 
        className="edit"
        value={description}
        ref={editTb}
        onChange={handleTextboxChange}
        onKeyDown={handleTextboxKeyDown}
        onBlur={handleSubmit}
      />
    </li>
  )
}
