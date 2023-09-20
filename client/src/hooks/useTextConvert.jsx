const useTextConvert = () => {
  function capitalize(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }
  function calculateAge(dateOfBirth) {
    const dob = new Date(dateOfBirth);
    const currentDate = new Date();

    // Calculate the difference in milliseconds
    const ageInMilliseconds = currentDate - dob;

    // Convert milliseconds to years
    const ageInYears = ageInMilliseconds / (365 * 24 * 60 * 60 * 1000);

    // Round down to the nearest whole number to get the age
    const age = Math.floor(ageInYears);

    return age;
  }
  return {
    capitalize,
    calculateAge,
  };
};

export default useTextConvert;
