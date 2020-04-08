export default function hideInfo(info) {
  const strInfo = String(info);
  const strLen = strInfo.length;
  const halfLen = Math.floor(strLen / 2);
  const star = "*";
  let newStr;
  if (strLen < 2) {
    newStr = strInfo;
  } else {
    newStr = strInfo.replace(strInfo.slice(halfLen * -1), star.repeat(halfLen));
  }
  return newStr;
}
