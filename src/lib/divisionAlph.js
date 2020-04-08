export default function () {
  // 데이터 형태 "ASD"
  let divisionAlph = "";
  const possibleAlph = "ABCDEFGHIJKLNMOPQRSTUVWXYZ";
  for (let i = 0; i < 3; i++) {
    divisionAlph +=
      possibleAlph[Math.floor(Math.random() * possibleAlph.length)];
  }
  return divisionAlph;
}
