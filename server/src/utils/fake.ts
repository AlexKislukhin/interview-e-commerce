import { ProductClass, Product } from "../models/Product";
import faker from "faker";

export const fake = async (
    region: string,
    locale: string,
    numberOfProducts = Math.floor(Math.random() * 50 + 50)
) => {
    const bulk: Partial<ProductClass>[] = [];

    faker.locale = locale;

    for (let j = 0; j < numberOfProducts; j++) {
        bulk.push({
            title: faker.commerce.productName(),
            price: parseInt(faker.commerce.price()),
            image: `${faker.image.fashion()}?random=${Math.random()}}`,
            language: locale,
            region,
        });
    }

    return await Product.insertMany(bulk);
};
