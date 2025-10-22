export const generateOrderNumber = () => {
  // const today = new Date();
  // const datePart = today.toISOString().slice(0, 10).replace(/-/g, "");
  const randomPart = Math.floor(100000 + Math.random() * 900000);
  return `#${randomPart}`;
};
