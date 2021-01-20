import { gql } from "@apollo/client";

export const CheckoutInfoMutation = gql`
    mutation CheckoutInfoMutation(
        $firstName: String!
        $lastName: String!
        $phone: String!
        $email: String!
        $middlename: String!
    ) {
        updateCheckoutInfo(
            firstName: $firstName
            lastName: $lastName
            phone: $phone
            email: $email
            middlename: $middlename
        )
    }
`;
