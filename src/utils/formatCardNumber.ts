export default (input: string): string => {
  // Remove any non-numeric characters from the input string
  const cleanedInput = input.replace(/\D/g, "");

  // Initialize an empty string to store the formatted credit card number
  let formattedString = "";

  // Iterate through the cleaned input string
  for (let i = 0; i < cleanedInput.length; i++) {
    // Add a space after every 4 characters
    if (i > 0 && i % 4 === 0) {
      formattedString += " ";
    }
    // Add the current character to the formatted string
    formattedString += cleanedInput[i];
  }

  // Return the formatted credit card number
  return formattedString;
};
