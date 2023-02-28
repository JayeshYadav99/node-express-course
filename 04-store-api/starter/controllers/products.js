const Product=require('../models/product.js');
const getALLProductsStatic=async (req,res)=>
{
 
    const products=await Product.find({price:{$gt:30}}).sort('price').select('price').limit(10).skip(5);
    res.status(200).json({products,nbHits:products.length});
}
const getALLproducts=async (req,res)=>{
    const {featured,company,name,sort,fields,numericFilters}=req.query;
    const queryobject={};
    if(featured)
    {
        queryobject.featured=featured==='true'?true:false;
    }
    if(company)
    {
        queryobject.company=company; 
    }
    if(name)
    {
       queryobject.name={$regex:name,$options:'i'}; 
    }
    if(numericFilters)
    {
        const operatorMap={
            '>':'$gt',
            '>=':'$gte',
            '=':'$eq',
            '<':'$lt',
            '<=':'$lte',
        }
        const regEx=/\b(<|>|>=|=|<|<=)\b/g;
        let filters=numericFilters.replace(regEx,(match)=>`-${operatorMap[match]}-`)
        const options=['price','rating'];
        filters=filters.split(',').forEach((item)=>
        {
            const[field,operator,value]=item.split('-')
            if(options.includes(field))
            {
                queryobject[field]={[operator]:Number(value)}
            }
        })
    }
    
    // console.log(queryobject);
    let result= Product.find(queryobject);
    if(sort)
    {
        const sortList=sort.split(',').join(' ');
        result=result.sort(sortList); 
    }
    else{
        result=result.sort('createdAt');
    }
    if(fields)
    {
        const fieldsList=fields.split(',').join(' ');
        result=result.select(fieldsList); 
    }
    const page=Number(req.query.page)||1;
    const limit=Number(req.query.limit)|| 10;
    const skip=(page-1)*limit;
    result=result.skip(skip).limit(limit);
    const products=await result;
    res.status(200).json({products,nbHits:products.length})
}
module.exports={
     getALLproducts,
    getALLProductsStatic,
} 