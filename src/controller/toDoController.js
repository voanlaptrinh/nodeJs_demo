import toDo from '../model/toDo.js'
import multer from 'multer';



export const getTodo = async (req, res, next) => {
    //const { user } = req
    try {
        const data = await toDo.find({});
        res.status(200).json({ data })
    } catch (error) {
        return res.status(404).json({
            message: "Not Found"
        })
    }
}

export const createTodo = async (req, res, next) => {
    try {
        // console.log(req.storage);
        const upload = req.file.path
        console.log(req.file.path);
        const { name, status } = req.body;
     const usename = req.username
        const task = {
            userLogin: usename,
            name: name,
            status: status,
            storage: upload
        };

        const newTask = new toDo(task);

        const data = await newTask.save();
        res.status(200).json(data)
    } catch (error) {
        return res.status(404).json({
            message: error.message,
        })
    }
}

export const deleteTodo = async (req, res, next) => {
    try {
        const id = req.params.id;
        // console.log(id);
        const data = await toDo.deleteOne({ _id: id }, req.body);

        res.status(200).json(data)

    } catch (error) {
        return res.status(404).json({
            message: error.message,
        })
    }

}

export const updateTodo = async (req, res, next) => {
    try {
        const id = req.params.id;
        console.log({ id });
        const { name, age } = req.body;
        const newTask = {
            name: name,
            age: age
        }

        const rs = await toDo.findOneAndUpdate({ _id: id }, newTask, {
            new: true,
        });

        // const test = await getTaskById(id)
        // console.log(test);

        return res.status(200).json(rs)

    } catch (error) {
        return res.status(404).json({
            message: error.message,
        });
    }
}

export const getTaskById = async (id) => {
    const data = await toDo.findOne({ _id: id });
    return data
}

export const editStatus = async (req, res, next) => {
    try {
        const id = req.params.id;
        // const { status } = req.body;
        //get task by id
        // status
        const taskStatus = {
            status: status
        }
        const rs = await toDo.findOneAndUpdate({ _id: id }, taskStatus, {
            new: true,
        });
        return res.status(200).json(rs)
    } catch (error) {
        message.error(error.message);
    }
}

export const getStatus = async (req, res) => {
    try {
        const { status } = req.body
        const rs = await toDo.find({ status });
        return res.status(200).json(rs)


    } catch (error) {
        return res.status(404).json({
            message: error.message,
        });
    }

}
//!status -> update

// login -> user -> acc/pass -> 
export const TodoFromUser = async (req, res) => {
    try {
        //get user from auth
        // console.log(req.username);
        const { username } = req
        // console.log(username);
        const { name, status } = req.body;
        const task = {
            userLogin: username,
            name: name,
            status: status
        }
        // console.log(task);
        const newTodo = new toDo(task)
        const data = await newTodo.save();
        res.status(200).json(data)


    } catch (error) {
        return res.status(404).json({ message: "Not Found" })
    }
}

export const ListTodoFromUser = async (req, res, next) => {
    try {
        // const { userLogin } = req.body
        const { username } = req
        //  console.log(username);
        const Todo = await toDo.find({ userLogin: username }).exec()

        return res.status(200).json(Todo)

    } catch (error) {
        return res.status(404).json({ message: error.message })
    }
}

export const getAdmin = async (req, res, next) => {
    try {
        const { username } = req

        const Todo = await toDo.find({ username: username }).exec()
        return res.status(200).json(Todo)


    } catch (error) {
        return res.status(404).json({ message: error.message })
    }

}