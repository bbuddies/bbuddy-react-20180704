import React from 'react';
import Card from '@material-ui/core/Card'
import CardHeader from '@material-ui/core/CardHeader'
import CardContent from '@material-ui/core/CardContent'
import CardActions from '@material-ui/core/CardActions'
import Button from '@material-ui/core/Button'
import TextField from '@material-ui/core/TextField';
import callApi from '../api'

class AddBudgetPage extends React.Component {
    state = {
        month: "",
        amount: 0,
        error: {
          month: "",
          amount: ""
        }
    }
  
    onChangeMonth = (event) => {
      if (event.target.value.length > 0) {
        this.setState({
          error: {
            month: ""
          }
        })
      }
      
      this.setState({month: event.target.value});
    }

    onChangeAmount = (event) => {
      if (!this.castAmount(event)) {
        return this.setState({amount: 0});
      }
      this.setState({
        amount: +(event.target.value)}
      )
    }

    castAmount = (e) => {
      if (+(e.target.value)) {
        return true
      }
      return false
    }

    validateInputField = () => {
      if (this.validateMonth()) {
        return true
      }
      return false
    }

    validateMonth = () => {
      if (this.state.month) {
        return true
      }
      this.setState({
        error: {
          month: "Please input valid month"
        }
      })
      return false
    }

    addBudget = () => {
      var formData = {
        amount: this.state.amount,
        month: this.state.month
      }
      if (!this.validateInputField()) {
        return 
      }

      callApi("budget", "POST", formData, "" ).then(
        (r) => {
          console.log(r)
        }, (e) => {
          console.log(e)
        }
      )
    }
    
    render() {
      return (
        <div>
        <Card>
            <CardHeader title='Add Account'/>
            <CardContent>
            <TextField fullWidth={true} id="month" label="Month" value={this.state.month} onChange={(e) => this.onChangeMonth(e)} error={!!this.state.error.month} helperText={this.state.error.month}/>
            <TextField fullWidth={true} id="amount" label="Amount" value={this.state.amount} onChange={(e) => this.onChangeAmount(e)}/>
            </CardContent>
            <CardActions>
            <Button variant="contained" color="primary" onClick={() => this.addBudget()}>Save</Button>
            </CardActions>
        </Card>
        </div>
      )
    }
  }

export default AddBudgetPage
