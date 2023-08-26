import moment from "moment";
import { timeFormatter } from "./tools";

export const downloadFile = (data_items) => {
  const GAMES = [
    {
      label: "Birthday Candle Counting",
      value: 1,
    },
    {
      label: "Connect the number",
      value: 2,
    },

    {
      label: "Math Symbol",
      value: 3,
    },
    {
      label: "Bubble Game",
      value: 4,
    },
    {
      label: "Balloon Game",
      value: 5,
    },
    {
      label: "Owl Game",
      value: 6,
    },
    {
      label: "Object Number Recognition ",
      value: 7,
    },
    {
      label: "Balance the cups",
      value: 9,
    },
    {
      label: "Multi Pobble Game",
      value: 10,
    },
    {
      label: "Charting Treasure",
      value: 11,
    },
  ];

  let newArr = null;
  newArr = data_items.map(
    ({ game_title, name, createdAt, points, duration }) => {
      return {
        TimeStamp: moment(createdAt).format("MMM DD, YYYY hh:mm:ss A"),
        Name: name,
        "Game Title": GAMES.filter((g) => g?.value == game_title)[0]?.label,
        Points: points,
        Duration: timeFormatter(duration),
      };
    }
  );

  var myFile = `${data_items[0]?.name}_${moment().format(
    "YYYY-MM-DD hh:mm:ss"
  )}.xlsx`;
  var myWorkSheet = XLSX.utils.json_to_sheet(newArr);
  var myWorkBook = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(myWorkBook, myWorkSheet, "myWorkSheet");
  XLSX.writeFile(myWorkBook, myFile);
};