import Purchaselist from "../models/purchaseLists";
import divisionAlph from "../lib/divisionAlph";
import todayPurchaseCnt from "../lib/todayPurchaseCnt";

export default async function () {
  // 포맷 200326-ASD-000001
  const now = new Date();
  const startOfToday = new Date(
    now.getFullYear(),
    now.getMonth(),
    now.getDate()
  );
  const infoDate = `${String(now.getFullYear()).slice(2)}${
    now.getMonth() < 11 ? `0${now.getMonth() + 1}` : `${now.getMonth() + 1}`
  }${now.getDate() < 10 ? `0${now.getDate()}` : `${now.getDate()}`}`;
  try {
    const todayPurchaseList = await Purchaselist.find({
      createdAt: {
        $gte: new Date(startOfToday),
      },
    });
    const result = `${infoDate}-${divisionAlph()}-${todayPurchaseCnt(
      todayPurchaseList.length + 1
    )}`;
    return result;
  } catch (e) {
    console.log(e);
    return null;
  }
}
