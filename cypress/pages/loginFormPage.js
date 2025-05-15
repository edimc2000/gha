class LoginPage {

    /* Locators */
    
    elements = {
        getUserNameInputbox: () => cy.get('#username'),
        getPasswordInputbox: () => cy.get('#password'),

        getLoginButton: () => cy.get('#login_btn'),
        getLogoutButton: () => cy.get('#logout'),

        getForgotPasswordLink: () => cy.get('a[href="/frontend/login"]'),
        successMessage: () => cy.get('#success_lgn'),
        errorMessage: () => cy.get('#error_message'),

        getModalCard: () => cy.get('.modal .modal-card'),
        getModalTitle: () => cy.get('#modal_title'),
        getModalCloseButton: () => cy.get('[aria-label="close"]'),
        getModalEmailInputbox: () => cy.get('#email'),
        getModalSubmitButton: () => cy.get('#submit'),
        getModalConfirmationMessage: () => cy.get('#confirmation_message'),

        getDivLabels: () => cy.get('div label'),
    }

    /* Methods */

    clickLogin() {
        this.elements.getLoginButton().click()
    }

    clickLogout() {
        this.elements.getLogoutButton().click()
    }

    login(username, password) {
        this.elements.getUserNameInputbox().type(username).should('have.value', username)
        this.elements.getPasswordInputbox().type(password).should('have.value', password)
        this.clickLogin()
    }

    loginEmpty() {
        this.elements.getUserNameInputbox().clear()
        this.elements.getPasswordInputbox().clear()
        this.clickLogin()
    }

    passwordReset(email) {
        this.elements.getForgotPasswordLink().click()
        this.elements.getModalEmailInputbox().type(email).should('have.value', email)
        this.elements.getModalSubmitButton().click()
    }

    loadTestData() {
        cy.fixture('loginFormTestData.json').then(function (data) {
            this.invalidUserName = data['invalidUserName']
            this.invalidPassword = data['invalidPassword']
            this.emailAddress = data['emailAddress']
            this.inputLabels = data['inputLabels']
            this.loginButtonLabel = data['loginButtonLabel']
            this.logoutButtonLabel = data['logoutButtonLabel']
            this.forgotLabel = data['forgotLabel']
            this.successMessage = data['successMessage']
            this.errorMessageUsername = data['errorMessageUsername']
            this.errorMessagePassword = data['errorMessagePassword']
            this.paswordResetLabel = data['paswordResetLabel']
            this.paswordResetSumittedLabel = data['paswordResetSumittedLabel']
            this.modalResetPasswordTitle = data['modalResetPasswordTitle']
            this.validUserName = Cypress.env('UI_USERNAME')
            this.validPassword = Cypress.env('UI_PASSWORD')
        })
    }

}

module.exports = new LoginPage()
