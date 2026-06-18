export const validateEmail = (email: string): boolean => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

export const validatePhone = (phone: string): boolean => {
  // Accepte les chiffres, espaces, +, -, parenthèses (min 10 chiffres)
  const phoneRegex = /^[+]?[\s\d()-]{10,}$/;
  return phoneRegex.test(phone);
};

export const validatePassword = (password: string): boolean => {
  return password.length >= 8;
};