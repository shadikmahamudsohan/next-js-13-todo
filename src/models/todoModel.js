import { Schema, model, models } from "mongoose";

const todoSchema = new Schema({
    todo: {
        type: String,
        trim: true,
        // unique: [true, "Todo is already created"],
        require: [true, "please add your todo"]
    }
});

if (models.NextTodo) {
    delete models.NextTodo;
}
const Todo = model("NextTodo", todoSchema);
export default Todo;