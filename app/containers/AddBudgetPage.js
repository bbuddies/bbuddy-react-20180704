import React from 'react'
import Card from '@material-ui/core/Card'
import CardHeader from '@material-ui/core/CardHeader'
import CardContent from '@material-ui/core/CardContent'
import CardActions from '@material-ui/core/CardActions'
import Button from '@material-ui/core/Button'
import TextField from '@material-ui/core/TextField'

const AddBudgetPage = (props) => (
    <Card>
      <CardHeader title='Add Budget'/>
      <CardContent>
        <TextField fullWidth={true} id="month" label="Month" onChange={props.handleChange('month')}/>
        <TextField fullWidth={true} id="amount" label="Amount" onChange={props.handleChange('amount')} />
      </CardContent>
      <CardActions>
        <Button variant="contained" color="primary" onClick={() => props.addBudget()}>Save</Button>
      </CardActions>
    </Card>
  )

class AddBudgetPageContainer extends React.Component {
  render() {
    console.log(this.state)
    return <AddBudgetPage handleChange={this.handleChange}></AddBudgetPage>
  }

  handleChange = (name) => {
    return (e) => {
      this.setState({[name]: e.target.value})
    }
  }
}

export default AddBudgetPageContainer