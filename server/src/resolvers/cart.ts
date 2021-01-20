import {
    Resolver,
    Arg,
    ObjectType,
    Field,
    Ctx,
    Mutation,
    Query,
} from "type-graphql";
import { MyContext } from "src/types";
import { Product, ProductClass } from "../models/Product";

@ObjectType()
export class CartItemClass extends ProductClass {
    @Field()
    id: string;

    @Field()
    quantity: number;
}

@Resolver()
export class CartResolver {
    @Query(() => [CartItemClass])
    async getCart(@Ctx() { req }: MyContext) {
        if (req.session.cart) {
            const cart = await Product.getCart(req.session.cart);

            return cart;
        }

        return [];
    }

    @Mutation(() => [CartItemClass])
    async addToCart(
        @Ctx() { req }: MyContext,
        @Arg("productId", () => String!) productId: string
    ) {
        let { cart } = req.session;

        const item = {
            id: productId,
            quantity: 1,
        };

        if (cart) {
            const idx = cart.findIndex((item) => item.id === productId);

            if (~idx) {
                cart[idx].quantity++;
            } else {
                cart.push(item);
            }
        } else {
            cart = [item];
        }

        req.session.cart = cart;

        const cartWithProducts = await Product.getCart(cart);

        return cartWithProducts;
    }
}
