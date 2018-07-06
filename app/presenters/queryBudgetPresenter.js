import moment from 'moment'

export class Budget {
  budgets = {}

  query(startDate, endDate) {
    const momentStartDate = moment(startDate, 'YYYY-MM-DD')
    const momentEndDate = moment(endDate, 'YYYY-MM-DD')

    if (momentStartDate.isSame(momentEndDate, 'month')) {
      const diffDays = momentEndDate.diff(momentStartDate, 'days') + 1
      return ((this.budgets[this.budgetKey(momentStartDate)] || 0) / momentStartDate.daysInMonth()) * diffDays
    } else {
      let budget = 0

      // start month
      const numberOfDaysInStartMonth = getNumbersOfDaysInStartMonth(momentStartDate)
      const amountDaysFirst = momentStartDate.daysInMonth()
      const firstMonthBudget = this.getAmountOfBudgetIncluding(momentStartDate)
      const totalBudgetFirstMonth = numberOfDaysInStartMonth * (firstMonthBudget / amountDaysFirst)
      budget += totalBudgetFirstMonth

      // months in between
      const monthDiff = momentEndDate.diff(momentStartDate, 'months') - 1
      for (let month = 1; month <= monthDiff; month++) {
        const monthString = this.budgetKey(moment(momentStartDate).add(month, 'month'))
        const budgetThisMonth = this.budgets[monthString] || 0
        budget += budgetThisMonth
      }

      // end month
      const numberOfDaysInLastMonth = getNumbersOfDaysInEndMonth(endDate)
      const amountDaysLast = momentEndDate.daysInMonth()
      const lastMonthBudget = this.getAmountOfBudgetIncluding(momentEndDate)
      const totalBudgetLastMonth = numberOfDaysInLastMonth * (lastMonthBudget / amountDaysLast)
      budget += totalBudgetLastMonth
      return budget
    }
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
  const endDate = moment(date, 'YYYY-MM-DD')
  const startDate = moment(date, 'YYYY-MM-DD').startOf('month')
  const remainingDays = endDate.diff(startDate, 'days')

  return remainingDays + 1
}
