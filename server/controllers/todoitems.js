const TodoItem = require('../models').TodoItem;

module.exports = {
    create(req, res) {
        return TodoItem
            .create({
                content: req.body.content,
                todoId: req.params.todoId
            })
            .then(todoItem => res.status(201).send(todoItem))
            .catch(err => res.status(400).send(err));
    },
    retrieve(req,res) {
        return TodoItem
            .findAll({
                where: {
                        id: req.params.todoItemId,
                        todoId: req.params.todoId
                    },
                }
            )
            .then(todoItem => {
                if(!todoItem || todoItem.length == 0){
                    return res.status(404).send({ message: "Todo Item not found!"})
                };
                return res.status(200).send(todoItem)
            })
            .catch(err => res.status(400).send(err))
    },
    update(req, res) {
        return TodoItem
            .update({
                content: req.body.content || TodoItem.content,
                complete: req.body.complete || TodoItem.complete
            },
            { where: 
                {
                    id: req.params.todoItemId,
                    todoId: req.params.todoId
                },
            }
            )
            .then(updatedItem => {
                if(updatedItem[0] == 0){
                    return res.status(404).send({ message: "Todo Item not found!"})
                };
                return res.status(200).send({ message: "Todo Item successfully updated"})
            })
            .catch((err) => res.status(400).send(err))
    },
    destroy(req, res) {
        return TodoItem
            .destroy({
                where: {
                    id: req.params.todoItemId,
                    todoId: req.params.todoId
                }
            })
            .then(deletedItem => {
                if (deletedItem == 0){
                    return res.status(404).send({ message: "Todo Item not found!"})
                }
                return res.status(204).send()
            })
            .catch(err => res.status(400).send(error))
    }
}