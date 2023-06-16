class Api {
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
        


    }

    getUserIngo(){

    }
}

const api = new Api({
    baseUrl: "https://around.nomoreparties.co/v1/group-12",
    headers: {
      authorization: "cd8b3986-f3d6-4da9-8f48-96bc48ae4bb7",
      "Content-Type": "application/json",
    },
});

export default api