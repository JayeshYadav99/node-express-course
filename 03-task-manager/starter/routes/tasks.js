const express=require('express');
const router = express.Router();
const {
    GetTasks,CreateTasks,GetTask,UpdateTasks,DeleteTasks
}=require('../controller/tasks');
router.route('/').get(GetTasks).post(CreateTasks);
router.route('/:id').get(GetTask).patch(UpdateTasks).delete(DeleteTasks);


module.exports=router;