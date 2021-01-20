export const getLocale = (region: string) => {
    switch (region.toUpperCase()) {
        case "DE":
            return "de";
        case "RU":
            return "ru";
        default:
            return "en";
    }
};
