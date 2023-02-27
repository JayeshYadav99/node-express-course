const Task=require('../model/Task');
const asyncwrapper=require('../middleware/async');
const {createCustomError}=require('../error/CustomError')
const GetTasks=asyncwrapper(
    async (req,res)=>
{
   
        const tasks=await Task.find({})
        res.status(200).json({tasks});     
   
}
) 
const CreateTasks=asyncwrapper(
    async (req,res)=>
{
      const task=await Task.create(req.body);
        res.status(201).json(task);    

}
)
const GetTask=asyncwrapper(async (req,res,next)=>
{
    

        const task=await Task.findOne({_id:req.params.id})
        if(!task)
        {
        
            return next(createCustomError(`no task with that id:${req.params.id}`,404));
            
        }
        res.status(201).json({task});    
   
})
const DeleteTasks=asyncwrapper(async (req,res,next)=>
{   

        const task=await Task.findOneAndDelete({_id:req.params.id})
        if(!task)
        {
           
            return next(createCusttomError(`no task with that id:${req.params.id}`)); 
        }
      
        return res.status(200).json({ task });
        

})
const UpdateTasks=asyncwrapper(async (req,res,next)=>
{
     const {id:taskID}=req.params;
   const task=await Task.findOneAndUpdate({_id:taskID},req.body,{
    new:true,
    runValidators:true,
   })
   if(!task)
        {
           
            return next(createCustomError(`no task with that id:${req.params.id}`));
            
        }
         res.status(200).json({task});

  
})
module.exports={GetTasks,CreateTasks,GetTask,UpdateTasks,DeleteTasks};