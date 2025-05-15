/// <reference types = "cypress" />
require('cypress-plugin-steps')
const loginPage = require('../pages/loginFormPage.js')
const elements = loginPage.elements

describe('TG Login Form', function () {
    before(function () {
        loginPage.loadTestData()
    })

    beforeEach(function () {
        cy.visit('https://www.techglobal-training.com/frontend/login')
    })

    it('[TC01] Validate the login form', function () {
        // steps 2 to 7   labels and input boxes 
        elements.getDivLabels().each((el, index) => {
            cy.wrap(el)
                .should('be.visible')
                .and('have.text', this.inputLabels[index])
                .next()
                .should('be.visible')
                .and('be.enabled')
                .and('not.have.attr', 'required')
        })

        // steps 8 to 10
        elements.getLoginButton()
            .should('be.visible')
            .and('be.enabled')
            .and('have.text', this.loginButtonLabel)

        // steps 11 to 13 
        elements.getForgotPasswordLink()
            .should('be.visible')
            .and('have.prop', 'tagName', 'A') // a tag for clickable assertion
            .and('have.text', this.forgotLabel)
            .click()
        elements.getModalTitle().should('be.visible') // secondary assertion for the link, when it's clickable
    })

    it('[TC02] Validate the successful login', function () {
        //steps 2-4 
        cy.step('Login with a valid account')
        loginPage.login(this.validUserName, this.validPassword)

        //steps 5 -6 
        cy.step('Validation when logged in ')
        elements.successMessage().should('be.visible').and('have.text', this.successMessage)
        elements.getLogoutButton().should('be.visible').and('be.enabled').and('have.text', this.logoutButtonLabel)
    })


    it('[TC03] Validate logout', function () {
        //steps 2-4
        cy.step('Login with a valid account')
        loginPage.login(this.validUserName, this.validPassword)

        //step 5
        loginPage.clickLogout()

        //step 6
        elements.getUserNameInputbox().should('be.visible')
        elements.getPasswordInputbox().should('be.visible')
    })

    it('[TC04] Validate the Forgot Password? Link and Reset Password modal', function () {
        elements.getForgotPasswordLink().click()

        //steps 3-6 
        elements.getModalTitle().should('be.visible').and('have.text', 'Reset Password')
        elements.getModalCloseButton().should('be.visible').and('have.attr', 'class', 'delete')
        elements.getModalEmailInputbox().should('be.visible')
        elements.getModalEmailInputbox().parent()
            .should('have.text', this.paswordResetLabel)

        //steps 7-9
        elements.getModalSubmitButton()
            .should('be.visible')
            .and('have.text', 'SUBMIT')
            .and('not.have.attr', 'disabled')
    })

    it('[TC05] Validate the Reset Password modal close button', function () {
        elements.getForgotPasswordLink().click()

        //steps 3-5
        elements.getModalTitle().should('have.text', this.modalResetPasswordTitle)
        elements.getModalCloseButton().should('be.visible').click()
        elements.getModalCard().should('not.exist')
    })

    it('[TC06] Validate the Reset Password form submission', function () {
        //steps 2-6
        loginPage.passwordReset(this.emailAddress)
        elements.getModalConfirmationMessage()
            .should('be.visible')
            .and('have.text', this.paswordResetSumittedLabel)
    })


    it('[TC07] Validate the invalid login with the empty credentials', function () {
        //steps 2-4
        loginPage.loginEmpty()

        //step 5
        elements.errorMessage()
            .should('be.visible')
            .and('have.text', this.errorMessageUsername)
    })

    it('[TC08] Validate the invalid login with the wrong username', function () {
        //steps 2-4
        loginPage.login(this.invalidUserName, this.validPassword)

        //step 5
        elements.errorMessage()
            .should('be.visible')
            .and('have.text', this.errorMessageUsername)
    })

    it('[TC09] Validate the invalid login with the wrong password', function () {
        //steps 2-4
        loginPage.login(this.validUserName, this.invalidPassword)

        //step 5
        elements.errorMessage()
            .should('be.visible')
            .and('have.text', this.errorMessagePassword)
    })

    it('[TC10] Validate the invalid login with the wrong username and password', function () {
        //steps 2-4
        loginPage.login(this.invalidUserName, this.invalidPassword)

        //step 5
        elements.errorMessage()
            .should('be.visible')
            .and('have.text', this.errorMessageUsername)
    })

})