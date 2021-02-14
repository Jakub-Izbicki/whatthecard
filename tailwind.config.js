module.exports = {
    theme: {
        extend: {
            boxShadow: {
                card: "0 5px 10px 0 #363636",
                "card-correct": "0 0 2px 5px #00bf29",
                "card-incorrect": "0 0 2px 5px #d40000"
            },
            colors: {
                dark: "#363636"
            },
            fontFamily: {
                'fancy': ['FancyFont', 'Avenir', 'Helvetica', 'Arial', 'sans-serif'],
            },
            margin: {
                "squashed": "-110%"
            },
            width: {
                "question": "24rem",
                "mobileQuestion": "90vw"
            },
            height: {
                "question": "33.5rem",
                "mobileQuestion": "126vw",
            }
        }
    },
    variants: {},
    plugins: []
}
