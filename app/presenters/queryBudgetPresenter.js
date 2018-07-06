import moment from 'moment'
import _ from 'lodash'

class Period {
  constructor(start, end) {
    this.start = start
    this.end = end
  }

  days() {
    return this.start.isAfter(this.end) ? 0 : this.end.diff(this.start, 'days') + 1;
  }

  getOverlappingDays(another) {
    let startOfOverlapping = this.start.isAfter(another.start) ? this.start : another.start;
    let endOfOverlapping = this.end.isBefore(another.end) ? this.end : another.end;
    return new Period(startOfOverlapping, endOfOverlapping).days();
  }
}

class Budget {
  constructor(date, amount) {
    this.start = moment(date).startOf('month')
    this.end = moment(date).endOf('month')
    this.period = new Period(this.start, this.end)
    this.amount = amount
  }
  getAmountOfOverlapping(period) {
    return period.getOverlappingDays(this.period) * this.amount / this.period.days();
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
    return _(this.budgets)
      .map((amount, month) => new Budget(moment(month, 'YYYY-MM'), amount))
      .sumBy(budget => budget.getAmountOfOverlapping(period))
  }

}
