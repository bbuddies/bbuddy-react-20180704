import moment from 'moment'

class Period {
  constructor(start, end) {
    this.start = start
    this.end = end
  }

}

export class Budget {
  budgets = {}

  query(startDate, endDate) {
    const start = moment(startDate, 'YYYY-MM-DD')
    const end = moment(endDate, 'YYYY-MM-DD')
    return this.queryInPeriod(new Period(start, end))
  }

  queryInPeriod(period){
    if (period.start.isSame(period.end, 'month')) {
      const diffDays = period.end.diff(period.start, 'days') + 1
      return ((this.budgets[this.budgetKey(period.start)] || 0) / period.start.daysInMonth()) * diffDays
    } else {
      let budget = 0

      // start month
      let endOfFirstBudget = moment(period.start).endOf('month');
      budget += this.getAmountBetween(endOfFirstBudget, period.start)

      // months in between
      const monthDiff = period.end.diff(period.start, 'months') - 1
      for (let month = 1; month <= monthDiff; month++) {
        const monthString = this.budgetKey(moment(period.start).add(month, 'month'))
        const budgetThisMonth = this.budgets[monthString] || 0
        budget += budgetThisMonth
      }

      // end month
      let startOfLastBudget = moment(period.end).startOf('month');
      budget += this.getAmountBetween(period.end, startOfLastBudget)

      return budget
    }
  }

  getAmountBetween(end, startOfLastBudget) {
    const numberOfDaysInLastMonth = end.diff(startOfLastBudget, 'days') + 1
    const amountDaysLast = startOfLastBudget.daysInMonth()
    const lastMonthBudget = this.getAmountOfBudgetIncluding(startOfLastBudget)
    const totalBudgetLastMonth = numberOfDaysInLastMonth * (lastMonthBudget / amountDaysLast)
    return totalBudgetLastMonth;
  }

  getAmountOfBudgetIncluding(momentStartDate) {
    return this.budgets[this.budgetKey(momentStartDate)] || 0;
  }

  budgetKey(momentStartDate) {
    return momentStartDate.format('YYYY-MM');
  }
}

const getMonth = date => date.substr(0, date.lastIndexOf('-'))

export const getNumbersOfDaysInStartMonth = date => {
  return moment(date).endOf('month').diff(date, 'days') + 1
}

export const getNumbersOfDaysInEndMonth = date => {
  return date.diff(moment(date).startOf('month'), 'days') + 1
}
