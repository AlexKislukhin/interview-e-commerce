import { ProductClass, Product } from "../models/Product";
import { Resolver, Query, Arg, Int, ObjectType, Field } from "type-graphql";
import { fake } from "../utils/fake";

const itemsOnPage = 20;

@ObjectType()
class ProductsWithPagination {
    @Field(() => [ProductClass])
    items: ProductClass[];

    @Field()
    itemCount: number;
}

@Resolver()
export class ProductResolver {
    @Query(() => ProductsWithPagination)
    async products(
        @Arg("region", () => String!) region: string,
        @Arg("locale", () => String!) locale: string,
        @Arg("page", () => Int!) page: number
    ) {
        const itemCount = await Product.countDocuments({ region });

        if (!itemCount) {
            let items: InstanceType<typeof ProductClass>[];

            items = await fake(region, locale);

            return {
                items: items.slice(
                    page * itemsOnPage,
                    (page + 1) * itemsOnPage
                ),
                itemCount: items.length,
            };
        }

        const items = await Product.find({ region })
            .skip(page * itemsOnPage)
            .limit(itemsOnPage);

        return { items, itemCount };
    }

    @Query(() => ProductClass)
    async product(
        @Arg("id", () => String!) id: string
    ): Promise<InstanceType<typeof ProductClass> | null> {
        const item = await Product.findOne({ _id: id });

        return item;
    }
}
