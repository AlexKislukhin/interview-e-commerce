import "./ProductList.scss";
import { useQuery } from "@apollo/client";
import { Pagination } from "@material-ui/lab";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useHistory, useLocation } from "react-router-dom";
import { getProductsQuery } from "../../queries/Product";
import { getLocale } from "../../store/locale/selectors";
import { getRegion } from "../../store/region/selectors";
import { Product } from "../../types";
import { ProductItem } from "../../components/ProductItem/ProductItem";
import { useTranslation } from "react-i18next";

const productLimit = parseInt(process.env.REACT_APP_PRODUCT_LIMIT || "20");

export const ProductList: React.FC = () => {
    const { t } = useTranslation("translation");

    const history = useHistory();
    const location = useLocation();

    const urlSearchParams = new URLSearchParams(location.search);

    const [page, setPage] = useState(() =>
        parseInt(urlSearchParams.get("page") || "1")
    );
    const region = useSelector(getRegion);
    const locale = useSelector(getLocale);

    const { data, loading } = useQuery<{
        products: { items: Product[]; itemCount: number };
    }>(getProductsQuery, {
        variables: {
            region,
            locale,
            page: page - 1,
        },
        skip: region.length === 0 || locale.length === 0,
    });

    useEffect(() => {
        history.replace({ pathname: "/", search: `?page=${page}` });
    }, [history, page]);

    if (loading) {
        return <div className="ProductList__Loading">{t("loading")}</div>;
    }

    if (!data?.products.items.length) {
        return <div> {t("noProducts")}</div>;
    }

    return (
        <div className="ProductList__Container">
            {data.products.items.map((item) => (
                <ProductItem key={item._id} product={item} />
            ))}
            <div className="ProductList__NavigationContainer">
                <Pagination
                    count={Math.ceil(data.products.itemCount / productLimit)}
                    page={page}
                    onChange={(_, pageNumber) => setPage(pageNumber)}
                />
            </div>
        </div>
    );
};
