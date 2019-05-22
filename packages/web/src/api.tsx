import { useState, useEffect } from "react";
import Axios, { AxiosResponse, AxiosError } from "axios";

export const useSaveTodo = () => {
  const [ todo, setTodo ] = useState(null);
  const [ response, setResponse ] = useState(null);

  useEffect(() => {
    if(!todo) return;

    setResponse({ pending: true, completed: false, error: null, data: null });

    Axios.post(`http://localhost:11223/todo/${todo.id || ""}`, todo)
      .then(
        (resp: AxiosResponse) => {
          setResponse({ pending: false, completed: true, error: null, data: resp.data });
        },
        (error: AxiosError) => {
          setResponse({ pending: false, completed: true, error: error.message, data: null });
        }
      )
  }, [todo]);

  return [ response, setTodo ];
}

export const useDeleteTodo = () => {
  const [ id, setId ] = useState(null);
  const [ response, setResponse ] = useState(null);

  useEffect(() => {
    if(!id) return;

    setResponse({ pending: true, completed: false, error: null, data: null });

    Axios.delete(`http://localhost:11223/todo/${id}`)
      .then(
        (resp: AxiosResponse) => {
          setResponse({ pending: false, completed: true, error: null, data: resp.data });
        },
        (error: AxiosError) => {
          setResponse({ pending: false, completed: true, error: error.message, data: null });
        }
      )
  }, [id]);

  return [ response, setId ];
}

export const useMarkTodos = (todos: any) => {
  const [ isCompleted, setIsCompleted ] = useState(null);
  const [ response, setResponse ] = useState(null);

  useEffect(() => { 
    if(isCompleted === null) return;

    let ids = todos.filter((todo: any) => todo.done === !isCompleted).map((todo: any) => todo.id)

    if(!ids || ids.length <= 0) return;

    setResponse({ pending: true, completed: false, error: null, data: null });

    Axios.post(`http://localhost:11223/todo/mark-as-${isCompleted ? "complete" : "incomplete"}`, { ids })
      .then(
        (resp: AxiosResponse) => {
          setResponse({ pending: false, completed: true, error: null, data: resp.data });
        },
        (error: AxiosError) => {
          setResponse({ pending: false, completed: true, error: error.message, data: null });
        }
      )
  }, [isCompleted]);

  return [ response, setIsCompleted ];
}

export const useClearCompleted = () => {
  const [ ids, setIds ] = useState(null);
  const [ response, setResponse ] = useState(null);

  useEffect(() => {
    if(!ids) return;

    setResponse({ pending: true, completed: false, error: null, data: null });

    Axios.post(`http://localhost:11223/todo/clear-completed`, { ids })
      .then(
        (resp: AxiosResponse) => {
          setResponse({ pending: false, completed: true, error: null, data: resp.data });
        },
        (error: AxiosError) => {
          setResponse({ pending: false, completed: true, error: error.message, data: null });
        }
      )
  }, [ids]);

  return [ response, setIds ];
}

export const useGetTodos = () => {
  const [ response, setResponse ] = useState(null);

  useEffect(() => {
    setResponse({ pending: true, completed: false, error: null, data: null });

    Axios.get("http://localhost:11223/todo").then(
      (resp: AxiosResponse) => {
        setResponse({ pending: false, completed: true, error: null, data: resp.data });
      },
      (error: AxiosError) => {
        setResponse({ pending: false, completed: true, error: error.message, data: null });
      }
    )
  }, []);

  return response;
}