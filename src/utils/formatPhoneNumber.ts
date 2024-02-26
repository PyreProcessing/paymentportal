export default (phoneNumber: string) => {
  const inputValue = phoneNumber.replace(/\D/g, ""); // Remove non-numeric characters

  let formattedNumber = "";
  if (inputValue.length > 0) {
    formattedNumber = `(${inputValue.substring(0, 3)})`;
    if (inputValue.length > 3) {
      formattedNumber += `-${inputValue.substring(3, 6)}`;
    }
    if (inputValue.length > 6) {
      formattedNumber += `-${inputValue.substring(6, 10)}`;
    }
  }

  return formattedNumber;
};
