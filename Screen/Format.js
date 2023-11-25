export const formatPrice = priceSP => {
  const formatter = new Intl.NumberFormat('vi-VN', {
    style: 'currency',
    currency: 'VND',
    currencyDisplay: 'symbol', // Để hiển thị ký hiệu đứng trước số
  });
  return `₫${priceSP.toLocaleString('vi-VN')}`;
};
export const formatSoldSP = value => {
  if (value >= 1000000) {
    return `${(value / 1000000).toFixed(1)}M`; // Đơn vị "M" cho giá trị lớn hơn hoặc bằng 1,000,000
  } else if (value >= 1000) {
    return `${(value / 1000).toFixed(1)}k`; // Đơn vị "k" cho giá trị lớn hơn hoặc bằng 1,000
  } else {
    return value; // Giữ nguyên giá trị nếu nhỏ hơn 1,000
  }
};
