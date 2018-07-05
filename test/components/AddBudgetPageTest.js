import { Budget, add, Budgets } from "../../app/containers/AddBudgetPage";
import { expect } from "chai";
import moment from "moment";
describe("budget", () => {
  it("should have amount and month", () => {
    const budget = new Budget();
    expect(budget).to.deep.eq({
      amount: 0,
      month: ""
    });
  });

  xit("should accept parameter when creating Budget", () => {
    const budget = new Budget("2018-06", 1000);
    expect(budget).to.deep.eq({
      amount: 1000,
      month: "2018-06"
    });
  });

  xit("should add new budget to the list", () => {
    const budgets = [];
    const result = add("2018-06", 1000, budgets);
    expect(result).to.deep.eq([
      {
        month: "2018-06",
        amount: 1000
      }
    ]);
  });
});

describe("Budgets", () => {
  let budgets;
  beforeEach(() => {
    budgets = new Budgets(() => {});
  });

  context("query", () => {
    it("should return 0", () => {
      const startDate = moment("2018-01-01");
      const endDate = moment("2016-12-31");
      const total = budgets.query(startDate, endDate);
      expect(total).to.eq(0);
    });

    context("there is 1 budget", () => {
      beforeEach(() => {
        addBudget("2018-07", 3100);
      });
      it("full month", () => {
        const startDate = moment("2018-07-01");
        const endDate = moment("2018-07-31");
        const total = budgets.query(startDate, endDate);
        expect(total).to.eq(3100);
      });
      it("10 days", () => {
        const startDate = moment("2018-07-01");
        const endDate = moment("2018-07-10");
        const total = budgets.query(startDate, endDate);
        expect(total).to.eq(1000);
      });
      xit("full year", () => {
        const startDate = moment("2018-01-01");
        const endDate = moment("2018-12-31");
        const total = budgets.query(startDate, endDate);
        expect(total).to.eq(3100);
      });
    });
    context("there are 2 budgets", () => {
      beforeEach(() => {
        addBudget("2018-06", 1500);
        addBudget("2018-07", 3100);
      });
      it("month 6", () => {
        const startDate = moment("2018-06-01");
        const endDate = moment("2018-06-30");
        const total = budgets.query(startDate, endDate);
        expect(total).to.eq(1500);
      });

      it("month 7", () => {
        const startDate = moment("2018-07-01");
        const endDate = moment("2018-07-31");
        const total = budgets.query(startDate, endDate);
        expect(total).to.eq(3100);
      });

      it("2 full months", () => {
        const startDate = moment("2018-06-01");
        const endDate = moment("2018-07-31");
        const total = budgets.query(startDate, endDate);
        expect(total).to.eq(4600);
      });

      it("2 half months", () => {
        const startDate = moment("2018-06-16");
        const endDate = moment("2018-07-16");
        const total = budgets.query(startDate, endDate);
        expect(total).to.eq(50*15 + 100*16);
      });
    });
  });
  function addBudget(month, amount) {
    budgets.input("month", month);
    budgets.input("amount", amount);
    budgets.addBudget();
  }
});
