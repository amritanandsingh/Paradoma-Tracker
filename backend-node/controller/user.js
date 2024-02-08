const userModel = require("../model/user");
const focusModel = require("../model/focus");
 
module.exports.getUser = async (req, res) => {
    try{
        const {email} =  req.body;
        const existingUser = await userModel.findOne({email});
        //console.log(existingUser , "Flag");
        if(existingUser)
        {
            return res.status(200).json({
                message:"got user",
                data:existingUser
            });
        }
        else{
            return res.status(400).json({
                message:"user not exist",
                data:None
            })
        }
    }
    catch(error){
        return res.status(500).json({
            message: "Opps something went wrong at the server!",
            data: {
                error,
            }
        })
    }
}

module.exports.createUser = async (req, res) => {
    
    //console.log(req.body);
    //console.log("inside CreateUser");
    try {
        const { name, email, password, phoneNumber } = req.body;
        const existingUser = await userModel.findOne({ email });
        if (existingUser) {
            return res.status(400).json({
                message: "Email already exists",
                data: req.body
            });
        } else {
            const user = await userModel.create({
                name, email, password, phoneNumber, focusLength: []
            });

            return res.status(200).json({
                message: "User created successfully",
                data: user
            });
        }
    } catch (error) {
        return res.status(500).json({
            message: "Oops! Something went wrong at the server!",
            data: {
                error,
            }
        });
    }
}


module.exports.fetchUserFocus = async (req, res) => {
    try {
        const { email } = req.body;
        const existingUser = await userModel.findOne({ email });

        if (!existingUser) {
            return res.status(400).json({
                message: "User not found",
                data: {}
            });
        }

        // Extracting createdAt values from focus instances
        const createdAtArray = [];
        for (const focusId of existingUser.focusLength) {
            const focusInstance = await focusModel.findById(focusId);
            if (focusInstance) {
                createdAtArray.push(focusInstance.createdAt);
            }
        }
        
        return res.status(200).json({
            message: "Successfully fetched array of Focus",
            data: createdAtArray
        });
    } catch (error) {
        return res.status(500).json({
            message: "Oops! Something went wrong at the server!",
            data: { error }
        });
    }
};


module.exports.createFocus = async (req, res) => {
    try {
        const { email } = req.body;
        const existingUser = await userModel.findOne({ email });

        if (!existingUser) {
            return res.status(404).json({
                message: "User not found",
                data: { email }
            });
        }

        let focusInstance = await focusModel.create({ count: 1 });
        existingUser.focusLength.push(focusInstance); // Use push to add focusInstance to the focusLength array

        await existingUser.save(); // Use save() to save the changes to the user document

        return res.status(200).json({
            message: "Successfully called createFocus()",
            data: {
                count: existingUser.focusLength // Corrected typo from focusLenth to focusLength
            }
        });
    } catch (error) {
        // handle the error
        return res.status(500).json({
            message: "Oops! Something went wrong at the server!",
            data: { error }
        });
    }
};
