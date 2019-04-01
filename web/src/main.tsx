import React from "react";

export interface MyComponentProps {
  message: string
}

export const MyComponent = (props: MyComponentProps) => {
  return (
    <div> {props.message} </div>
  )
}