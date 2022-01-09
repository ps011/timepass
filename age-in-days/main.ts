const age = document.querySelector(".age");
const date = document.querySelector(".date");

const monthMap: { [index: number]: number } = {
  0: 31,
  1: 28,
  2: 31,
  3: 30,
  4: 31,
  5: 30,
  6: 31,
  7: 31,
  8: 30,
  9: 31,
  10: 30,
  11: 31,
};
date!.addEventListener("input", setAge);

function setAge(e: Event) {
  const { target } = e;
  if (target) {
    age!.innerHTML =
      "" + calculateAge((target as HTMLInputElement).valueAsNumber);
  }
}

function calculateAge(value: number): string {
  const current = new Date();
  const currentDate = current.getDate();
  const currentMonth = current.getMonth();
  const currentYear = current.getFullYear();
  const formattedDate = new Date(value);
  const month = formattedDate.getMonth();
  const date = formattedDate.getDate();
  const year = formattedDate.getFullYear();

  const numberOfYears = getNumberOfYears(
    date,
    month,
    year,
    currentDate,
    currentMonth,
    currentYear
  );

  const numberOfMonths = getNumberOfMonths(
    date,
    month,
    currentDate,
    currentMonth
  );

  const numberOfDays = getNumberOfDays(date, currentDate, currentMonth);

  const totalDays = getTotalNumberOfDays(
    numberOfDays,
    numberOfMonths,
    numberOfYears,
    year,
    month
  );

  return `${numberOfYears} Years, ${numberOfMonths} Months, ${numberOfDays} Days <br/> Total Days: ${totalDays}`;
}

function isLeapYear(year: number) {
  return year % 4 === 0 ? (year % 100 !== 0 ? true : year % 400 === 0) : false;
}

function getNumberOfYears(
  date: number,
  month: number,
  year: number,
  currentDate: number,
  currentMonth: number,
  currentYear: number
): number {
  if (currentMonth < month) {
    return currentYear - year - 1;
  } else if (currentMonth === month) {
    return currentDate >= date ? currentYear - year : currentYear - year - 1;
  } else {
    return currentYear - year;
  }
}

function getNumberOfMonths(
  date: number,
  month: number,
  currentDate: number,
  currentMonth: number
): number {
  if (month === currentMonth) {
    return 0;
  }
  if (currentDate >= date) {
    return 12 - month + currentMonth;
  }
  return 12 - month + currentMonth - 1;
}

function getNumberOfDays(
  date: number,
  currentDate: number,
  currentMonth: number
): number {
  if (currentDate >= date) {
    return currentDate - date;
  }
  return (
    currentDate +
    (monthMap[currentMonth - 1 < 0 ? 11 : currentMonth - 1] - date)
  );
}

function getTotalNumberOfDays(
  days: number,
  months: number,
  years: number,
  year: number,
  month: number
): number {
  for (let i = year; i < year + years; i++) {
    days += isLeapYear(i) ? 366 : 365;
  }
  for (let i = month; i < month + months; i++) {
    days += i > 11 ? monthMap[i - 12] : monthMap[i];
  }
  return days;
}
