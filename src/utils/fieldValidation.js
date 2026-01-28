export function fieldValidation(field, value) {
  const validateField = (field, value) => {
    switch (field) {
      case 'firstName':
        if (!value) {
          return 'required';
        }
        if (value.length < 3) {
          return 'at least 3 characters';
        }
        break;
      case 'lastName':
        if (!value) {
          return 'required';
        }
        break;
      case 'email':
        if (!value) {
          return 'required';
        }
        const emailRegex =
          /(?<!\S)[A-Za-z]+(\.|-|_)?[A-Za-z]+@[A-Z-a-z]+\.[A-Z-a-z]+(\.[A-Z-a-z]*\.?)?\b/;
        if (!emailRegex.test(value)) {
          return 'invalid address';
        }
        break;
      default:
        return '';
    }
  };

  return validateField(field, value);
}
