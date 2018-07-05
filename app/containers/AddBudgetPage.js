import React from 'react'
import Card from '@material-ui/core/Card'
import CardHeader from '@material-ui/core/CardHeader'
import CardContent from '@material-ui/core/CardContent'
import CardActions from '@material-ui/core/CardActions'
import Button from '@material-ui/core/Button'
import TextField from '@material-ui/core/TextField'
import present from '../presenters/addBudgetPagePresenter'

const AddBudgetPage = (props) => (
    <Card>
      <CardHeader title='Add Budget'/>
      <CardContent>
        <TextField fullWidth={true} id="month" label="Month" onChange={props.handleChange('month')}/>
        <TextField fullWidth={true} id="amount" label="Amount" onChange={props.handleChange('amount')} />
        {/* <TextField fullWidth={true} id="balance" label="Balance" value={props.account.balance} onChange={props.handleChange('balance')} error={!!props.errors.balance} helperText={props.errors.balance}/> */}
      </CardContent>
      <CardActions>
        <Button variant="contained" color="primary" onClick={() => props.addBudget()}>Save</Button>
      </CardActions>
    </Card>
  )

export default present(AddBudgetPage)