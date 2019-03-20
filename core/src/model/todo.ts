import * as moment from "moment";

class Todo {
  public id: string;
  public done: boolean;
  public description: string;
  
  protected dateCreated?: Date;
  protected dateModified?: Date;

  constructor(description: string) {
    this.description = description;
    this.done = false;

    let today = new Date(moment.utc().format());
    this.dateCreated = today;
    this.dateModified = today; 
  }
}
export default Todo;