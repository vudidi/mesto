export class UserInfo {
    constructor(nameElementSelector, aboutElementSelector) {
        this._nameElement = document.querySelector(nameElementSelector);
        this._aboutElement = document.querySelector(aboutElementSelector);
    }

    getUserInfo() {
        const newInfo = {
            name: this._nameElement.textContent,
            about: this._aboutElement.textContent,
        }

        return newInfo
    }

    setUserInfo(name, about) {
        this._nameElement.textContent = name;
        this._aboutElement.textContent = about;
    }
}