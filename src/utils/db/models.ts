import mongoose, { Schema, InferSchemaType } from 'mongoose';

const productSchema = new Schema({
    title: {
        type: String,
        required: true,
        unique: true,
    },
    desc: {
        type: String,
        required: true,
    },
    price: {
        type: Number,
        required: true,
        min: 0,
    },
    stock: {
        type: Number,
        required: true,
        min: 0,
    },
    img: {
        type: String,
    },
    color: {
        type: String,
    },
    size: {
        type: String,
    },
    },
    { timestamps: true }
);

export type ProductType = InferSchemaType<typeof productSchema> & {
    _id:string
};


const userSchema = new Schema({
        username: {
            type: String,
            required: true,
            unique: true,
            min: 3,
            max: 20,
        },
        email: {
            type: String,
            required: true,
            unique: true,
        },
        password: {
            type: String,
            required: true,
            min:8
        },
        img: {
            type: String,
        },
        isAdmin: {
            type: Boolean,
            default: false,
        },
        isActive: {
            type: Boolean,
            default: true,
        },
        phone: {
            type: String,
        },
        address: {
            type: String,
        },
    },
    { timestamps: true }
);

export type UserType = InferSchemaType<typeof userSchema> & {
    _id:string
};

export const schemas = [
    {
        schema:userSchema,
        modelName:"User"
    },
    {
        schema:productSchema,
        modelName:"Product"
    }
];

export const UserModel =    mongoose.models.User || mongoose.model("User",userSchema);
export const ProductModel = mongoose.models.Product || mongoose.model("Product",productSchema);