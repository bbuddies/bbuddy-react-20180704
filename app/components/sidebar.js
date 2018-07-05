import React from 'react';
import {bindActionCreators} from 'redux'
import {connect} from 'react-redux'
import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import ListItemIcon from '@material-ui/core/ListItemIcon'
import ListItemText from '@material-ui/core/ListItemText'
import DashboardIcon from '@material-ui/icons/Dashboard'
import AccountIcon from '@material-ui/icons/EuroSymbol'
import {routerActions} from 'connected-react-router'


const Sidebar = props => (
  <List className={props.className}>
    {props.items.map((item, index) =>
      <ListItem key={index} id={item.text} button onClick={() => props.push(item.url)}>
        <ListItemIcon>
          {item.icon}
        </ListItemIcon>
        <ListItemText primary={item.text}/>
      </ListItem>
    )}
  </List>
)

function mapStateToProps(state) {
  return {
    pathname: state.router.location.pathname,
    items: [
      {
        text: 'Dashboard',
        url: '/',
        icon: <DashboardIcon/>,
      },
      {
        text: 'Accounts',
        url: '/accounts',
        icon: <AccountIcon/>,
      },
      {
        text: 'Budgets',
        url: '/budgets',
        icon: <AccountIcon/>,
      }
    ]
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(routerActions, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(Sidebar)
