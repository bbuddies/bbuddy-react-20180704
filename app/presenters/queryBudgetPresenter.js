import moment from 'moment'

const DATE_FORMAT = 'YYYY-MM-DD'
const MONTH_FORMAT = 'YYYY-MM'
export class Budget {
  budgets = {}

  query(startDate, endDate) {
    const startMonth = getMonth(startDate)
    const endMonth = getMonth(endDate)

    if (startMonth == endMonth) {
      return this.calculateBudgetOneMonth(startDate, endDate)
    } else {
      return this.calculateBudgetMultipleMonths(startDate, endDate)
    }
  }

  calculateBudgetMultipleMonths(startDate, endDate) {
    const startMonth = getMonth(startDate)
    const endMonth = getMonth(endDate)
    const momentStartDate = moment(startDate, DATE_FORMAT)
    const momentEndDate = moment(endDate, DATE_FORMAT)

    const budgetFirstMonth = this.getBudgetStartMonth(startDate, startMonth)
    const budgetMonthsInBetween = this.getBudgetMonthsInBetween(
      momentEndDate,
      momentStartDate,
      startDate
    )
    const budgetLastMonth = this.getBudgetLastMonth(endDate, endMonth)
    return budgetFirstMonth + budgetMonthsInBetween + budgetLastMonth
  }

  getBudgetMonthsInBetween(momentEndDate, momentStartDate, startDate) {
    let budget = 0
    const monthDiff = momentEndDate.diff(momentStartDate, 'months') - 1
    for (let month = 1; month <= monthDiff; month++) {
      const currentMonth = moment(startDate, DATE_FORMAT)
        .add(month, 'month')
        .format(MONTH_FORMAT)
      const budgetThisMonth = this.getBudgetForMonth(currentMonth)
      budget += budgetThisMonth
    }
    return budget
  }

  getBudgetForMonth(currentMonth) {
    return this.budgets[currentMonth] || 0
  }

  getBudgetLastMonth(endDate, endMonth) {
    const numberOfDaysInLastMonth = getNumbersOfDaysInEndMonth(endDate)
    const lastMonthBudget = this.getBudgetForMonth(endMonth)
    const totalBudgetLastMonth = calculateBudget(numberOfDaysInLastMonth, endMonth, lastMonthBudget)
    return totalBudgetLastMonth
  }

  getBudgetStartMonth(startDate, startMonth) {
    const numberOfDaysInStartMonth = getNumbersOfDaysInStartMonth(startDate)
    const firstMonthBudget = this.getBudgetForMonth(startMonth)
    const totalBudgetFirstMonth = calculateBudget(
      numberOfDaysInStartMonth,
      startMonth,
      firstMonthBudget
    )
    return totalBudgetFirstMonth
  }

  calculateBudgetOneMonth(startDate, endDate) {
    const startMonth = getMonth(startDate)
    const endMonth = getMonth(endDate)
    const momentStartDate = moment(startDate, DATE_FORMAT)
    const momentEndDate = moment(endDate, DATE_FORMAT)

    return this.calBudgetSameMonth(momentEndDate, momentStartDate, startMonth)
  }

  calBudgetSameMonth(momentEndDate, momentStartDate, startMonth) {
    const diffDays = momentEndDate.diff(momentStartDate, 'days') + 1
    const budgetFirstMonth = this.getBudgetForMonth(startMonth)
    const budget = calculateBudget(diffDays, startMonth, budgetFirstMonth)
    return budget
  }
}

const getMonth = date => date.substr(0, date.lastIndexOf('-'))

export const getNumbersOfDaysInStartMonth = date => {
  const startDate = moment(date, DATE_FORMAT)
  const endDate = moment(date, DATE_FORMAT).endOf('month')
  const remainingDays = endDate.diff(startDate, 'days')

  return remainingDays + 1
}

export const getNumbersOfDaysInEndMonth = date => {
  const endDate = moment(date, DATE_FORMAT)
  const startDate = moment(date, DATE_FORMAT).startOf('month')
  const remainingDays = endDate.diff(startDate, 'days')

  return remainingDays + 1
}

function calculateBudget(numOfDays, month, monthlyBudget) {
  let daysInMonth = moment(month, MONTH_FORMAT).daysInMonth()
  return numOfDays * (monthlyBudget / daysInMonth)
}
