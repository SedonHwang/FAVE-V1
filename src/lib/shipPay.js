export default function (country, color1, color2) {
  let shipPay;

  // 거리에 따라서 나라 구분함
  const farCountries = ["Australia"];
  const aLittleFarCountries = ["USA", "Israel", "Germany", "Canada"];
  const nearbyCountries = ["China", "Taiwan", "HongKong", "Japan"];

  color1 = color1 ? color1 : 0;
  color2 = color2 ? color2 : 0;

  // 거리에 따라서 배송비 달라짐
  if (country === "대한민국") {
    shipPay = 0;
  } else if (farCountries.includes(country)) {
    shipPay = 45;
  } else if (aLittleFarCountries.includes(country)) {
    shipPay = 35;
  } else if (nearbyCountries.includes(country)) {
    shipPay = 25;
  } else {
    shipPay = 55;
  }
  return shipPay * Number(color1) + shipPay * Number(color2);
}
