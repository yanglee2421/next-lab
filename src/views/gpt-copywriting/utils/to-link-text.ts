export function tolinkText(role_no: number, isProd: boolean) {
  switch (role_no) {
    // product description
    case 1:
      return isProd
        ? "Generate From Description"
        : "Polish An Existing Product";

    // SEO
    case 2:
      return isProd
        ? "Generate From Description"
        : "Generate from An Existing Product";

    // Translate
    case 3:
      return isProd ? "Translate Description" : "Translate An Existing Product";
    default:
      return "";
  }
}
