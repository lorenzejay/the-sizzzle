const convertDate = (date) => {
  const month = new Date(date).getMonth();
  const day = new Date(date).getDate();
  const year = new Date(date).getFullYear();

  return `${month}/${day}/${year} `;
};

export default convertDate;
