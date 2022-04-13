const brandModel = require('../models/brandModel.js');

module.exports={
     insert_brand : async(req, res)=>{
        try {    
            const {brand_name,product,user,title,discription} = req.body;
            if(brand_name && product && user && title && discription)
            {
                const branddoc = new brandModel({
                    brand_name:brand_name, product:product, user:user,title:title,discription:discription
                })
                await branddoc.save();
                return res.json({success:true, msg:"Brand Data inserted successfully.."}) 
            }else{
                return res.json({success:false, msg:"All fields are required.."})
            }
        } catch (err) {
            return res.json({success:false, msg: err.message})
        }
    },
     show_brand : async(req,res)=>{
        try {
            
            const {brand_name} = req.body;
            const result = await brandModel.find()
            .populate({ path: 'product', select: { _id: 0 } }) 
            .populate({ path: 'user',select:{_id:0} })
            return res.json(result);
        } catch (err) {
            return res.json({status:"failed", msg: err.message})
        }
    }
}
 