import {expect} from 'chai'
import {
  Budget,
  getNumbersOfDaysInStartMonth,
  getNumbersOfDaysInEndMonth
} from '../../app/presenters/queryBudgetPresenter'

describe('Budget', () => {
  let budget
  beforeEach(() => {
    budget = new Budget()
  })
  describe('query', () => {
    context('no budget', () => {
      it('should return 0', () => {
        expect(budget.query('2018-07-01', '2018-07-31')).to.eq(0)
      })
    })
    context('one budget', () => {
      beforeEach(() => {
        budget.budgets = {
          '2018-07': 3100
        }
      })

      it('within a month', () => {
        expect(budget.query('2018-07-01', '2018-07-10')).to.eq(1000)
      })
      it('a whole month', () => {
        expect(budget.query('2018-01-01', '2018-12-31')).to.eq(3100)
      })
      it('query start before the budget', () => {
        expect(budget.query('2018-06-21', '2018-07-11')).to.eq(1100)
      })
      it('query end before the budget', () => {
        expect(budget.query('2018-06-21', '2018-06-30')).to.eq(0)
      })
      it('query end after the budget', () => {
        expect(budget.query('2018-07-21', '2018-08-11')).to.eq(1100)
      })
      it('query start after the budget', () => {
        expect(budget.query('2018-08-21', '2018-09-11')).to.eq(0)
      })
    })
    it('query missing budget', () => {
      budget.budgets = {
        '2018-07': 3100,
        '2018-09': 30000
      }
      expect(budget.query('2018-07-22', '2018-09-13')).to.eq(1000 + 13000)
    })

    describe(`given there is budget for 2018-06: 3000, 2018-07: 3100, 2018-08: 3100`, () => {
      beforeEach(() => {
        budget.budgets = {
          '2018-06': 3000,
          '2018-07': 3100,
          '2018-08': 3100
        }
      })

      describe('when query from 2018-06-15 to 2018-08-15', () => {
        it('should return 6200', () => {
          expect(budget.query('2018-06-15', '2018-08-15')).to.eq(1600 + 3100 + 1500)
        })
      })
    })
  })
})

describe('getNumbersOfDaysInStartMonth', () => {
  describe('when month is 2018-07-01', () => {
    it('should return 31', () => {
      expect(getNumbersOfDaysInStartMonth('2018-07-01')).to.eq(31)
    })
  })
})

describe('getNumbersOfDaysInEndMonth', () => {
  describe('when date is 2018-07-15', () => {
    it('should return 15', () => {
      expect(getNumbersOfDaysInEndMonth('2018-07-15')).to.eq(15)
    })
  })
})
