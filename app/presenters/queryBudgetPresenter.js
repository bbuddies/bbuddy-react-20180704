import moment from 'moment'

class Period {
  constructor(start, end) {
    this.start = start
    this.end = end
  }

  days() {
    return this.end.diff(this.start, 'days') + 1;
  }
}

class Budget {
  constructor(date, amount) {
    this.start = moment(date).startOf('month')
    this.end = moment(date).endOf('month')
    this.amount = amount
  }

  days() {
    return this.start.daysInMonth()
  }
}

export class BudgetPlan {
  budgets = {}

  query(startDate, endDate) {
    const start = moment(startDate, 'YYYY-MM-DD')
    const end = moment(endDate, 'YYYY-MM-DD')
    return this.queryInPeriod(new Period(start, end))
  }

  queryInPeriod(period) {
    if (period.start.isSame(period.end, 'month')) {
      const diffDays = period.end.diff(period.start, 'days') + 1
      let budget = this.getBudget(period.start)
      return budget.amount / period.start.daysInMonth() * diffDays
    } else {
      let total = 0

      // start month
      let firstBudget = this.getBudget(period.start)
      total += this.getAmountWithin(new Period(period.start, firstBudget.end), firstBudget)

      // months in between
      const monthDiff = period.end.diff(period.start, 'months') - 1
      for (let month = 1; month <= monthDiff; month++) {
        let budget = this.getBudget(moment(period.start).add(month, 'month'))
        total += budget.amount
      }

      // end month
      let lastBudget = this.getBudget(period.end)
      total += this.getAmountWithin(new Period(lastBudget.start, period.end), lastBudget)

      return total
    }
  }

  getAmountWithin(period, budget) {
    return period.days() * budget.amount / budget.days();
  }

  getBudget(date) {
    return new Budget(date, this.getAmountOfBudgetIncluding(date))
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
