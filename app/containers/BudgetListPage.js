import React from 'react';
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
import callApi from '../api'


class BudgetListPage extends React.Component {
    state = {
        budgets:[]
    }
  
    componentWillMount() {
        this.listBudget();
    }

    listBudget = () => {
        callApi("budget", "GET").then(
            (r) => {
                console.log(r)
                this.setState({budgets:r})
            }, (e) => {
                console.log(e)
            }
        )
    }
    
    render() {
      return (
        <Card>
        <CardHeader title='Budget'/>
        <CardContent>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell tooltip="Month">Month</TableCell>
                <TableCell numeric>Amount</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {this.state.budgets.map((budget, index) => (
                <TableRow key={index}>
                  <TableCell component="th" scope="row">{budget.month}</TableCell>
                  <TableCell numeric>{budget.amount}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
      )
    }
  }

export default BudgetListPage
