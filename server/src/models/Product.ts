import { Field, ObjectType } from "type-graphql";
import { prop, staticMethod, Typegoose } from "@hasezoey/typegoose";
import mongoose from "mongoose";
import { CartItem } from "src/types";
import { CartItemClass } from "src/resolvers/cart";

@ObjectType()
export class ProductClass extends Typegoose {
    @Field()
    _id: string;

    @Field()
    @prop()
    title: string;

    @Field()
    @prop()
    price: number;

    @Field()
    @prop()
    image: string;

    @Field()
    @prop()
    region: string;

    @Field()
    @prop()
    language: string;

    @staticMethod
    public static async getCart(cart: CartItem[]) {
        const products = await Product.aggregate<ProductClass>([
            {
                $match: {
                    _id: {
                        $in: cart.map(
                            (item) => new mongoose.Types.ObjectId(item.id)
                        ),
                    },
                },
            },
        ]);

        const populatedCart = cart.reduce((acc, item) => {
            const product = products.find(
                (product) => product._id.toString() === item.id
            );

            if (product) {
                acc.push({
                    ...product,
                    id: item.id,
                    quantity: item.quantity,
                });
            }

            return acc;
        }, [] as Partial<CartItemClass>[]);

        return populatedCart;
    }
}

export const Product = new ProductClass().getModelForClass(ProductClass, {
    existingMongoose: mongoose,
    schemaOptions: { collection: "product" },
});
