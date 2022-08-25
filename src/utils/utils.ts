export const dateToDateString = (date: any) => {
  // return date;
  if (typeof date !== "string") return date;
  return `${date.substring(11, 13)}:${date.substring(14, 16)} ${date.substring(
    8,
    10
  )}/${date.substring(5, 7)}/${date.substring(0, 4)}`;
};

export const capitalizeFirstLetter = (str: any) => {
  if (typeof str !== "string") return;
  return (
    str.substring(0, 1).toUpperCase() +
    str.substring(1, str.length).toLowerCase()
  );
};

// export const dateToTimeComponent = (str) =>{
//     if (typeof str !== 'string') return false;
//     return{
//         year: parseInt(str.substring(0,4)),
//         month:parseInt(str.substring(5,7)),
//         date:parseInt(str.substring(8,10)),
//         hour:parseInt(str.substring(11,13)),
//         minute:parseInt(str.substring(14,16))
//     }
// }
