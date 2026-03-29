(function applyTheme() {
  const cfg = window.AppConfig;
  const root = document.documentElement;

  // Apply font
  document.body.style.fontFamily = cfg.fontFamily || "Poppins, sans-serif";

  // Apply global background
  if (cfg.useGradient) {
    document.body.style.background = `linear-gradient(135deg, ${cfg.mainColor1}, ${cfg.mainColor2})`;
  } else {
    document.body.style.backgroundColor = cfg.backgroundColor || "#ffffff";
  }

  /* ======================
     SVG BACKGROUND OVERRIDE (ADDED)
     ====================== */
  if (cfg.backgroundSVG && cfg.backgroundSVG.useSVG === true) {
  document.body.style.backgroundImage =
    `url('${cfg.backgroundSVG.svgPath}')`;

  document.body.style.backgroundRepeat = "no-repeat";   // ❌ no loop
  document.body.style.backgroundPosition = "center";    // center align
  document.body.style.backgroundSize = "cover";         // ✅ screen fit
}
  /* ====================== */

  // Apply global text color
  document.body.style.color =
    cfg.textColor || getContrastingTextColor(cfg.backgroundColor || "#ffffff");

  // Branding
  const logo = document.getElementById("app-logo");
  const name = document.getElementById("app-name");
  if (logo) logo.src = cfg.logoUrl;
  if (name) name.textContent = cfg.appName;

  // Apply all components
  applyStyleToElement("sample-button", cfg.buttonStyle);
  applyStyleToElement("sample-card", cfg.cardStyle);
  applyStyleToElement("card-with-image", cfg.cardWithImageStyle);

  // --- Splash screen loader color ---
  const loader = document.getElementById("loader");
  if (loader) {
    if (cfg.useGradient) {
      loader.style.borderTopColor = "#ffffff";
    } else {
      loader.style.borderTopColor = cfg.mainColor1;
    }
  }

  // Set version text
  const version = document.getElementById("app-version");
  if (version) version.textContent = "v " + cfg.appVersion;

})();

function applyStyleToElement(id, styleConfig = {}) {
  const el = document.getElementById(id);
  if (!el) return;

  const cfg = window.AppConfig;
  const gradientCSS =
    `linear-gradient(135deg, ${cfg.mainColor1}, ${cfg.mainColor2})`;

  let bgColor, textColor;

  const useGradient = cfg.useGradient;
  const useGradientEffect = styleConfig.useGradientEffect;

  if (useGradient && !useGradientEffect) {
    bgColor = "#ffffff";
    textColor = "#000000";
  } else if (!useGradient && useGradientEffect) {
    bgColor = gradientCSS;
    textColor = "#ffffff";
  } else {
    bgColor = cfg.mainColor1;
    textColor = getContrastingTextColor(cfg.mainColor1);
  }

  el.style.background = bgColor;
  el.style.color = textColor;
  el.style.borderRadius = styleConfig.borderRadius || "10px";

  if (styleConfig.shadow) {
    el.style.boxShadow = "0 4px 12px rgba(0,0,0,0.15)";
  }

  if (styleConfig.border) {
    el.style.border = styleConfig.border;
  }
}

// Utility to detect light/dark background and return readable text color
function getContrastingTextColor(hexColor = "#ffffff") {
  hexColor = hexColor.replace("#", "");

  if (hexColor.length === 3) {
    hexColor = hexColor.split("").map((c) => c + c).join("");
  }

  const r = parseInt(hexColor.substr(0, 2), 16);
  const g = parseInt(hexColor.substr(2, 2), 16);
  const b = parseInt(hexColor.substr(4, 2), 16);

  const luminance = 0.299 * r + 0.587 * g + 0.114 * b;
  return luminance > 186 ? "#000000" : "#ffffff";
}
