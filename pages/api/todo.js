import connectDB from '../../server/middleware/mongodb'
import Todo from '../../server/models/todo'

const handler = async (req, res) => {
    if (req.method === 'POST') {
        const { title, description, complete } = req.body

        try {
            let newTodo = new Todo({
                title,
                description,
                complete
            })

            let todoCreated = await newTodo.save()
            return res.status(200).send(todoCreated)
        } catch (error) {
            return res.status(500).send(error.message)
        }
    } else if (req.method === 'GET') {
        try {
            const todos = await Todo.find()
            return res.status(200).send(todos)
        } catch(err) {
            res.status(500).send(err)
        }
    }
}

export default connectDB(handler);