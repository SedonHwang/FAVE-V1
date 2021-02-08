export default function (country, productName, productCnt) {
  let result;
  // DATA format
  // const arr = {
  //     "FAVE 350": {
  //         krPrice: 149000,
  //         enPrice: 130,
  //         jpPrice: 1400
  //     }
  // }
  const products = {
    "FAVE 350": {
      krPrice: 200000,
      enPrice: 200,
      jpPrice: 20000,
    },
    "FAVE 450": {
      krPrice: 200000,
      enPrice: 200,
      jpPrice: 20000,
    },
  };
  //한국, 일본, 미국포함 나머지 국가는 달러
  if (country === "대한민국") {
    result = products[productName].krPrice * productCnt;
  } else if (country === "Japan") {
    result = products[productName].jpPrice * productCnt;
  } else {
    result = products[productName].enPrice * productCnt;
  }

  return result;
}
