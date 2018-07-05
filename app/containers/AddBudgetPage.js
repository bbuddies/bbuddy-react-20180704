import React from 'react'
import Card from '@material-ui/core/Card'
import CardHeader from '@material-ui/core/CardHeader'
import CardContent from '@material-ui/core/CardContent'
import CardActions from '@material-ui/core/CardActions'
import Button from '@material-ui/core/Button'
import TextField from '@material-ui/core/TextField'

const AddBudgetPage = props => (
  <Card>
    <CardHeader title="Add Budget"/>
    <CardContent>
      <TextField fullWidth={true} id="month" label="Month" onChange={props.handleChange('month')}/>
      <TextField
        fullWidth={true}
        id="amount"
        label="Amount"
        onChange={props.handleChange('amount')}
      />
    </CardContent>
    <CardActions>
      <Button variant="contained" color="primary" onClick={() => props.addBudget()}>
        Save
      </Button>
    </CardActions>

    {props.budgets.map((budget, index) => {
      return (
        <React.Fragment key={index}>
          <p>{budget.month}</p>
          <p>{budget.amount}</p>
        </React.Fragment>
      )
    })}
  </Card>
)

class Budgets {
  constructor(setState) {
    this.setState = setState
    this.budgets = []
    this.budget = {month: '', amount: 0}
  }

  addBudget = () => {
    this.budgets.push(this.budget)
    this.setState({})
    // this.setState({ budgets: this.budgets })
  }
  handleChange = name => {
    return e => {
      this.budget[name] = e.target.value
      this.setState({budget: this.budget})
    }
  }
}

class AddBudgetPageContainer extends React.Component {
  budgets = new Budgets(state => this.setState(state))

  render() {
    return (
      <Card>
        <CardHeader title="Add Budget"/>
        <CardContent>
          <TextField fullWidth={true} id="month" label="Month" onChange={e => this.budgets.handleChange('month')(e)}/>
          <TextField
            fullWidth={true}
            id="amount"
            label="Amount"
            onChange={(e) => this.budgets.handleChange('amount')(e)}
          />
        </CardContent>
        <CardActions>
          <Button variant="contained" color="primary" onClick={() => this.budgets.addBudget()}>
            Save
          </Button>
        </CardActions>

        {this.budgets.budgets.map((budget, index) => {
          return (
            <React.Fragment key={index}>
              <p>{budget.month}</p>
              <p>{budget.amount}</p>
            </React.Fragment>
          )
        })}
      </Card>
    )
  }
}

export class Budget {
  constructor(month = '', amount = 0) {
    this.amount = amount
    this.month = month
  }
}

export default AddBudgetPageContainer

export function add({month, amount}, budgets) {
  let budget = new Budget(month, amount)
  return [...budgets, budget]
}
