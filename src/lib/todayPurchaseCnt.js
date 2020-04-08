export default function todayPurchaseCnt(number) {
  // 데이터 형태 000041
  number = String(number);
  const arr = [0, 0, 0, 0, 0, 0];
  for (let i = 0; i < number.length; i++) {
    arr[i] = number[number.length - 1 - i];
  }
  return arr.reverse().join("");
}
