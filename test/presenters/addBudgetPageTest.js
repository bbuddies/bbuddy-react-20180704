import {expect} from 'chai'

import {AddBudgetPage} from '../../app/containers/AddBudgetPage'

fdescribe('AddBudgetPage', () => {
    it('', () => {
        var addBudgetPage = new AddBudgetPage()
        addBudgetPage.state = {
            month: "",
            amount: 0,
            error: {
            month: "",
            amount: ""
        }
        expect(addBudgetPage.validateInputField()).to.be(true)
    })
})