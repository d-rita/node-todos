const Todo = require('../models').Todo;
const TodoItem = require('../models').TodoItem;

module.exports = {
    create(req, res) {
        return Todo
            .create({
                title: req.body.title,
            })
            .then(todo => res.status(201).send(todo))
            .catch(err => res.status(400).send(err))
    },
    list(req, res) {
        return Todo
            .findAll({
                include: [{
                    model: TodoItem,
                    as: 'todoItems',
                }],
            })
            .then(todos => res.status(200).send(todos))
            .catch(err => res.status(400).send(err))
    },
    retrieve(req, res) {
        return Todo
            .findAll({
                where: {
                    id: req.params.todoId
                },
                include: [{
                    model: TodoItem,
                    as: 'todoItems'
                }],
            })
            .then(todo => {
                if (!todo || todo[0] == undefined)
                {
                    return res.status(404).send({
                        message: "Todo Item Not Found!",
                    })
                }
                return res.status(200).send(todo)
            })
            .catch(err => res.status(400).send(err))
    },
    update(req,res) {
        return Todo
            .update({ title: req.body.title || Todo.title }, { where: { id: req.params.todoId } })
            .then((result) => {
                if(result[0] == 0)
                {
                    return res.status(404).send({
                        message: "Todo not found!"
                    })
                }
                return res.status(200).send({ message: "Todo Updated!"})
            })
            .catch(err => res.status(400).send(err))
    },
    destroy(req, res){
        return Todo
            .destroy({
                where: {
                    id: req.params.todoId
                }
            })
            .then((result) => {
                console.log(result)
                if(result == 0)
                {
                    return res.status(404).send({
                        message: "Todo not found!"
                    })
                }
                return res.status(204).send({ message: "Deleted successfully"})
            })
            .catch(err => res.status(400).send(err))
    },
};
