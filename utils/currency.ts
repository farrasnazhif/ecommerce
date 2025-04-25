const convertIDR = (value: number) => {
  return `Rp${value.toLocaleString("id-ID", {
    maximumFractionDigits: 0,
  })}`;
};

export default convertIDR;
