import React, { useEffect, useRef, useState } from "react";
import { CartItem, Product } from "../../types";
import "./ProductItem.scss";
import Loader from "react-loader-spinner";
import cn from "classnames";
import { useMutation } from "@apollo/client";
import { addToCartMutation } from "../../mutations/Cart";
import { getCart } from "../../queries/Cart";
import { useTranslation } from "react-i18next";

interface ProductProps {
    product: Product;
    cart?: boolean;
    quantity?: number;
}

type AddToCartState = "success" | "error" | "idle";

export const ProductItem: React.FC<ProductProps> = ({
    product: item,
    cart,
    quantity,
}) => {
    const { t } = useTranslation();

    const [imageLoading, setImageLoading] = useState(true);
    const [addToCartState, setAddToCartState] = useState<AddToCartState>(
        "idle"
    );

    const timerRef = useRef<ReturnType<typeof setTimeout>>();

    const [addToCart] = useMutation<
        { addToCart: CartItem[] },
        { productId: string }
    >(addToCartMutation, {
        update(cache, { data }) {
            if (data) {
                setAddToCartState("success");
                cache.writeQuery({
                    query: getCart,
                    data: {
                        getCart: data.addToCart,
                    },
                });
            } else {
                setAddToCartState("error");
            }
        },
    });

    useEffect(() => {
        if (addToCartState !== "idle") {
            timerRef.current = setTimeout(() => {
                setAddToCartState("idle");
            }, 3000);
        }

        return () => {
            if (timerRef.current) {
                clearTimeout(timerRef.current);
            }
        };
    }, [addToCartState]);

    const generateStatusText = (status: AddToCartState) => {
        switch (status) {
            case "success":
                return "✓";
            case "error":
                return "x";
            case "idle":
            default:
                return t("buy");
        }
    };

    return (
        <div
            key={item._id}
            className={cn({
                ProductItem__Item: true,
                "ProductItem__Item--cart": cart,
            })}
        >
            <div
                className={cn({
                    ProductItem__ImageContainer: true,
                    "ProductItem__ImageContainer--loading": imageLoading,
                })}
            >
                {imageLoading && (
                    <div className="ProductItem__LoaderContainer">
                        <Loader
                            type="Puff"
                            color="#00BFFF"
                            height={100}
                            width={100}
                        />
                    </div>
                )}
                <img
                    style={{ visibility: imageLoading ? "hidden" : "visible" }}
                    src={item.image}
                    alt=""
                    onLoad={() => {
                        setImageLoading(false);
                    }}
                />
            </div>
            <div className="ProductItem__Text">
                <span className="ProductItem__Title">
                    {item.title.toUpperCase()}
                </span>
                {!cart && (
                    <button
                        className={cn({
                            ProductItem__AddToCart: true,
                            "ProductItem__AddToCart--error":
                                addToCartState === "error",
                        })}
                        onClick={() =>
                            addToCart({
                                variables: { productId: item._id },
                            })
                        }
                    >
                        {generateStatusText(addToCartState)}
                    </button>
                )}
                {cart && (
                    <div>
                        {quantity} x ${item.price}
                    </div>
                )}
            </div>
        </div>
    );
};
