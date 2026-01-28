import type { Config } from "tailwindcss";

const config: Config = {
    content: [
        "./pages/**/*.{js,ts,jsx,tsx,mdx}",
        "./components/**/*.{js,ts,jsx,tsx,mdx}",
        "./app/**/*.{js,ts,jsx,tsx,mdx}",
    ],
    theme: {
        extend: {
            colors: {
                background: "var(--background)",
                foreground: "var(--foreground)",
                primary: {
                    DEFAULT: "var(--primary)",
                    light: "var(--primary-light)",
                    dark: "var(--primary-dark)",
                },
                secondary: "var(--secondary)",
                accent: "var(--accent)",
                muted: "var(--muted)",
                border: "var(--border)",
                card: "var(--card)",
                "card-foreground": "var(--card-foreground)",
            },
            fontFamily: {
                sans: ["var(--font-sans)", "sans-serif"],
                arabic: ["var(--font-arabic)", "serif"],
            },
            borderRadius: {
                sm: "var(--radius-sm)",
                md: "var(--radius-md)",
                lg: "var(--radius-lg)",
                xl: "var(--radius-xl)",
                "2xl": "var(--radius-2xl)",
                "3xl": "var(--radius-3xl)",
            },
        },
    },
    plugins: [],
};
export default config;
