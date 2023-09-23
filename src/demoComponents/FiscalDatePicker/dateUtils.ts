import { addDays, subDays } from 'date-fns'

// export type ParsedDate = {
//     dayOfTheMonth: number,
//     monthNumber: number,
//     dayOfTheWeekIndex: number
// }

// const getMonthNumber = (date: Date) => {
//     return date.getMonth() + 1
// }

// const getYearNumber = (date: Date) => {
//     return date.getFullYear()
// }

// const getNumWeeksInYear = (year: number) => {
//     return Math.max(
//         (new Date(year, 11, 31)).getMilliseconds()
//         , (new Date(year, 11, 31-7)).getMilliseconds()
//     ) / 604800000;
// }

// export const fiscalDateHandlers = (date: Date) => {
//     return {
//         dayOfTheMonth: date.getDate(),
//         dayOfTheWeekIndex: date.getDay(),
//         monthNumber: getMonthNumber(date)
//     }
// }

// export const getFirstDateOfFirstWeekOfFiscalYear = (date: Date) => {
//     const currentYear = getYearNumber(date)
//     const firstDateOfFiscalYear = new Date(currentYear, 1)
//     const firstDateOfFirstWeekOfFiscalYear = subDays(firstDateOfFiscalYear, firstDateOfFiscalYear.getDay())
//     return firstDateOfFirstWeekOfFiscalYear
// }

// export const calcNumberOfDaysFromStartOfFiscalYear = (endDate: Date) => {
//     const firstDateOfFirstWeekTimestamp = getFirstDateOfFirstWeekOfFiscalYear(new Date()).getTime()
//     const endDateTimestamp = endDate.getTime()
//     return Math.round((endDateTimestamp - firstDateOfFirstWeekTimestamp) / (1000 * 60 * 60 * 24))
// }

// export const getFiscalWeekIndexForDate = (date: Date) => {
//     const numberOfDaysSinceFirstDayOfFirstWeekOfFiscalYear = calcNumberOfDaysFromStartOfFiscalYear(date)
//     return Math.floor(numberOfDaysSinceFirstDayOfFirstWeekOfFiscalYear / 7)
// }

// export const getDateForSundayOfFiscalWeekFromFiscalWeekIndex = (fiscalWeekIndex: number) => {
//     return addDays(getFirstDateOfFirstWeekOfFiscalYear(new Date()), fiscalWeekIndex * 7)
// }

// export const monthsWith5Weeks = ["March", 'June', 'September', 'December']
// // based off of index 0 = Feb
// export const monthsIndexWith5Weeks = [1, 4, 7, 10]
// export const monthsWithWeekNumbers = [
//     {month: "February", monthIndex: 0, firstWeekIndex: 0},
//     {month: "March", monthIndex: 1, firstWeekIndex: 4},
//     {month: "April", monthIndex: 2, firstWeekIndex: 8},
//     {month: "May", monthIndex: 3, firstWeekIndex: 0},
//     {month: "June", monthIndex: 4, firstWeekIndex: 0},
//     {month: "July", monthIndex: 5, firstWeekIndex: 0},
//     {month: "August", monthIndex: 6, firstWeekIndex: 0},
//     {month: "September", monthIndex: 7, firstWeekIndex: 0},
//     {month: "October", monthIndex: 8, firstWeekIndex: 0},
//     {month: "November", monthIndex: 9, firstWeekIndex: 0},
//     {month: "December", monthIndex: 10, firstWeekIndex: 0},
//     {month: "January", monthIndex: 11, firstWeekIndex: 0},
// ]

// // todo - find if there is 53 weeks in year
// // 4 or more days left in January that would fall next fiscal year week 1
// // https://nrf.com/resources/4-5-4-calendar#:~:text=This%20occurs%20approximately%20every%20five,are%20all%2053%2Dweek%20years.
// // check first day of fiscal week

// // first week of fiscal year really defined by when there are more days in january of the '1st first month week for Feb'

// // distance between 1st day of feb and 1st day of that week >= 4 , 5 week January
// // if true, fiscal year 1st week for the following year starts the first full week in February

// export const getFirstWeekAndLastWeekIndexOfFiscalMonth = (monthIndex: number, year: number) => {

//     // leep - 08, 12, 16, 20, 24, 28
//     // has 53 - 11, 16, 22, 28, 33, 39, 44, 50, 56, 61, 67, 72, 78, 84, 89, 95, 101, 107, 112, 118
//     // feb = 0-3
//     // march = 4-8
//     // april = 9-12
//     // may = 13-16
//     // june = 17-21
//     // july = 22-25
//     // august = 26-29
//     // sept = 30-34
//     // oct = 35-38
//     // nov = 39-42
//     // dec = 43-47
//     // jan = 48-51 or 52

//     console.log("getNumWeeksInYear(year)", getNumWeeksInYear(year))
//     if (monthsIndexWith5Weeks.indexOf(monthIndex) >= 0) {
//         // return 5 weeks
//     } else {
//         // return 4 weeks
//     }
// }

export const isFiscalYear53Weeks = (currentYear: number) => {
    const firstDayOfFebNextYear = new Date(currentYear + 1, 1, 1).getDay()
    console.log(firstDayOfFebNextYear)

    return (firstDayOfFebNextYear === 5 || firstDayOfFebNextYear === 6) ? true : false
}

export const calcFirstDayOfFiscalYear = (currentYear: number) => {

    if (isFiscalYear53Weeks(currentYear)) {
        const jan31OfPrevYear = new Date(currentYear - 1, 0, 31)
        const dayIndexOfJan31ofPrevYear = jan31OfPrevYear.getDay()

        return subDays(jan31OfPrevYear, dayIndexOfJan31ofPrevYear)
    } else {
        const feb1 = new Date(currentYear + 1, 1, 1)
        const dayIndexOfFeb1 = feb1.getDay()

        return subDays(feb1, dayIndexOfFeb1) 
    }
}
