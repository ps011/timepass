const yearElement = document.querySelector("#year");
const monthElement = document.querySelector("#month");
const dayElement = document.querySelector("#days");
const hourElement = document.querySelector("#hours");
const minuteElement = document.querySelector("#minutes");
const secondsElement = document.querySelector("#seconds");
const totalElement = document.querySelector("#total");
const dateElement = document.querySelector(".date");
const cards = document.querySelectorAll(".cards");

const current = new Date();
const currentDate = current.getDate();
const currentMonth = current.getMonth();
const currentYear = current.getFullYear();

let formattedDate;
let month = 0;
let date = 0;
let year = 0;

let years,
  months,
  days,
  hours,
  minutes,
  seconds = 0;

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

function setIntervaledSetValues(e: Event) {
  setInterval(() => {
    setValues(e);
  }, 1000);
  cards[0]!.classList.add("show");
  cards[1]!.classList.add("show");
}

dateElement!.addEventListener("input", setIntervaledSetValues);

function setValues(e: Event) {
  const { target } = e;
  if (target) {
    formattedDate = new Date((target as HTMLInputElement).valueAsNumber);
    month = formattedDate.getMonth();
    date = formattedDate.getDate();
    year = formattedDate.getFullYear();

    const numberOfYears = getNumberOfYears();
    const numberOfMonths = getNumberOfMonths();
    const numberOfDays = getNumberOfDays();

    const totalMonths = getTotalNumberOfMonths(numberOfMonths, numberOfYears);
    const totalDays = getTotalNumberOfDays(
      numberOfDays,
      numberOfMonths,
      numberOfYears
    );
    const totalHours = getTotalNumberOfHours(totalDays, new Date().getHours());
    const totalMinutes = getTotalNumberOfMinutes(
      totalHours,
      new Date().getMinutes()
    );
    const totalSeconds = getTotalNumberOfSeconds(
      totalMinutes,
      new Date().getSeconds()
    );

    totalElement!.innerHTML =
      "" +
      `${numberOfYears} Years, ${numberOfMonths} Months, ${numberOfDays} Days`;
    yearElement!.innerHTML = "" + numberOfYears;
    monthElement!.innerHTML = "" + totalMonths;
    dayElement!.innerHTML = "" + totalDays;
    hourElement!.innerHTML = "" + totalHours;
    minuteElement!.innerHTML = "" + totalMinutes;
    secondsElement!.innerHTML = "" + totalSeconds;
  }
}

function isLeapYear(year: number) {
  return year % 4 === 0 ? (year % 100 !== 0 ? true : year % 400 === 0) : false;
}

function getNumberOfYears(): number {
  if (currentMonth < month) {
    return currentYear - year - 1;
  } else if (currentMonth === month) {
    return currentDate >= date ? currentYear - year : currentYear - year - 1;
  } else {
    return currentYear - year;
  }
}

function getNumberOfMonths(): number {
  if (month === currentMonth) {
    return 0;
  }
  if (currentDate >= date) {
    return 12 - month + currentMonth;
  }
  return 12 - month + currentMonth - 1;
}

function getNumberOfDays(): number {
  if (currentDate >= date) {
    return currentDate - date;
  }
  return (
    currentDate +
    (monthMap[currentMonth - 1 < 0 ? 11 : currentMonth - 1] - date)
  );
}

function getTotalNumberOfMonths(months: number, years: number): number {
  return years * 12 + months;
}

function getTotalNumberOfDays(
  days: number,
  months: number,
  years: number
): number {
  for (let i = year; i < year + years; i++) {
    days += isLeapYear(i) ? 366 : 365;
  }
  for (let i = month; i < month + months; i++) {
    days += i > 11 ? monthMap[i - 12] : monthMap[i];
  }
  return days;
}

function getTotalNumberOfHours(days: number, todayHours: number) {
  return days * 24 + todayHours;
}

function getTotalNumberOfMinutes(hours: number, todayMinutes: number) {
  return hours * 60 + todayMinutes;
}

function getTotalNumberOfSeconds(minutes: number, todaySeconds: number) {
  return minutes * 60 + todaySeconds;
}
