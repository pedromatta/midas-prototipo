import defineConfig from "tailwindcss";

export default defineConfig({
  theme: {
    extend: {
      colors: {
        // Base
        background: "var(--color-bg-light)",
        foreground: "var(--color-bg-dark)",

        // Semantic
        accent: "var(--color-accent)",
        secondary: "var(--color-text-secondary)",
        success: "var(--color-success)",
        alert: "var(--color-alert)",

        // Income
        income: {
          teal: {
            dark: "var(--color-income-teal-dark)",
            medium: "var(--color-income-teal-medium)",
            light: "var(--color-income-teal-light)",
          },
          cyan: {
            dark: "var(--color-income-cyan-dark)",
            medium: "var(--color-income-cyan-medium)",
          },
        },

        // Expense
        expense: {
          mauve: {
            dark: "var(--color-expense-mauve-dark)",
            medium: "var(--color-expense-mauve-medium)",
            light: "var(--color-expense-mauve-light)",
          },
          mustard: {
            dark: "var(--color-expense-mustard-dark)",
            light: "var(--color-expense-mustard-light)",
          },
          secondary: "var(--color-expense-secondary)",
        },

        // Investment
        investment: {
          gray: {
            dark: "var(--color-investment-gray-dark)",
            light: "var(--color-investment-gray-light)",
          },
          olive: {
            dark: "var(--color-investment-olive-dark)",
            medium: "var(--color-investment-olive-medium)",
          },
          sage: "var(--color-investment-sage)",
        },
      },
    },
  },
});
