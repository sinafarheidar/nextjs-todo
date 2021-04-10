import connectDB from '../../../server/middleware/mongodb'
import Todo from '../../../server/models/todo'

const handler = async (req, res) => {
    const { id } = req.query

    if (req.method === 'DELETE') {
        try {
            await Todo.findByIdAndDelete(id)
            return res.status(200).send('Successfully Deleted Todo')
        } catch (err) {
            return res.status(500).send(err)
        }
    } else if (req.method === 'GET') {
        try {
            const todos = await Todo.findById(id)
            return res.status(200).send(todos)
        } catch (err) {
            res.status(500).send(err)
        }
    } else if (req.method === 'POST') {
        try {
            const newTodo = await Todo.findById(id)
            newTodo.complete = true;

            const updatedTodo = await newTodo.save()
            return res.status(200).send(updatedTodo)
        } catch (err) {
            return res.status(500).send(err)
        }
    }

}

export default connectDB(handler);