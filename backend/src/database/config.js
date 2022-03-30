import mongoose from "mongoose";

const url = "mongodb+srv://trongkami:Trongvip123!@cluster0.zee12.mongodb.net/web_enterprise?retryWrites=true&w=majority";

const connectionParams={
    useNewUrlParser: true
}

export const connection = async function (){
    await mongoose.connect(url,connectionParams)
}


