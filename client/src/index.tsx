import React from "react";
import ReactDOM from "react-dom";
import { ECommerceRouter } from "./router/Router";
import { Provider } from "react-redux";

import {
    ApolloClient,
    InMemoryCache,
    ApolloProvider,
    createHttpLink,
} from "@apollo/client";
import { initializeStore } from "./store";

import i18n from "./i18n/i18n";
import { I18nextProvider } from "react-i18next";

const main = async () => {
    const client = new ApolloClient({
        link: createHttpLink({
            uri: `${process.env.REACT_APP_API_URL}/graphql`,
            credentials: "include",
        }),
        cache: new InMemoryCache(),
    });

    const store = initializeStore();

    ReactDOM.render(
        <React.StrictMode>
            <I18nextProvider i18n={i18n}>
                <React.Suspense fallback="Loading...">
                    <ApolloProvider client={client}>
                        <Provider store={store}>
                            <ECommerceRouter />
                        </Provider>
                    </ApolloProvider>
                </React.Suspense>
            </I18nextProvider>
        </React.StrictMode>,
        document.getElementById("root")
    );
};

main();
