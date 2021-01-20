import { gql } from "@apollo/client";

export const CheckoutInfoQuery = gql`
    {
        getCheckoutInfo {
            firstName
            lastName
            middlename
            phone
            email
        }
    }
`;
