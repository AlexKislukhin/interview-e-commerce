import React, { useEffect } from "react";
import "../styles/main.scss";
import { useDispatch, useSelector } from "react-redux";
import { Route, HashRouter as Router, Switch } from "react-router-dom";
import { ProductList } from "../pages/ProductList/ProductList";
import { setLocale } from "../store/locale/actions";
import { getLocale } from "../store/locale/selectors";
import { setRegion } from "../store/region/actions";
import { getRegion } from "../store/region/selectors";
import { GeolocationResponse } from "../types";
import { getLocaleFromRegion } from "../utils/getLocaleFromRegion";
import { CheckoutPage } from "../pages/Checkout/CheckoutPage";
import { Header } from "../components/common/Header/Header";
import { useTranslation } from "react-i18next";

export const ECommerceRouter: React.FC = () => {
    const dispatch = useDispatch();
    const region = useSelector(getRegion);
    const locale = useSelector(getLocale);

    const { i18n } = useTranslation();

    useEffect(() => {
        const load = async () => {
            const response = await fetch(`http://geolocation-db.com/json/`);
            const json: GeolocationResponse = await response.json();

            dispatch(setRegion(json.country_code));
        };

        load();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    useEffect(() => {
        localStorage.setItem("locale", i18n.language);
    }, [i18n.language]);

    useEffect(() => {
        if (region && !locale) {
            dispatch(setLocale(getLocaleFromRegion(region)));
        }
    }, [dispatch, locale, region]);

    return (
        <Router>
            <Header />
            <div style={{ marginBottom: "60px" }}></div>
            <Switch>
                <Route exact path="/" component={ProductList} />
                <Route exact path="/checkout" component={CheckoutPage} />
            </Switch>
        </Router>
    );
};
