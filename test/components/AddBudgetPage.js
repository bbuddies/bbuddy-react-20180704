import { Budget } from '../../app/containers/AddBudgetPage'
import { expect } from 'chai'

describe('budget', () => {
  it('should have amount and month', () => {
    const budget = new Budget()
    expect(budget).to.deep.eq({
      amount: '',
      month: ''
    })
  })

  it('should accept parameter when creating Budget', () => {})
})
