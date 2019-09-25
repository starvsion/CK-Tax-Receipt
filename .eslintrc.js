module.exports = {
    root: true,
    env: {
        browser: true,
        node: true
    },
    parserOptions: {
        parser: "babel-eslint"
    },
    extends: [
        "@nuxtjs",
        "plugin:nuxt/recommended"
    ],
    // add your custom rules here
    rules: {
        "camelcase": [0, {
            "properties": "always"
        }],
        "vue/html-indent": [0, 4],
        "comma-dangle": [2, {
            "arrays": "always-multiline",
            "objects": "always-multiline",
            "imports": "never",
            "exports": "never",
            "functions": "never"
        }],
        "comma-spacing": [2, {
            "before": false,
            "after": true
        }],
        "comma-style": [2, "last"],
        "eqeqeq": ["error", "always", { "null": "ignore" }],
        "key-spacing": [2, {
            "beforeColon": false,
            "afterColon": true
        }],
        "keyword-spacing": [2, {
            "before": true,
            "after": true
        }],
        "semi": [2, "always"],
        "semi-spacing": [2, {
            "before": false,
            "after": true
        }],
        "quotes": [2, "double", {
            "avoidEscape": true,
            "allowTemplateLiterals": true
        }],
        "jsx-quotes": [2, "prefer-double"],
        "indent": ["error", 4, {
            "SwitchCase": 1
        }],
        "standard/array-bracket-even-spacing": 0,
        "require-await": "off",
        "no-unused-expressions" : "off",
    }
};
