export const Utils = {
    auth,
    dateFix
};

function auth(user, pwd) {
    return (user === 'valentina' && pwd === 'valentina1234');
}

function dateFix(val, culture) {
    if (val) {
        if (!culture)
            culture = 'pt-BR';

        return new Date(val).toLocaleDateString(culture);
    }

    return val;
}