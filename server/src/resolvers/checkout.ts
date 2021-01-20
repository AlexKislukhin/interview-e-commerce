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

@ObjectType()
class CheckoutInfo {
    @Field(() => String)
    firstName?: string;

    @Field(() => String)
    lastName?: string;

    @Field(() => String)
    middlename?: string;

    @Field(() => String)
    phone?: string;

    @Field(() => String)
    email?: string;
}

@Resolver()
export class CheckoutResolver {
    @Query(() => CheckoutInfo)
    async getCheckoutInfo(@Ctx() { req }: MyContext) {
        return req.session.checkout || {};
    }

    @Mutation(() => Boolean)
    async updateCheckoutInfo(
        @Ctx() { req }: MyContext,
        @Arg("firstName") firstName: string,
        @Arg("lastName") lastName: string,
        @Arg("phone") phone: string,
        @Arg("email") email: string,
        @Arg("middlename") middlename: string
    ) {
        req.session.checkout = {
            firstName,
            lastName,
            middlename,
            phone,
            email,
        };

        return true;
    }
}
