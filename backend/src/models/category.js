import mongoose from 'mongoose';



const CategorySchema = new mongoose.Schema(
    { 
        categoryName: {
            type: String,
            required: true
        },
        used: {
            Type: mongoose.Schema.Types.ObjectId,
            default: 0
        },
    },
    {
        timestamps : true,
    },
);

export const Category = mongoose.model('categories', CategorySchema);