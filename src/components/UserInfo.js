export default class UserInfo {
  constructor({ title, subtitle }) {
    this._nameEl = document.querySelector(title);
    this._jobEl = document.querySelector(subtitle);
  }
  getUserInfo() {
    return {
      title: this._nameEl.textContent,
      subtitle: this._jobEl.textContent,
    };
  }
  setUserInfo(value) {
    //set user info from value
    this._nameEl.textContent = value.title;
    this._jobEl.textContent = value.subtitle;
  }
}
