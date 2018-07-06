import moment from 'moment'

export class Budget {
  budgets = {}

  query(startDate, endDate) {
    const start = moment(startDate, 'YYYY-MM-DD')
    const end = moment(endDate, 'YYYY-MM-DD')

    if (start.isSame(end, 'month')) {
      const diffDays = end.diff(start, 'days') + 1
      return ((this.budgets[this.budgetKey(start)] || 0) / start.daysInMonth()) * diffDays
    } else {
      let budget = 0

      // start month
      budget += this.getAmountBetween(moment(start).endOf('month'), start)

      // months in between
      const monthDiff = end.diff(start, 'months') - 1
      for (let month = 1; month <= monthDiff; month++) {
        const monthString = this.budgetKey(moment(start).add(month, 'month'))
        const budgetThisMonth = this.budgets[monthString] || 0
        budget += budgetThisMonth
      }

      // end month
      budget += this.getAmountBetween(end, moment(end).startOf('month'))
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
