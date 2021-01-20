import { Request, Response } from "express";

export interface CartItem {
    id: string;
    quantity: number;
}

export interface CheckoutFields {
    firstName?: string;
    lastName?: string;
    middlename?: string;
    phone?: string;
    email?: string;
}

export type MyContext = {
    req: Request & {
        test: string;
        session: Express.Session & {
            cart?: CartItem[];
            checkout?: CheckoutFields;
            test?: number;
        };
    };
    res: Response;
};
