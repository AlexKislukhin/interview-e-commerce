import "./Checkout.scss";

import { Button, Input } from "@material-ui/core";
import React, { useEffect, useRef } from "react";
import { useForm } from "react-hook-form";
import { Cart } from "../../components/Cart/Cart";
import { useSelector } from "react-redux";
import { getRegion } from "../../store/region/selectors";
import { useMutation, useQuery } from "@apollo/client";
import { CheckoutInfoQuery } from "../../queries/Checkout";
import { CheckoutInfoMutation } from "../../mutations/Checkout";
import { useTranslation } from "react-i18next";

type CheckoutFormType = {
    middlename?: string;
    firstName: string;
    lastName: string;
    phone: string;
    email: string;
};

export const CheckoutPage: React.FC = () => {
    const { t } = useTranslation();

    const { data, loading } = useQuery<{ getCheckoutInfo: CheckoutFormType }>(
        CheckoutInfoQuery
    );

    const [updateCheckoutInfo] = useMutation<
        { updateCheckoutInfo: boolean },
        CheckoutFormType
    >(CheckoutInfoMutation);

    const timerRef = useRef<ReturnType<typeof setInterval>>();

    const region = useSelector(getRegion);

    const {
        register,
        getValues,
        handleSubmit,
        reset,
    } = useForm<CheckoutFormType>({
        mode: "all",
    });

    register("middlename");

    const onSubmit = (_data: CheckoutFormType) => {
        console.log("handling data");
    };

    useEffect(() => {
        if (!loading && data && data.getCheckoutInfo) {
            reset(data.getCheckoutInfo);
        }
    }, [loading, data, reset]);

    useEffect(() => {
        timerRef.current = setInterval(() => {
            if (getValues) {
                updateCheckoutInfo({ variables: getValues() });
            }
        }, 5000);

        return () => {
            const { current } = timerRef;
            if (current) {
                clearInterval(current);
            }
        };
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        <div className="Checkout">
            <div className="Checkout__LeftContainer">
                <form
                    onSubmit={handleSubmit(onSubmit)}
                    className="Checkout__Form"
                >
                    <div className="Checkout__InputContainer">
                        <label>{t("email")}</label>
                        <br />
                        <Input
                            name="email"
                            placeholder={t("email")}
                            fullWidth
                            inputRef={register()}
                        />
                    </div>

                    <div className="Checkout__InputContainer">
                        <label>{t("phone")}</label>
                        <br />
                        <Input
                            name="phone"
                            placeholder={t("phone")}
                            fullWidth
                            inputRef={register()}
                        />
                    </div>

                    <div className="Checkout__InputContainer">
                        <label>{t("firstName")}</label>
                        <br />
                        <Input
                            name="firstName"
                            placeholder={t("firstName")}
                            fullWidth
                            inputRef={register()}
                        />
                    </div>
                    <div className="Checkout__InputContainer">
                        <label>{t("lastName")}</label>
                        <br />
                        <Input
                            name="lastName"
                            placeholder={t("lastName")}
                            fullWidth
                            inputRef={register()}
                        />
                    </div>
                    {region === "US" && (
                        <div className="Checkout__InputContainer">
                            <label>{t("middlename")}</label>
                            <br />
                            <Input
                                name="middlename"
                                placeholder={t("middleName")}
                                fullWidth
                                inputRef={register()}
                            />
                        </div>
                    )}
                    <div className="Checkout__ButtonContainer">
                        <Button
                            color="primary"
                            variant="contained"
                            type="submit"
                        >
                            {t("continue")}
                        </Button>
                    </div>
                </form>
            </div>
            <div>
                <Cart />
            </div>
        </div>
    );
};
