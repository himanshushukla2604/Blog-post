import  { mongoose } from "mongoose"
const Schema = mongoose.Schema;
const blogPost = new Schema(
    {
        title: {
            type: String,
            required: true
        },

        content: {
            type: String,
            required: true
        },

        auther: {
            type: Schema.type.ObjectId,
            ref: "User"
        }
    },
    
    {timestamps: true}
    )   