function pay(payName, data) {
    switch (payName) {
        case 'buyCoinToPay':
            alert(JSON.stringify(navigator));
            navigator.maiguoer.buyCoinToPay(JSON.stringify(data));
            break;
    }
}
function back(backName, data) {
    switch (backName) {
        case 'goBack':
            navigator.maiguoer.goBack();
            break;
        case 'goApp':
            navigator.maiguoer.goApp();
            break;
    }
}
