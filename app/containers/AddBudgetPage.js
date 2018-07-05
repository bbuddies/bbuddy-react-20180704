import React from 'react'
import Card from '@material-ui/core/Card'
import CardHeader from '@material-ui/core/CardHeader'
import CardContent from '@material-ui/core/CardContent'
import CardActions from '@material-ui/core/CardActions'
import Button from '@material-ui/core/Button'
import TextField from '@material-ui/core/TextField'

const AddBudgetPage = props => (
  <Card>
    <CardHeader title="Add Budget" />
    <CardContent>
      <TextField fullWidth={true} id="month" label="Month" onChange={props.handleChange('month')} />
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

    {props.budgets.map(budget => {
      return (
        <React.Fragment>
          <p>{budget.month}</p>
          <p>{budget.amount}</p>
        </React.Fragment>
      )
    })}
  </Card>
)

class AddBudgetPageContainer extends React.Component {
  state = {
    budgets: [new Budget()]
  }

  render() {
    return (
      <AddBudgetPage
        handleChange={this.handleChange}
        addBudget={this.addBudget}
        budgets={this.state.budgets}
      />
    )
  }

  addBudget = () => {
    this.setState({
      budgets: add(this.state.month, this.state.amount, this.state.budgets)
    })
  }

  handleChange = name => {
    return e => {
      this.setState({ [name]: e.target.value })
    }
  }
}

export class Budget {
  constructor(month = '', amount = 0) {
    this.amount = amount
    this.month = month
  }
}

export default AddBudgetPageContainer
export function add(month, amount, budgets) {
  let budget = new Budget(month, amount)
  return [...budgets, budget]
}
