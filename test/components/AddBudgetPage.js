import { Budget, add } from '../../app/containers/AddBudgetPage'
import { expect } from 'chai'

describe('budget', () => {
  it('should have amount and month', () => {
    const budget = new Budget()
    expect(budget).to.deep.eq({
      amount: 0,
      month: ''
    })
  })

  it('should accept parameter when creating Budget', () => {
    const budget = new Budget('2018-06', 1000)
    expect(budget).to.deep.eq({
      amount: 1000,
      month: '2018-06'
    })
  })

  it('should add new budget to the list', () => {
    const budgets = []
    const result = add('2018-06', 1000, budgets)
    expect(result).to.deep.eq([
      {
        month: '2018-06',
        amount: 1000
      }
    ])
  })
})
