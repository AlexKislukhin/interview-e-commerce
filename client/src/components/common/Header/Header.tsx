import React from "react";
import { useTranslation } from "react-i18next";
import cn from "classnames";

import "./Header.scss";
import { Link } from "react-router-dom";

export const Header: React.FC = () => {
    const { t, i18n } = useTranslation();

    return (
        <div className="Header">
            <nav>
                <ul className="Header__List">
                    <li>
                        <span
                            className={cn({
                                Header__Language: true,
                                "Header__Language--selected":
                                    i18n.language === "en",
                            })}
                            onClick={() => i18n.changeLanguage("en")}
                        >
                            EN
                        </span>{" "}
                        |{" "}
                        <span
                            className={cn({
                                Header__Language: true,
                                "Header__Language--selected":
                                    i18n.language === "ru",
                            })}
                            onClick={() => i18n.changeLanguage("ru")}
                        >
                            RU
                        </span>
                    </li>
                    <li>
                        <Link to="/">
                            <span className="Header__Logo">Medity</span>
                        </Link>
                    </li>
                    <li>
                        <Link to="/checkout">{t("proceedToCheckout")}</Link>
                    </li>
                </ul>
            </nav>
        </div>
    );
};
