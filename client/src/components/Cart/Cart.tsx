import { useQuery } from "@apollo/client";
import React from "react";
import { useTranslation } from "react-i18next";
import { getCart } from "../../queries/Cart";
import { CartItem } from "../../types";
import { ProductItem } from "../ProductItem/ProductItem";
import "./Cart.scss";

export const Cart: React.FC = () => {
    const { t } = useTranslation();

    const { data, loading } = useQuery<{ getCart: CartItem[] }>(getCart);

    if (loading) {
        return <div>{t("loading")}</div>;
    }

    if (!data?.getCart.length) {
        return <div>{t("noProducts")}</div>;
    }

    return (
        <div className="Cart">
            {data.getCart.map((item) => (
                <ProductItem
                    product={item}
                    key={item._id}
                    quantity={item.quantity}
                    cart
                />
            ))}
        </div>
    );
};
