const capitalize = (string) => {
  let firstLetter = string.charAt(0);
  let restChar = string.slice(1, string.length);
  return firstLetter + restChar;
};

export default {
  capitalize: capitalize,
};
