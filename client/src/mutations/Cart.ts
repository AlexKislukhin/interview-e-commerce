import { gql } from "@apollo/client";

export const addToCartMutation = gql`
    mutation addToCart($productId: String!) {
        addToCart(productId: $productId) {
            id
            quantity
        }
    }
`;
