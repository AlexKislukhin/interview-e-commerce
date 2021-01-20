export const getLocaleFromRegion = (region: string) => {
    switch (region.toUpperCase()) {
        case "RU":
        case "UA":
        case "BY":
            return "ru";
        default:
            return "en";
    }
};
