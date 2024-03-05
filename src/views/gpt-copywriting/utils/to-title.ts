export function toTitle(role_no: number, isProd: boolean) {
  switch (role_no) {
    // ** Description
    case 1:
      return isProd ? "Existing Product" : "Generate A New Product";

    // ** SEO
    case 2:
      return isProd ? "Generate From An Existing" : "Generate From Description";

    // ** Translate
    case 3:
      return isProd ? "Translate An Existing Product" : "Translate Description";

    // ** Assistant
    case 0:
      return "AI Assistant";
    default:
      return "";
  }
}
