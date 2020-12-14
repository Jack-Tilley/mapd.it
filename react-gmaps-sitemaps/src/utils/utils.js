import moment from "moment";
export const formatTime = (datetime) => {
  //   const time = new Date(datetime);
  return moment(new Date(datetime)).calendar();
};
