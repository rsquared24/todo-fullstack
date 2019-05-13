import React, { useState, useRef, useContext, useEffect } from "react";
import classNames from "classnames";
import { AppContext, AppAction } from "./context";
import { useSaveTodo, useDeleteTodo } from "./hooks";

export interface TodoItemComponentProps { 
  todo: any
}

export const TodoItemComponent = (props: TodoItemComponentProps) => {
  if(!props.todo) return null;

  const [ appState, appDispatch ] = useContext(AppContext); 
  const [ description, setDescription ] = useState(props.todo.description);
  const [ isEditing, setIsEditing ] = useState(false);
  const [ saveTodoResponse, setTodo ] = useSaveTodo()
  const [ deleteTodoResponse, setDeleteTodoId ] = useDeleteTodo();
  const editTb = useRef(null);

  useEffect(() => {
    if(!isEditing) return;

    editTb.current.focus();
  }, [isEditing])

  useEffect(() => { 
    if(!saveTodoResponse || saveTodoResponse.pending) return;

    if(saveTodoResponse.completed && saveTodoResponse.data) {
      appDispatch({ type: AppAction.UpdateTodo, todo: saveTodoResponse.data });
      setIsEditing(false)
    }
  }, [saveTodoResponse])

  useEffect(() => {
    if(!deleteTodoResponse || deleteTodoResponse.pending) return;

    if(deleteTodoResponse.completed && deleteTodoResponse.data) {
      appDispatch({ type: AppAction.RemoveTodo, todo: props.todo });
    }
  }, [deleteTodoResponse])

  const handleListItemDoubleClick = (e: React.MouseEvent<HTMLLIElement>) => {
    setDescription(props.todo.description);
    setIsEditing(true);
  }

  const handleTextboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
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
    setTodo({...props.todo, done: e.currentTarget.checked });
  }

  const handleDeleteClick = () => {
    setDeleteTodoId(props.todo.id);
  }

  const handleSubmit = (e: React.ChangeEvent<HTMLInputElement>) => {
    (description) ?
      setTodo({...props.todo, description: description }) :
      setDeleteTodoId(props.todo.id);
  }

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
