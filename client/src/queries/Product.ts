import { gql } from "@apollo/client";

export const getProductsQuery = gql`
    query getProducts($region: String!, $locale: String!, $page: Int!) {
        products(region: $region, locale: $locale, page: $page) {
            items {
                _id
                title
                image
                price
            }
            itemCount
        }
    }
`;
