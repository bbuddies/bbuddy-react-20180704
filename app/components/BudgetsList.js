import React from 'react'
import Card from '@material-ui/core/Card'
import CardHeader from '@material-ui/core/CardHeader'
import CardContent from '@material-ui/core/CardContent'
import CardActions from '@material-ui/core/CardActions'
import Button from '@material-ui/core/Button'
import Table from '@material-ui/core/Table'
import TableHead from '@material-ui/core/TableHead'
import TableRow from '@material-ui/core/TableRow'
import TableCell from '@material-ui/core/TableCell'
import TableBody from '@material-ui/core/TableBody'

import callApi from '../../app/api'
import config from '../config'
import history from '../history'


class BudgetsPage extends React.Component {
  state = {
    budgets: [],
  }

  goToAddBudget() {
    history.push('/budgets/add')
  }

  componentDidMount() {
    callApi(`${config.apiUrl}budgets`, 'GET').then(
      data => {
        this.setState({ budgets: data })
      }
    ).catch(
      ({status, data}) => {
        console.log(data)
      }
    )
  }

  render() {
    return (
      <Card>
        <CardHeader title='Budgets'/>
        <CardContent>
          <Table id='budget-table'>
            <TableHead>
              <TableRow>
                <TableCell>Month</TableCell>
                <TableCell numeric>Amount</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {
                this.state.budgets.map((budget, index) => (
                  <TableRow key={index}>
                    <TableCell component='th' scope='row'>{budget.month}</TableCell>
                    <TableCell numeric>{budget.amount}</TableCell>
                  </TableRow>
                ))
              }
            </TableBody>
          </Table>
        </CardContent>
        <CardActions>
          <Button variant="contained" color="primary" onClick={this.goToAddBudget}>Add</Button>
        </CardActions>
      </Card>
    )
  }
}

export default BudgetsPage
