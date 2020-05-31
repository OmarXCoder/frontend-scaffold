const Handlebars = require("handlebars");

Handlebars.registerHelper("math", function(lvalue, operator, rvalue, options) {
    lvalue = parseFloat(lvalue);
    rvalue = parseFloat(rvalue);

    return {
        "+": lvalue + rvalue,
        "-": lvalue - rvalue,
        "*": lvalue * rvalue,
        "/": lvalue / rvalue,
        "%": lvalue % rvalue,
    }[operator];
});

Handlebars.registerHelper("loud", function(aString) {
    return aString.toUpperCase();
});

Handlebars.registerHelper("format_price", function(price) {
    return `$${price}.00`;
});

Handlebars.registerHelper("percentage", function(value, total, options) {
    if (isNaN(value) || isNaN(total)) {
        return 0;
    }

    if (total == 0) {
        return 0;
    }

    return Math.round((value / total) * 100);
});

Handlebars.registerHelper("instock_percentage", function(qty, sold, options) {
    if (isNaN(qty) || isNaN(sold)) {
        return 100;
    }

    if (qty == 0) {
        return 0;
    }

    return Math.round(((qty - sold) / qty) * 100);
});
