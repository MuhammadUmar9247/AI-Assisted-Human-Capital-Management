export const generateEmpCode = () => {
  const year = new Date().getFullYear().toString().slice(-2);
  const rand = Math.floor(1000 + Math.random() * 9000);
  return `EMP${year}${rand}`;
};
