export default (price: any, taxRate: any) => {
  return (Number(price) * (Number(taxRate) / 100)).toFixed(2);
};
