export const hoverTemperatureContent = {
    type: "number",
    defaultValue: "100,000",
    options: [
      "min value: 0",
      "max-value: 200000",
    ],
    functionality:
      "A non-negative float that tunes the degree of randomness in generation.",
    note: "Lower temperatures mean less random generations. See Temperature for more details.",
  };