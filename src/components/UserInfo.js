export default class UserInfo {
  constructor({ title, subtitle }) {
    this._nameEl = document.querySelector(title);
    this._jobEl = document.querySelector(subtitle);
  }

  getUserInfo() {
    return {
      name: this._nameEl.textContent,
      about: this._jobEl.textContent,
    };
  }
  setUserInfo(value) {
    //set user info from value
    this._nameEl.textContent = value.name;
    this._jobEl.textContent = value.about;
  }
}
