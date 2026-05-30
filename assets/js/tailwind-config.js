tailwind.config = {
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        "surface": "#121414", "surface-dim": "#121414", "surface-bright": "#37393a",
        "surface-container-lowest": "#0c0f0f", "surface-container-low": "#1a1c1c",
        "surface-container": "#1e2020", "surface-container-high": "#282a2b",
        "surface-container-highest": "#333535", "on-surface": "#e2e2e2",
        "on-surface-variant": "#c4c9ac", "outline": "#8e9379", "outline-variant": "#444933",
        "primary": "#c3f400", "on-primary": "#283500", "primary-container": "#c3f400",
        "on-primary-container": "#556d00", "secondary": "#ffb59f",
        "secondary-container": "#ff571c", "on-secondary-container": "#531300",
        "error": "#ffb4ab", "error-container": "#93000a", "on-error-container": "#ffdad6"
      },
      borderRadius: { DEFAULT: "0px", lg: "0px", xl: "0px", full: "9999px" },
      spacing: { xs: "4px", unit: "4px", sm: "8px", xl: "64px", lg: "32px", gutter: "24px", margin: "40px", md: "16px" },
      fontFamily: { mono: ["JetBrains Mono", "monospace"] },
      fontSize: {
        "display-lg": ["72px", { lineHeight: "1.0", letterSpacing: "-0.04em", fontWeight: "800" }],
        "headline-xl": ["48px", { lineHeight: "1.1", letterSpacing: "-0.02em", fontWeight: "700" }],
        "headline-md": ["24px", { lineHeight: "1.2", letterSpacing: "0em", fontWeight: "700" }],
        "body-lg": ["18px", { lineHeight: "1.6", letterSpacing: "0em", fontWeight: "400" }],
        "body-sm": ["14px", { lineHeight: "1.5", letterSpacing: "0.02em", fontWeight: "400" }],
        "label-mono": ["12px", { lineHeight: "1.0", letterSpacing: "0.1em", fontWeight: "700" }],
        "code-snippet": ["14px", { lineHeight: "1.4", letterSpacing: "0em", fontWeight: "400" }]
      }
    }
  }
};
