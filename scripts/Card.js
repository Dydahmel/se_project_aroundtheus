import {modalImage, modalCaption} from './index.js'
import {openImage} from './utils.js'



class Card{
    constructor(data, cardSelector){
        this._name = data.name;
        this._link = data.link;
        this._cardSelector = cardSelector;


    };

    _getTemplate(){
       const cardEl = document
       .querySelector('#card__template')
       .content
       .querySelector('.card')
       .cloneNode(true)
       return cardEl
    };

    
    _setEventListeners(){
      this._likeBtn = this._card.querySelector('#card_like-button');
      this._deleteBtn = this._card.querySelector('.card__delete-btn');
      this._image = this._card.querySelector('.card__image');
      this._likeBtn.addEventListener('click', () => this._toggleLikeBtn());
      this._deleteBtn.addEventListener('click', () => this._removeCard());
      this._image.addEventListener('click', () => this._openImage())
    }

    _openImage(){        
        modalImage.src = this._link;
        modalImage.alt = this._name;
        modalCaption.textContent = this._name;
        openImage();
    }

    _toggleLikeBtn(){
        this._likeBtn.classList.toggle('card__like-button_enabled');
    };

    _removeCard(){
        this._card.remove();
    }; 
    
    getViev(){
        this._card = this._getTemplate();
        this._setEventListeners();
        

        this._card.querySelector('.card__image').src = this._link;        
        this._card.querySelector('.card__title').textContent = this._name;
        this._card.querySelector('.card__image').alt = this._name;

        return this._card       
        
    }
}


export default Card;