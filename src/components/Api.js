export default class Api {
    constructor(options){
        this._baseUrl = options.baseUrl;
        this._headers = options.headers;

    }

    _checkResponse(res) {
        if (res.ok) {
          console.log("its here!")
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

    getUserIngo(){

    }
}



