// config.js

window.AppConfig = {
  // 🏷️ Branding
  appName: "Jio Calci",
  appVersion: "1",
  logoUrl: "assets/logo.png",

  // 🎨 Theme Colors
  useGradient: true,
  mainColor1: "rgb(3, 121, 255)",
  mainColor2: "rgb(4, 210, 247)",
  backgroundColor: "#ffffff",
  textColor: "#333333",

  // 🅰️ Font
  fontFamily: "'Poppins', sans-serif",

  // 🔘 Button Design
  buttonStyle: {
    useGradientEffect: false,
    borderRadius: "12px",
    shadow: true
  },

  // 🗂 Card Design
  cardStyle: {
    useGradientEffect: false,
    borderRadius: "16px",
    border: "1px solid #e0e0e0",
    shadow: true
  },

  // 🖼 Card with Image Design
  cardWithImageStyle: {
    useGradientEffect: false,
    imagePosition: "top",
    borderRadius: "12px",
    shadow: true
  },

  /* ======================
     BACKGROUND SVG CONFIG
     ====================== */
  backgroundSVG: {
    useSVG: true,              // true = SVG background ON
    svgPath: "assets/bg.svg",  // common for all pages
    repeat: true              // future safe option
  },

  showHeader: true,
  showFooter: true,
  debug: false
};
window.AppUtils = window.AppUtils || {};

// Encrypt mobile → userid
window.AppUtils.encryptMobile = function (mobile) {
  const map = ['O','P','Q','R','S','T','U','V','W','X'];

  const multiplier =
    mobile[9] === '0' ? 7 : parseInt(mobile[9], 10);

  const multiplied =
    BigInt(mobile) * BigInt(multiplier);

  let result = '';
  for (let digit of multiplied.toString()) {
    result += map[parseInt(digit, 10)];
  }

  result += map[multiplier];
  return result;
};

// Decrypt userid → mobile
window.AppUtils.decryptMobile = function (enc) {
  const map = { O:0, P:1, Q:2, R:3, S:4, T:5, U:6, V:7, W:8, X:9 };

  const multiplier = map[enc.slice(-1)];
  const nums = enc
    .slice(0, -1)
    .split('')
    .map(l => map[l])
    .join('');

  const original =
    BigInt(nums) / BigInt(multiplier);

  return original.toString().padStart(10, '0');
};
