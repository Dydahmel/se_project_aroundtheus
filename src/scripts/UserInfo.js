export default class UserInfo{
    constructor(inputValue){
        this._nameInput = inputValue.title;
        this._jobInput = inputValue.subtitle;
        this._nameEl = document.querySelector(".profile__title");
        this._jobEl = document.querySelector(".profile__subtitle");
        
    }
    getUserInfo(){
        return{
            title : this._nameEl.textContent,
            subtitle: this._jobEl.textContent
        }
        

    }
    setUserInfo(){
        this._nameEl.textContent = this._nameInput;
        this._jobEl.textContent = this._jobInput;
    }
}