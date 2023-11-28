export const formatPrice = priceSP => {
  if (typeof priceSP !== 'number' || isNaN(priceSP)) {
    // Handle the case where priceSP is not a valid number
    return 'Invalid Price';
  }

  const formatter = new Intl.NumberFormat('vi-VN', {
    style: 'currency',
    currency: 'VND',
    currencyDisplay: 'symbol',
  });

  return formatter.format(priceSP);
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

import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
