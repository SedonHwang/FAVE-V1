export default function numberUnComma(x) {
  let str = String(x);
  return str.replace(/[^\d]+/g, "");
}
