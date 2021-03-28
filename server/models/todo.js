import mongoose from 'mongoose';
var Schema = mongoose.Schema;

var todo = new Schema({
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    complete: {
        type: Boolean,
        required: true
    }
})

mongoose.models = {};

var Todo = mongoose.model('Todo', todo);

export default Todo;