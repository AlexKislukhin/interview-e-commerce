export type Product = {
    _id: string;
    title: string;
    image: string;
    price: string;
};

export type GeolocationResponse = {
    country_code: string;
    country_name: string;
    city: string;
    postal: string;
    latitude: number;
    longitude: number;
    IPv4: string;
    state: string;
};

export type CartItem = Product & {
    __typename: "CartIItemClass";
    id: string;
    quantity: number;
};
