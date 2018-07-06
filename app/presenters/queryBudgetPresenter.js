import moment from 'moment'

class Period {
  constructor(start, end) {
    this.start = start
    this.end = end
  }

}

class Budget {
  constructor(date, amount) {
    this.start = moment(date).startOf('month')
    this.end = moment(date).endOf('month')
    this.amount = amount
  }

}

export class BudgetPlan {
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
      let total = 0

      // start month
      let firstBudget = new Budget(period.start, this.getAmountOfBudgetIncluding(period.start))
      total += this.getAmountBetween(firstBudget.end, period.start)

      // months in between
      const monthDiff = period.end.diff(period.start, 'months') - 1
      for (let month = 1; month <= monthDiff; month++) {
        let budget = new Budget(moment(period.start).add(month, 'month'), this.getAmountOfBudgetIncluding(moment(period.start).add(month, 'month')))
        total += budget.amount
      }

      // end month
      let lastBudget = new Budget(period.end, this.getAmountOfBudgetIncluding(period.end))
      total += this.getAmountBetween(period.end, lastBudget.start)

      return total
    }
  }

  getAmountBetween(end, startOfLastBudget) {
    const numberOfDaysInLastMonth = end.diff(startOfLastBudget, 'days') + 1
    const amountDaysLast = startOfLastBudget.daysInMonth()
    const lastMonthBudget = this.getAmountOfBudgetIncluding(startOfLastBudget)
    const totalBudgetLastMonth = numberOfDaysInLastMonth * (lastMonthBudget / amountDaysLast)
    return totalBudgetLastMonth;
  }

  getBudget(date) {

  }

  getAmountOfBudgetIncluding(date) {
    return this.budgets[this.budgetKey(date)] || 0;
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
