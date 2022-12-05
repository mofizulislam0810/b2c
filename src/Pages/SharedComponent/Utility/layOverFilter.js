import moment from "moment";

const layOverFilter = (durationOne, durationTwo) => {
  var ms = moment(durationOne, "YYYY/MM/DD HH:mm:ss a").diff(
    moment(durationTwo, "YYYY/MM/DD HH:mm:ss a")
  );
  var hours = Math.floor((ms / (1000 * 60 * 60)) % 24);
  const time = hours;
  return time;
};

export default layOverFilter;
