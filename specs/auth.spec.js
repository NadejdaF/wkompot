import LoginPage from '../pages/login.page';
import ProfilePage from '../pages/profile.page';

describe('Auth', function() {
    beforeEach(async function () {
        await LoginPage.open();
    });

    it('Successful log in', async function() {
        await expect(LoginPage.buttonSubmit)
            .toBeDisplayed();
        await LoginPage.login(process.env.LOGIN, process.env.PASSWORD);
        await expect(ProfilePage.iconUser)
            .toBeDisplayed();
    });

    it('Log in attempt with non-registered email', async function() {
        await LoginPage.login('mamasitainvalid@gmai.com', 'MaMaSitaInvalid');
        await expect(LoginPage.notification).toHaveText('Email is not registered');
    });

    it('Log in attempt with invalid password', async function() {
        await LoginPage.login('mamasita@gmai.com', 'MaMaSitaInvalid');
        await expect(LoginPage.notification).toHaveText('Incorrect password');
    });

    it('Credentials are required', async function() {
        await LoginPage.inputUsername.setValue('mamasita');
        await LoginPage.inputUsername.smartClear();
        await expect(LoginPage.loginError).toHaveText('Required');
        await LoginPage.inputPassword.setValue('mamasita');
        await LoginPage.inputPassword.smartClear();
        await expect(LoginPage.passwordError).toHaveText('Required');
    });
});