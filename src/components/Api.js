export default class Api {
    constructor(options){
        this._baseUrl = options.baseUrl;
        this._headers = options.headers;

    }

    _checkResponse(res) {
        if (res.ok) {          
          return res.json();
        }
        return Promise.reject(`Error: ${res.status}`);
    }
    

    getInitialCards(){
      return fetch(`${this._baseUrl}/cards`,{
        headers: this._headers
      })
      .then(this._checkResponse) 
    }

    getUserInfo(){
      return fetch(`${this._baseUrl}/users/me`,{
        headers: this._headers
      })
      .then(this._checkResponse)
    }


    updateUserInfo(input){
      fetch(`${this._baseUrl}/users/me`, {
        method: "PATCH",
        headers: this._headers,
        body: JSON.stringify({
          name: input.name ,
          about: input.about
        })
      });
    }

    addNewCard(input){
      fetch(`${this._baseUrl}/cards`, {
        method: "POST",
        headers: this._headers,
        body: JSON.stringify({
          name: input.name,
          link: input.link
        })
      })
    }
}



