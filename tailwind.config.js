export default {
    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
        extend: {
            colors: {
                primary: {
                    light: "#101910" //black
                },
                secondary: {
                    light: "#e9f1e9" //light green
                },
                background: {
                    light: {
                        primary: "#f9fbf9", //white
                        secondary: "#e9f1e9" //light green
                    },
                },
                text: {
                    primary: {
                        light: "#101910" //black
                    },
                    secondary: {
                        light: "#5a8c5a" //semi light green
                    }
                }
            }
        },
    },
    plugins: [],
}