import React from "react";
import Card from "@material-ui/core/Card";
import CardHeader from "@material-ui/core/CardHeader";
import CardContent from "@material-ui/core/CardContent";
import CardActions from "@material-ui/core/CardActions";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";

const AddBudgetPage = props => (
  <Card>
    <CardHeader title="Add Budget" />
    <CardContent>
      <TextField
        fullWidth={true}
        id="month"
        label="Month"
        onChange={props.handleChange("month")}
      />
      <TextField
        fullWidth={true}
        id="amount"
        label="Amount"
        onChange={props.handleChange("amount")}
      />
    </CardContent>
    <CardActions>
      <Button
        variant="contained"
        color="primary"
        onClick={() => props.addBudget()}
      >
        Save
      </Button>
    </CardActions>

    {props.budgets.map((budget, index) => {
      return (
        <React.Fragment key={index}>
          <p>{budget.month}</p>
          <p>{budget.amount}</p>
        </React.Fragment>
      );
    })}
  </Card>
);

export class Budgets {
  constructor(setState) {
    this.setState = setState;
    this.budgets = [];
    this.budget = { month: "", amount: 0 };
  }

  addBudget = () => {
    this.budgets.push({ ...this.budget });
    this.setState({});
  };
  handleChange = name => {
    return e => {
      input(name, e.target.value);
      this.setState({ budget: this.budget });
    };
  };
  input = (name, value) => {
    this.budget[name] = value;
  };

  query = (startDate, endDate) => {
    const period = new Period(startDate, endDate);
    const month = startDate.format("YYYY-MM");
    const firstBudgetPeriod = this.findBudgetPeriodByMonth(month);
    const lastBudgetPeriod = this.findBudgetPeriodByMonth(
      endDate.format("YYYY-MM")
    );
    let sameBudgetPeriod = firstBudgetPeriod == lastBudgetPeriod;
    if (sameBudgetPeriod) {
      return this.getAmountInPeriod(period, firstBudgetPeriod);
    } else {
      let lastDateOfFirstMonth = startDate
        .clone()
        .add(1, "month")
        .date(0);
      let firstDateOfLastMonth = endDate.clone().date(1);
      let firstAmount = this.getAmountInPeriod(
        new Period(startDate, lastDateOfFirstMonth),
        firstBudgetPeriod
      );
      let lastAmount = this.getAmountInPeriod(
        new Period(firstDateOfLastMonth, endDate),
        lastBudgetPeriod
      );
      return firstAmount + lastAmount;
    }
  };

  findBudgetPeriodByMonth(month) {
    return this.budgets.filter(value => {
      return value.month == month;
    }, this.budgets)[0];
  }

  getAmountInPeriod(period, selectedBudget) {
    let days = period.getDays();
    if (!selectedBudget) {
      return 0;
    }
    let amountOfThisPeriod = selectedBudget.amount;
    let daysInPeriod = period.startDate.daysInMonth();
    return (amountOfThisPeriod / daysInPeriod) * days;
  }
}

class Period {
  constructor(startDate, endDate) {
    this.startDate = startDate;
    this.endDate = endDate;
  }

  getDays() {
    return this.endDate.diff(this.startDate, "days") + 1;
  }
}

class AddBudgetPageContainer extends React.Component {
  budgets = new Budgets(state => this.setState(state));

  render() {
    return (
      <Card>
        <CardHeader title="Add Budget" />
        <CardContent>
          <TextField
            fullWidth={true}
            id="month"
            label="Month"
            onChange={e => this.budgets.handleChange("month")(e)}
          />
          <TextField
            fullWidth={true}
            id="amount"
            label="Amount"
            onChange={e => this.budgets.handleChange("amount")(e)}
          />
        </CardContent>
        <CardActions>
          <Button
            variant="contained"
            color="primary"
            onClick={() => this.budgets.addBudget()}
          >
            Save
          </Button>
        </CardActions>

        {this.budgets.budgets.map((budget, index) => {
          return (
            <React.Fragment key={index}>
              <p>{budget.month}</p>
              <p>{budget.amount}</p>
            </React.Fragment>
          );
        })}
      </Card>
    );
  }
}

export class Budget {
  constructor(month = "", amount = 0) {
    this.amount = amount;
    this.month = month;
  }
}

export default AddBudgetPageContainer;

export function add({ month, amount }, budgets) {
  let budget = new Budget(month, amount);
  return [...budgets, budget];
}
