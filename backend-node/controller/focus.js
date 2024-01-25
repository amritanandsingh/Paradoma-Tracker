const focusModel = require("../model/focus");

module.exports.getCount = async (req, res) => {
    try {
        let focusInstance = await focusModel.findOne({});
        
        if (!focusInstance) {
            focusInstance = await focusModel.create({
                count: 0
            });
        }

        return res.status(200).json({
            message: "Successfully called getCount()",
            data: {
                count: focusInstance.count,
            }
        });
    } catch (error) {
        // handle the error
        return res.status(500).json({
            message: "Oops something went wrong at the server!",
            data: {
                error,
            }
        });
    }
}


module.exports.setCount = async(req,res) =>{
    
    try{
        let focusInstance = await focusModel.findOne({});
        
        if (!focusInstance) {
            
            focusInstance = await focusModel.create({
                count: 1
            });
        }
        else{
            focusInstance.count += 1;
            await  focusInstance.save();
        }
        return res.status(200).json({
            message: "Successfully called setCount()",
            data: {
                count: focusInstance.count,
            }
        });
    }
    catch(error){
        // handle the error
        return res.status(500).json({
            message: "Opps something went wrong at the server!",
            data: {
                error,
            }
        })}
}
