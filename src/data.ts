import jsonData from "./json.json";
console.log(jsonData, "jsonData");
const date = new Date();
const year = date.getFullYear();
const month = date.getMonth() + 1;
function mGetDate() {
  const d = new Date(year, month, 0);
  return d.getDate();
}
const dayNum = mGetDate();

const weekList = [
  "星期日",
  "星期一",
  "星期二",
  "星期三",
  "星期四",
  "星期五",
  "星期六",
];
const names: string[] = [];
jsonData.forEach((item: any) => {
  if (!names.includes(item["姓名"])) {
    names.push(item["姓名"]);
  }
});
console.log(names, "names");
const arr: any = [];
export const days: any = [];
for (let day = 0; day < dayNum; day++) {
  const dateText = `${year}/${month}/${day + 1}`;
  days.push({
    date: `${month}月${day + 1}日`,
    dateText: dateText,
    week: weekList[new Date(dateText).getDay()],
    签到时间: "-",
    签退时间: "-",
  });
}

names.forEach((name) => {
  arr.push({
    name: name,
    data: days,
  });
});

arr.forEach((item: any) => {
  item.data.forEach((item2: any) => {
    for (let index = 0; index < jsonData.length; index++) {
      if (
        item.name === jsonData[index]["姓名"] &&
        item2.dateText === jsonData[index]["日期"]
      ) {
        item2["签到时间"] = jsonData[index]["签到时间"] || "-";
        item2["签退时间"] = jsonData[index]["签退时间"] || "-";
        break;
      }
    }
  });
});
export default arr;
