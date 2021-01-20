import { gql } from "@apollo/client";

export const getCart = gql`
    {
        getCart {
            _id
            id
            title
            image
            price
            quantity
        }
    }
`;
