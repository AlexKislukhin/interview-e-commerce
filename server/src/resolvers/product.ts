import { Resolver, Query } from "type-graphql";

@Resolver()
export class ProductResolver {
    @Query(() => String)
    hello() {
        return "Hello world";
    }
}
