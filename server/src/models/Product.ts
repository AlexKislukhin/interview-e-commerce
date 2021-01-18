import { prop, Typegoose } from "typegoose";

class Product extends Typegoose {
    @prop()
    title: string;

    @prop()
    price: number;

    @prop()
    image: string;

    @prop()
    region: string;

    @prop()
    language: string;
}

const ProductModel = new Product().getModelForClass(Product);

// const func = async () => {
//     const hello = await ProductModel.find({});
// };

export default ProductModel;
