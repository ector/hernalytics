const startYear = 1960;
const currentYear = new Date().getFullYear();
const endYear = currentYear + 1;

const years: number[] = [];
for (let year = startYear; year <= endYear; year++) {
  years.push(year);
}

export default years
