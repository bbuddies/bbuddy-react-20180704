import React from 'react'
import Card from '@material-ui/core/Card'
import CardHeader from '@material-ui/core/CardHeader'
import CardContent from '@material-ui/core/CardContent'
import CardActions from '@material-ui/core/CardActions'
import Button from '@material-ui/core/Button'
import TextField from '@material-ui/core/TextField';

class AddBudget extends React.Component {
  state = {
    month: '',
    amount: 0
  }

  handleChange = (name) => {
    return (e) => {
      this.setState({
        [name]: e.target.value
      })
    }
  }

  handleSave() {

  }

  render() {
    return (
      <Card>
        <CardHeader title='Add Budget'/>
        <CardContent>
          <TextField label="Month"
            fullWidth={true}
            value={this.state.month}
            onChange={this.handleChange('month')} />
          <TextField label="Amount"
            fullWidth={true}
            onChange={this.handleChange('amount')}
            value={this.state.amount}/>
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

