const age = document.querySelector(".age");
const date = document.querySelector(".date");

const monthMap: Record<number, number> = {
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
function calculateAge(value: number) {
  let days = 0;

  const current = new Date();
  const currentDate = current.getDate();
  const currentMonth = current.getMonth();
  const currentYear = current.getFullYear();
  const formattedDate = new Date(value);
  const month = formattedDate.getMonth();
  const date = formattedDate.getDate();
  const year = formattedDate.getFullYear();
  const includeCurrentYear =
    currentMonth > month && currentDate > date && currentYear > year;
  const conditionYear = includeCurrentYear ? currentYear : currentYear - 1;
  for (let i = year; i <= conditionYear; i++) {
    days += 365;
    if (isLeapYear(year)) {
      days += 1;
    }
  }

  if (includeCurrentYear) {
    for (let i = month; i < currentMonth; i++) {
      days += monthMap[i];
    }
    days -= monthMap[month] - date;
    days += currentDate;
  } else {
    //FIXME
    for (let i = month; i < 12; i++) {
      days += monthMap[i];
    }
    for (let i = 0; i < currentMonth; i++) {
      days += monthMap[i];
    }
    days += date;
  }
  return days;
}

function isLeapYear(year: number) {
  return year % 4 === 0 ? (year % 100 !== 0 ? true : year % 400 === 0) : false;
}

calculateAge(1636848525891);
