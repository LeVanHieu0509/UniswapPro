export const convertKeyCart = (cartObj) => {
  return Object.keys(cartObj).map(function (k) {
    const num = k.split("-");
    return `Đã tạo đơn`;
  });
};

export const getKeyCart = (cartObj) => {
  return Object.keys(cartObj).map(function (k) {
    return k;
  })[0];
};
