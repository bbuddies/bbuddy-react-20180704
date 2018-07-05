import React from 'react'
import Card from '@material-ui/core/Card'
import CardHeader from '@material-ui/core/CardHeader'
import CardContent from '@material-ui/core/CardContent'
import CardActions from '@material-ui/core/CardActions'
import Button from '@material-ui/core/Button'
import TextField from '@material-ui/core/TextField'
import callApi from '../api'
import history from '../history'

class AddBudget extends React.Component {
  state = {
    budget: {
      month: '',
      amount: 0
    },
    errors: {
      month: '',
      amount: ''
    }
  }

  handleChange = (name) => (e) => {
    this.setState({
      budget: Object.assign(this.state.budget, { [name]: e.target.value })
    })
  }

  handleSave = () => {
    this.validate()
    const data = {
      month: this.state.budget.month,
      amount: parseInt(this.state.budget.amount)
    }
    if (this.isValid()) {
      callApi('budgets', 'POST', this.state.budget).then(response => {
        history.goBack()
      })
    }
  }

  isValid = () => {
    return !this.state.errors.month && !this.state.errors.amount
  }

  validate = () => {
    const { month, amount } = this.state.budget
    let monthError = ''
    let amountError = ''

    if (!month) {
      monthError = 'Month is required'
    }

    if (!amount || !parseInt(amount)) {
      amountError = 'Amount must more than 0'
    }

    this.setState({
      errors: Object.assign(this.state.errors, {
        month: monthError,
        amount: amountError
      })
    })
  }

  render() {
    return (
      <Card>
        <CardHeader title='Add Budget'/>
        <CardContent>
          <TextField label="Month"
            autoFocus
            fullWidth={true}
            value={this.state.budget.month}
            helperText={this.state.errors.month}
            error={!!this.state.errors.month}
            onChange={this.handleChange('month')}
          />
          <TextField label="Amount"
            type="number"
            fullWidth={true}
            value={this.state.budget.amount}
            helperText={this.state.errors.amount}
            error={!!this.state.errors.amount}
            onChange={this.handleChange('amount')}
          />
        </CardContent>
        <CardActions>
          <Button
            onClick={this.handleSave}
            variant="contained"
            color="primary">Save</Button>
        </CardActions>
      </Card>
    )
  }
}
export default AddBudget
