export const validatePassport = (value: string) => {
  var re = /^[A-Z][0-9]{7}$/i;
  return re.test(value);
};

export const validateCMND = (value: string) => {
  var re = /^([0-9]{9})$/i;

  return re.test(value);
};

export const validateCCCD = (value: string) => {
  var re = /^([0-9]{12})$/i;
  return re.test(value);
};

export const validatePhone = (phone: string) => {
  var re = /^(0[9|3|7|8|5]([0-9]{8}))$/i;
  return re.test(phone);
};

export const validateEmail = (mail: string) => {
  const re = /^([^, \n]*)@[a-zA-Z\-0-9]+(\.[a-zA-Z]{2,})+$/;
  return re.test(mail);
};
