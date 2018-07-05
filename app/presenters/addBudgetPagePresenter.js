import present from './presenter'
import PagePresenter from "./pagePresenter";
import {bindActionCreators} from 'redux'
import merge from 'lodash/merge'
import assign from 'lodash/assign'
import * as AccountActions from '../actions/account'
import * as NavigationActions from '../actions/navigation'
import {number, required, Validation} from '../validation'

export class AddBudgetPagePresenter extends PagePresenter {
  budget = this.state('budget', {
    month: "",
    amount: 0
  })

  budgets = this.state('budgets', [
    {month: "2017-01", amount: 200},
    {month: "2016-02", amount: 400},
  ])

  getProps() {
    return {
      budget: this.budget,
      budgets: this.budgets,
      addBudget: () => this.addBudget(),
      handleChange: name => this.handleChange(name)
    }
  }

  handleChange = name => event => {
    this.budget[name] = event.target.value
  }

  addBudget() {
    // this.validation.validate(this.account,
    //   () => this.inputProps.addAccount(this.account, () => this.inputProps.goBack()),
    //   errors => assign(this.errors, errors)
    // )
    console.log(this.budget)
  }

  static mapStateToProps(state) {
    return {}
  }

  static mapDispatchToProps(dispatch) {
    return {}
  }

}

export default present(AddBudgetPagePresenter)
