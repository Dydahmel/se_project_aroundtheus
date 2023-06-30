!function(){"use strict";class e{constructor(e,t,s,r){this._name=e.name,this._link=e.link,this._cardSelector=t,this._handeImageClick=s,this._handleDeleteClick=r}_getTemplate(){return document.querySelector(this._cardSelector).content.querySelector(".card").cloneNode(!0)}_setEventListeners(){this._likeBtn=this._card.querySelector("#card_like-button"),this._deleteBtn=this._card.querySelector(".card__delete-btn"),this._image=this._card.querySelector(".card__image"),this._likeBtn.addEventListener("click",(()=>this._toggleLikeBtn())),this._deleteBtn.addEventListener("click",(()=>{this._removeCard(),this._handleDeleteClick()})),this._image.addEventListener("click",(()=>this._openImage()))}_openImage(){this._handeImageClick(this._link,this._name)}_toggleLikeBtn(){this._likeBtn.classList.toggle("card__like-button_enabled")}_removeCard(){this._card.remove(),this._card=null}getView(){return this._card=this._getTemplate(),this._setEventListeners(),this._image.src=this._link,this._image.alt=this._name,this._card.querySelector(".card__title").textContent=this._name,this._card}}const t={formSelector:".modal__form",inputSelector:".modal__input",submitButtonSelector:".modal__save-button",inactiveButtonClass:"modal__save-button-disabled",inputErrorClass:".modal__input-type-error",errorClass:"modal__error_visible",cardSectionClass:".cards__list",cardTeplate:".card__teplate"};class s{constructor(e,t){let{data:s,renderer:r}=e;this._renderedItems=s,this._renderer=r,this._container=document.querySelector(t)}addItem(e){this._container.prepend(e)}renderItems(){this._renderedItems.forEach((e=>{this._renderer(e)}))}}class r{constructor(e){let{popupSelector:t}=e;this._popupElement=document.querySelector(t)}open(){this._popupElement.classList.add("modal_opened"),document.addEventListener("keydown",this._closeByEsc)}close(){this._popupElement.classList.remove("modal_opened"),document.removeEventListener("keydown",this._closeByEsc)}_closeByEsc=e=>{"Escape"===e.key&&this.close()};setEventListeners(){this._popupElement.addEventListener("mousedown",(e=>{e.target.classList.contains("modal")&&this.close(),e.target.classList.contains("modal__close-button")&&this.close()}))}}class n extends r{constructor(e,s){super({popupSelector:e}),this._popupFormEl=this._popupElement.querySelector(t.formSelector),this._inputEls=this._popupFormEl.querySelectorAll(t.inputSelector),this._handleSubmit=s}setInputValues(e){this._inputEls.forEach((t=>{t.value=e[t.name]}))}close(){super.close(),this._popupFormEl.reset()}_getInputValues(){const e={};return this._inputEls.forEach((t=>{e[t.name]=t.value})),e}setEventListeners(){super.setEventListeners(),this._popupFormEl.addEventListener("submit",(()=>{this._handleSubmit(this._getInputValues())}))}}class i{constructor(e){let{title:t,subtitle:s}=e;this._nameEl=document.querySelector(t),this._jobEl=document.querySelector(s)}getUserInfo(){return{name:this._nameEl.textContent,about:this._jobEl.textContent}}setUserInfo(e){this._nameEl.textContent=e.name,this._jobEl.textContent=e.about}}const o=document.querySelector("#profile__add-button"),l=document.querySelector("#profile__edit-btn");let a,c;function _(t){const s=function(t){return new e(t,"#card__template",d,u).getView()}(t);a.addItem(s)}function d(e,t){E.open(e,t)}function u(){p.open()}const h=new class{constructor(e){this._baseUrl=e.baseUrl,this._headers=e.headers}_checkResponse(e){return e.ok?(console.log("its working"),e.json()):Promise.reject(`Error: ${e.status}`)}getInitialCards(){return fetch(`${this._baseUrl}/cards`,{headers:this._headers}).then(this._checkResponse)}getUserInfo(){return fetch(`${this._baseUrl}/users/me`,{headers:this._headers}).then(this._checkResponse)}updateUserInfo(e){fetch(`${this._baseUrl}/users/me`,{method:"PATCH",headers:this._headers,body:JSON.stringify({name:e.name,about:e.about})})}addNewCard(e){fetch(`${this._baseUrl}/cards`,{method:"POST",headers:this._headers,body:JSON.stringify({name:e.name,link:e.link})})}}({baseUrl:"https://around.nomoreparties.co/v1/group-12",headers:{authorization:"cd8b3986-f3d6-4da9-8f48-96bc48ae4bb7","Content-Type":"application/json"}});h.getUserInfo().then((e=>{c=new i({title:".profile__title",subtitle:".profile__subtitle"}),c.setUserInfo(e)})),h.getInitialCards().then((e=>{a=new s({data:e,renderer:e=>{_(e)}},t.cardSectionClass),a.renderItems()}));const m=new n("#profile__edit-modal",(e=>{c.setUserInfo(e),h.updateUserInfo(e),m.close()})),p=new class extends r{constructor(e){super({popupSelector:e})}setEventListeners(){super.setEventListeners(),this._popupElement.addEventListener("submit",(()=>{console.log("button is working")}))}}("#card__delete-modal"),E=new class extends r{constructor(e){super({popupSelector:e}),this._image=this._popupElement.querySelector(".modal__image"),this._caption=this._popupElement.querySelector(".modal__image-caption")}open(e,t){super.open(),this._image.src=e,this._image.alt=t,this._caption.textContent=t}}("#card__image-modal"),b=new n("#profile__add-modal",(e=>{h.addNewCard(e),_(e),b.close()})),v={};(e=>{Array.from(document.querySelectorAll(e.formSelector)).forEach((t=>{const s=new class{constructor(e,t){this._inputSelector=e.inputSelector,this._submitButtonSelector=e.submitButtonSelector,this._inactiveButtonClass=e.inactiveButtonClass,this._inputErrorClass=e.inputErrorClass,this._errorClass=e.errorClass,this._formElement=t,this._buttonEl=this._formElement.querySelector(this._submitButtonSelector),this._inputEls=[...this._formElement.querySelectorAll(this._inputSelector)]}_setEventListeners(){this._inputEls.forEach((e=>{e.addEventListener("input",(()=>{this._checkValidity(e),this._toggleSubmitBtn(e)})),this._disableSubmitBtn(),this._formElement.addEventListener("reset",(()=>{setTimeout((()=>{this._toggleSubmitBtn(e)}),0)}))}))}_checkValidity(e){e.validity.valid?this._hideInputError(e):this._showInputError(e)}_showInputError(e){const t=this._formElement.querySelector(`#${e.id}-error`);e.classList.add(this._inputErrorClass),t.textContent=e.validationMessage,t.classList.add(this._errorClass)}_hideInputError(e){const t=this._formElement.querySelector(`#${e.id}-error`);e.classList.remove(this._inputErrorClass),t.textContent="",t.classList.remove(this._errorClass)}_toggleSubmitBtn(){this._hasInvalidInput()?this._disableSubmitBtn():this._enableSubmitBtn()}_hasInvalidInput(){return!this._inputEls.every((e=>e.validity.valid))}_disableSubmitBtn(){this._buttonEl.classList.add(this._inactiveButtonClass),this._buttonEl.disabled=!0}_enableSubmitBtn(){this._buttonEl.classList.remove(this._inactiveButtonClass),this._buttonEl.disabled=!1}enableValidation(){this._formElement.addEventListener("submit",(e=>{e.preventDefault()})),this._setEventListeners()}}(e,t),r=t.getAttribute("name");v[r]=s,s.enableValidation()}))})(t),E.setEventListeners(),b.setEventListeners(),m.setEventListeners(),p.setEventListeners(),o.addEventListener("click",(()=>b.open())),l.addEventListener("click",(()=>{m.open(),m.setInputValues(c.getUserInfo())}))}();
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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QUFPeEIsS0FBS2tJLGtCQUM5QmEsRUFBYW5ILFlBQWMsR0FDM0JtSCxFQUFhekgsVUFBVUUsT0FBT3hCLEtBQUttSSxZQUNyQyxDQUVBSyxtQkFDTXhJLEtBQUtrSixtQkFDUGxKLEtBQUt5SSxvQkFFTHpJLEtBQUttSixrQkFFVCxDQUVBRCxtQkFDRSxPQUFRbEosS0FBS29FLFVBQVVnRixPQUFPZCxHQUFZQSxFQUFRSyxTQUFTQyxPQUM3RCxDQUVBSCxvQkFDRXpJLEtBQUtxSSxVQUFVL0csVUFBVWlDLElBQUl2RCxLQUFLaUksc0JBQ2xDakksS0FBS3FJLFVBQVVnQixVQUFXLENBQzVCLENBRUFGLG1CQUNFbkosS0FBS3FJLFVBQVUvRyxVQUFVRSxPQUFPeEIsS0FBS2lJLHNCQUNyQ2pJLEtBQUtxSSxVQUFVZ0IsVUFBVyxDQUM1QixDQUVBQyxtQkFDRXRKLEtBQUtvSSxhQUFhbEgsaUJBQWlCLFVBQVd5QyxJQUM1Q0EsRUFBSTRGLGdCQUFnQixJQUV0QnZKLEtBQUthLG9CQUNQLEdKNEJzQ2dCLEVBQVFnRyxHQUV0QzJCLEVBQVczQixFQUFZNEIsYUFBYSxRQUcxQy9CLEVBQWU4QixHQUFZMUIsRUFDM0JBLEVBQVV3QixrQkFBa0IsR0FDNUIsRUFHSkEsQ0FBaUJ6SCxHQUVqQitELEVBQVcvQixvQkFDWDRELEVBQWE1RCxvQkFDYjBELEVBQWMxRCxvQkFDZGdDLEVBQVloQyxvQkFDWndCLEVBQWNuRSxpQkFBaUIsU0FBUyxJQUFNdUcsRUFBYW5FLFNBQzNEZ0MsRUFBZXBFLGlCQUFpQixTQUFTLEtBQ3ZDcUcsRUFBY2pFLE9BQ2RpRSxFQUFjaEQsZUFBZWlCLEVBQVNOLGNBQWMsRyIsInNvdXJjZXMiOlsid2VicGFjazovL3ByYWN0aWN1bS8uL3NyYy9jb21wb25lbnRzL0NhcmQuanMiLCJ3ZWJwYWNrOi8vcHJhY3RpY3VtLy4vc3JjL3V0aWxzL2NvbnN0YW50cy5qcyIsIndlYnBhY2s6Ly9wcmFjdGljdW0vLi9zcmMvY29tcG9uZW50cy9TZWN0aW9uLmpzIiwid2VicGFjazovL3ByYWN0aWN1bS8uL3NyYy9jb21wb25lbnRzL1BvcHVwLmpzIiwid2VicGFjazovL3ByYWN0aWN1bS8uL3NyYy9jb21wb25lbnRzL1BvcHVwV2l0aEZvcm0uanMiLCJ3ZWJwYWNrOi8vcHJhY3RpY3VtLy4vc3JjL2NvbXBvbmVudHMvVXNlckluZm8uanMiLCJ3ZWJwYWNrOi8vcHJhY3RpY3VtLy4vc3JjL3BhZ2UvaW5kZXguanMiLCJ3ZWJwYWNrOi8vcHJhY3RpY3VtLy4vc3JjL2NvbXBvbmVudHMvQXBpLmpzIiwid2VicGFjazovL3ByYWN0aWN1bS8uL3NyYy9jb21wb25lbnRzL1BvcHVwRGVsZXRlLmpzIiwid2VicGFjazovL3ByYWN0aWN1bS8uL3NyYy9jb21wb25lbnRzL1BvcHVwV2l0aEltYWdlLmpzIiwid2VicGFjazovL3ByYWN0aWN1bS8uL3NyYy9jb21wb25lbnRzL0Zvcm1WYWxpZGF0b3IuanMiXSwic291cmNlc0NvbnRlbnQiOlsiZXhwb3J0IGRlZmF1bHQgY2xhc3MgQ2FyZCB7XHJcbiAgY29uc3RydWN0b3IoZGF0YSwgY2FyZFNlbGVjdG9yLCBoYW5kbGVJbWFnZUNsaWNrLCBoYW5kbGVEZWxldGVDbGljaykge1xyXG4gICAgdGhpcy5fbmFtZSA9IGRhdGEubmFtZTtcclxuICAgIHRoaXMuX2xpbmsgPSBkYXRhLmxpbms7XHJcbiAgICB0aGlzLl9jYXJkU2VsZWN0b3IgPSBjYXJkU2VsZWN0b3I7XHJcbiAgICB0aGlzLl9oYW5kZUltYWdlQ2xpY2sgPSBoYW5kbGVJbWFnZUNsaWNrO1xyXG4gICAgdGhpcy5faGFuZGxlRGVsZXRlQ2xpY2sgPSBoYW5kbGVEZWxldGVDbGljaztcclxuICB9XHJcblxyXG4gIF9nZXRUZW1wbGF0ZSgpIHtcclxuICAgIGNvbnN0IGNhcmRFbCA9IGRvY3VtZW50XHJcbiAgICAgIC5xdWVyeVNlbGVjdG9yKHRoaXMuX2NhcmRTZWxlY3RvcilcclxuICAgICAgLmNvbnRlbnQucXVlcnlTZWxlY3RvcihcIi5jYXJkXCIpXHJcbiAgICAgIC5jbG9uZU5vZGUodHJ1ZSk7XHJcbiAgICByZXR1cm4gY2FyZEVsO1xyXG4gIH1cclxuXHJcbiAgX3NldEV2ZW50TGlzdGVuZXJzKCkge1xyXG4gICAgdGhpcy5fbGlrZUJ0biA9IHRoaXMuX2NhcmQucXVlcnlTZWxlY3RvcihcIiNjYXJkX2xpa2UtYnV0dG9uXCIpO1xyXG4gICAgdGhpcy5fZGVsZXRlQnRuID0gdGhpcy5fY2FyZC5xdWVyeVNlbGVjdG9yKFwiLmNhcmRfX2RlbGV0ZS1idG5cIik7XHJcbiAgICB0aGlzLl9pbWFnZSA9IHRoaXMuX2NhcmQucXVlcnlTZWxlY3RvcihcIi5jYXJkX19pbWFnZVwiKTtcclxuICAgIHRoaXMuX2xpa2VCdG4uYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsICgpID0+IHRoaXMuX3RvZ2dsZUxpa2VCdG4oKSk7XHJcbiAgICB0aGlzLl9kZWxldGVCdG4uYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsICgpID0+IHt0aGlzLl9yZW1vdmVDYXJkKCk7IHRoaXMuX2hhbmRsZURlbGV0ZUNsaWNrKCl9KTtcclxuICAgIHRoaXMuX2ltYWdlLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCAoKSA9PiB0aGlzLl9vcGVuSW1hZ2UoKSk7XHJcbiAgfVxyXG5cclxuICBfb3BlbkltYWdlKCkge1xyXG4gICAgdGhpcy5faGFuZGVJbWFnZUNsaWNrKHRoaXMuX2xpbmssIHRoaXMuX25hbWUpO1xyXG4gIH1cclxuXHJcbiAgX3RvZ2dsZUxpa2VCdG4oKSB7XHJcbiAgICB0aGlzLl9saWtlQnRuLmNsYXNzTGlzdC50b2dnbGUoXCJjYXJkX19saWtlLWJ1dHRvbl9lbmFibGVkXCIpO1xyXG4gIH1cclxuXHJcbiAgX3JlbW92ZUNhcmQoKSB7XHJcbiAgICB0aGlzLl9jYXJkLnJlbW92ZSgpO1xyXG4gICAgdGhpcy5fY2FyZCA9IG51bGw7XHJcbiAgfVxyXG5cclxuICBnZXRWaWV3KCkge1xyXG4gICAgdGhpcy5fY2FyZCA9IHRoaXMuX2dldFRlbXBsYXRlKCk7XHJcbiAgICB0aGlzLl9zZXRFdmVudExpc3RlbmVycygpO1xyXG4gICAgdGhpcy5faW1hZ2Uuc3JjID0gdGhpcy5fbGluaztcclxuICAgIHRoaXMuX2ltYWdlLmFsdCA9IHRoaXMuX25hbWU7XHJcbiAgICB0aGlzLl9jYXJkLnF1ZXJ5U2VsZWN0b3IoXCIuY2FyZF9fdGl0bGVcIikudGV4dENvbnRlbnQgPSB0aGlzLl9uYW1lO1xyXG5cclxuICAgIHJldHVybiB0aGlzLl9jYXJkO1xyXG4gIH1cclxufVxyXG4iLCIvL3NlbGVjdG9ycyBmb3IgdmFsaWRhdGlvblxyXG5cclxuY29uc3QgY29uZmlnID0ge1xyXG4gIGZvcm1TZWxlY3RvcjogXCIubW9kYWxfX2Zvcm1cIixcclxuICBpbnB1dFNlbGVjdG9yOiBcIi5tb2RhbF9faW5wdXRcIixcclxuICBzdWJtaXRCdXR0b25TZWxlY3RvcjogXCIubW9kYWxfX3NhdmUtYnV0dG9uXCIsXHJcbiAgaW5hY3RpdmVCdXR0b25DbGFzczogXCJtb2RhbF9fc2F2ZS1idXR0b24tZGlzYWJsZWRcIixcclxuICBpbnB1dEVycm9yQ2xhc3M6IFwiLm1vZGFsX19pbnB1dC10eXBlLWVycm9yXCIsXHJcbiAgZXJyb3JDbGFzczogXCJtb2RhbF9fZXJyb3JfdmlzaWJsZVwiLFxyXG4gIGNhcmRTZWN0aW9uQ2xhc3M6IFwiLmNhcmRzX19saXN0XCIsXHJcbiAgY2FyZFRlcGxhdGU6IFwiLmNhcmRfX3RlcGxhdGVcIixcclxufTtcclxuXHJcbmNvbnN0IGluaXRpYWxDYXJkcyA9IFtcclxuICB7XHJcbiAgICBuYW1lOiBcIllvc2VtaXRlIFZhbGxleVwiLFxyXG4gICAgbGluazogXCJodHRwczovL2NvZGUuczMueWFuZGV4Lm5ldC93ZWItY29kZS95b3NlbWl0ZS5qcGdcIixcclxuICB9LFxyXG4gIHtcclxuICAgIG5hbWU6IFwiTGFrZSBMb3Vpc2VcIixcclxuICAgIGxpbms6IFwiaHR0cHM6Ly9jb2RlLnMzLnlhbmRleC5uZXQvd2ViLWNvZGUvbGFrZS1sb3Vpc2UuanBnXCIsXHJcbiAgfSxcclxuICB7XHJcbiAgICBuYW1lOiBcIkJhbGQgTW91bnRhaW5zXCIsXHJcbiAgICBsaW5rOiBcImh0dHBzOi8vY29kZS5zMy55YW5kZXgubmV0L3dlYi1jb2RlL2JhbGQtbW91bnRhaW5zLmpwZ1wiLFxyXG4gIH0sXHJcbiAge1xyXG4gICAgbmFtZTogXCJMYXRlbWFyXCIsXHJcbiAgICBsaW5rOiBcImh0dHBzOi8vY29kZS5zMy55YW5kZXgubmV0L3dlYi1jb2RlL2xhdGVtYXIuanBnXCIsXHJcbiAgfSxcclxuICB7XHJcbiAgICBuYW1lOiBcIlZhbm9pc2UgTmF0aW9uYWwgUGFya1wiLFxyXG4gICAgbGluazogXCJodHRwczovL2NvZGUuczMueWFuZGV4Lm5ldC93ZWItY29kZS92YW5vaXNlLmpwZ1wiLFxyXG4gIH0sXHJcbiAge1xyXG4gICAgbmFtZTogXCJMYWdvIGRpIEJyYWllc1wiLFxyXG4gICAgbGluazogXCJodHRwczovL2NvZGUuczMueWFuZGV4Lm5ldC93ZWItY29kZS9sYWdvLmpwZ1wiLFxyXG4gIH0sXHJcbl07XHJcblxyXG5leHBvcnQgeyBjb25maWcsIGluaXRpYWxDYXJkcyB9O1xyXG4iLCJleHBvcnQgZGVmYXVsdCBjbGFzcyBTZWN0aW9uIHtcclxuICBjb25zdHJ1Y3Rvcih7IGRhdGEsIHJlbmRlcmVyIH0sIGNhcmRMaXN0KSB7XHJcbiAgICB0aGlzLl9yZW5kZXJlZEl0ZW1zID0gZGF0YTtcclxuICAgIHRoaXMuX3JlbmRlcmVyID0gcmVuZGVyZXI7XHJcbiAgICB0aGlzLl9jb250YWluZXIgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKGNhcmRMaXN0KTtcclxuICB9XHJcblxyXG4gIGFkZEl0ZW0oZWxlbWVudCkge1xyXG4gICAgdGhpcy5fY29udGFpbmVyLnByZXBlbmQoZWxlbWVudCk7XHJcbiAgfVxyXG5cclxuICByZW5kZXJJdGVtcygpIHtcclxuICAgIHRoaXMuX3JlbmRlcmVkSXRlbXMuZm9yRWFjaCgoaXRlbSkgPT4ge1xyXG4gICAgICB0aGlzLl9yZW5kZXJlcihpdGVtKTtcclxuICAgIH0pO1xyXG4gIH1cclxufVxyXG4iLCJleHBvcnQgZGVmYXVsdCBjbGFzcyBQb3B1cCB7XHJcbiAgY29uc3RydWN0b3IoeyBwb3B1cFNlbGVjdG9yIH0pIHtcclxuICAgIHRoaXMuX3BvcHVwRWxlbWVudCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IocG9wdXBTZWxlY3Rvcik7XHJcbiAgfVxyXG4gIG9wZW4oKSB7XHJcbiAgICAvL29wZW4gcG9wdXBcclxuICAgIHRoaXMuX3BvcHVwRWxlbWVudC5jbGFzc0xpc3QuYWRkKFwibW9kYWxfb3BlbmVkXCIpO1xyXG4gICAgZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lcihcImtleWRvd25cIiwgdGhpcy5fY2xvc2VCeUVzYyk7XHJcbiAgfVxyXG4gIGNsb3NlKCkge1xyXG4gICAgLy9jbG9zZSBwb3B1cFxyXG4gICAgdGhpcy5fcG9wdXBFbGVtZW50LmNsYXNzTGlzdC5yZW1vdmUoXCJtb2RhbF9vcGVuZWRcIik7XHJcbiAgICBkb2N1bWVudC5yZW1vdmVFdmVudExpc3RlbmVyKFwia2V5ZG93blwiLCB0aGlzLl9jbG9zZUJ5RXNjKTtcclxuICB9XHJcbiAgX2Nsb3NlQnlFc2MgPSAoZXZ0KSA9PiB7XHJcbiAgICBpZiAoZXZ0LmtleSA9PT0gXCJFc2NhcGVcIikge1xyXG4gICAgICB0aGlzLmNsb3NlKCk7XHJcbiAgICB9XHJcbiAgfTtcclxuXHJcbiAgc2V0RXZlbnRMaXN0ZW5lcnMoKSB7XHJcbiAgICB0aGlzLl9wb3B1cEVsZW1lbnQuYWRkRXZlbnRMaXN0ZW5lcihcIm1vdXNlZG93blwiLCAoZXZ0KSA9PiB7XHJcbiAgICAgIGlmIChldnQudGFyZ2V0LmNsYXNzTGlzdC5jb250YWlucyhcIm1vZGFsXCIpKSB7XHJcbiAgICAgICAgdGhpcy5jbG9zZSgpO1xyXG4gICAgICB9XHJcbiAgICAgIGlmIChldnQudGFyZ2V0LmNsYXNzTGlzdC5jb250YWlucyhcIm1vZGFsX19jbG9zZS1idXR0b25cIikpIHtcclxuICAgICAgICB0aGlzLmNsb3NlKCk7XHJcbiAgICAgIH1cclxuICAgIH0pO1xyXG4gIH1cclxufVxyXG4iLCJpbXBvcnQgUG9wdXAgZnJvbSBcIi4vUG9wdXBcIjtcclxuaW1wb3J0IHsgY29uZmlnIH0gZnJvbSBcIi4uL3V0aWxzL2NvbnN0YW50cy5qc1wiO1xyXG5cclxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgUG9wdXBXaXRoRm9ybSBleHRlbmRzIFBvcHVwIHtcclxuICBjb25zdHJ1Y3Rvcihwb3B1cFNlbGVjdG9yLCBoYW5kbGVTdWJtaXQpIHtcclxuICAgIHN1cGVyKHsgcG9wdXBTZWxlY3RvciB9KTsgICAgXHJcbiAgICB0aGlzLl9wb3B1cEZvcm1FbCA9IHRoaXMuX3BvcHVwRWxlbWVudC5xdWVyeVNlbGVjdG9yKGNvbmZpZy5mb3JtU2VsZWN0b3IpO1xyXG4gICAgdGhpcy5faW5wdXRFbHMgPSB0aGlzLl9wb3B1cEZvcm1FbC5xdWVyeVNlbGVjdG9yQWxsKGNvbmZpZy5pbnB1dFNlbGVjdG9yKTtcclxuICAgIHRoaXMuX2hhbmRsZVN1Ym1pdCA9IGhhbmRsZVN1Ym1pdDsgICAgXHJcbiAgfVxyXG4gIHNldElucHV0VmFsdWVzKGRhdGEpIHtcclxuICAgIHRoaXMuX2lucHV0RWxzLmZvckVhY2goKGlucHV0KSA9PiB7XHJcbiAgICAgIC8vIGhlcmUgeW91IGluc2VydCB0aGUgYHZhbHVlYCBieSB0aGUgYG5hbWVgIG9mIHRoZSBpbnB1dFxyXG4gICAgICBpbnB1dC52YWx1ZSA9IGRhdGFbaW5wdXQubmFtZV07XHJcbiAgICB9KTtcclxuICB9XHJcblxyXG4gIGNsb3NlKCkge1xyXG4gICAgc3VwZXIuY2xvc2UoKTtcclxuICAgIHRoaXMuX3BvcHVwRm9ybUVsLnJlc2V0KCk7XHJcbiAgfSAgXHJcblxyXG4gIF9nZXRJbnB1dFZhbHVlcygpIHtcclxuICAgIGNvbnN0IGlucHV0VmFsdWVzID0ge307XHJcbiAgICAvL2dldCBhbGwgaW5wdXRzICAgIFxyXG4gICAgLy9sb29wIG92ZXIgYWxsIGlucHV0c1xyXG4gICAgdGhpcy5faW5wdXRFbHMuZm9yRWFjaCgoaW5wdXQpID0+IHtcclxuICAgICAgLy9hc3NpZ24gaW5wdXRzIHRvIGVtcHR5IG9iamVjdCBieSBuYW1lPXZhbHVlXHJcbiAgICAgIGlucHV0VmFsdWVzW2lucHV0Lm5hbWVdID0gaW5wdXQudmFsdWU7XHJcbiAgICB9KTtcclxuICAgIHJldHVybiBpbnB1dFZhbHVlcztcclxuICB9XHJcblxyXG4gIHNldEV2ZW50TGlzdGVuZXJzKCkge1xyXG4gICAgc3VwZXIuc2V0RXZlbnRMaXN0ZW5lcnMoKTtcclxuICAgIHRoaXMuX3BvcHVwRm9ybUVsLmFkZEV2ZW50TGlzdGVuZXIoXCJzdWJtaXRcIiwgKCkgPT4ge1xyXG4gICAgICB0aGlzLl9oYW5kbGVTdWJtaXQodGhpcy5fZ2V0SW5wdXRWYWx1ZXMoKSk7XHJcbiAgICB9KTtcclxuICB9XHJcbn1cclxuIiwiZXhwb3J0IGRlZmF1bHQgY2xhc3MgVXNlckluZm8ge1xyXG4gIGNvbnN0cnVjdG9yKHsgdGl0bGUsIHN1YnRpdGxlIH0pIHtcclxuICAgIHRoaXMuX25hbWVFbCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IodGl0bGUpO1xyXG4gICAgdGhpcy5fam9iRWwgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKHN1YnRpdGxlKTtcclxuICB9XHJcbiAgXHJcbiAgZ2V0VXNlckluZm8oKSB7XHJcbiAgICByZXR1cm4ge1xyXG4gICAgICBuYW1lOiB0aGlzLl9uYW1lRWwudGV4dENvbnRlbnQsXHJcbiAgICAgIGFib3V0OiB0aGlzLl9qb2JFbC50ZXh0Q29udGVudCxcclxuICAgIH07XHJcbiAgfVxyXG4gIHNldFVzZXJJbmZvKHZhbHVlKSB7XHJcbiAgICBcclxuICAgIC8vc2V0IHVzZXIgaW5mbyBmcm9tIHZhbHVlXHJcbiAgICB0aGlzLl9uYW1lRWwudGV4dENvbnRlbnQgPSB2YWx1ZS5uYW1lO1xyXG4gICAgdGhpcy5fam9iRWwudGV4dENvbnRlbnQgPSB2YWx1ZS5hYm91dDtcclxuICB9XHJcbn1cclxuIiwiLy9idXQgd2h5IHdlIGNhbm5vdCBqdXN0IHVzZSBUQUIgaW5kZW50YXRpb24gb24gY29kZSBmb3JtYXR0aW5nPyB3aHkgaXQgc2hvdWxkIGJlIGRvdWJsZSBzcGFjZT9cclxuaW1wb3J0IEZvcm1WYWxpZGF0b3IgZnJvbSBcIi4uL2NvbXBvbmVudHMvRm9ybVZhbGlkYXRvci5qc1wiO1xyXG5pbXBvcnQgQ2FyZCBmcm9tIFwiLi4vY29tcG9uZW50cy9DYXJkLmpzXCI7XHJcbmltcG9ydCB7IGNvbmZpZyB9IGZyb20gXCIuLi91dGlscy9jb25zdGFudHMuanNcIjtcclxuaW1wb3J0IFNlY3Rpb24gZnJvbSBcIi4uL2NvbXBvbmVudHMvU2VjdGlvbi5qc1wiO1xyXG5pbXBvcnQgUG9wdXBXaXRoSW1hZ2UgZnJvbSBcIi4uL2NvbXBvbmVudHMvUG9wdXBXaXRoSW1hZ2UuanNcIjtcclxuaW1wb3J0IFBvcHVwV2l0aEZvcm0gZnJvbSBcIi4uL2NvbXBvbmVudHMvUG9wdXBXaXRoRm9ybS5qc1wiO1xyXG5pbXBvcnQgVXNlckluZm8gZnJvbSBcIi4uL2NvbXBvbmVudHMvVXNlckluZm8uanNcIjtcclxuaW1wb3J0IEFwaSBmcm9tIFwiLi4vY29tcG9uZW50cy9BcGkuanNcIjtcclxuaW1wb3J0IFBvcHB1ckRlbGV0ZSBmcm9tIFwiLi4vY29tcG9uZW50cy9Qb3B1cERlbGV0ZS5qc1wiO1xyXG5pbXBvcnQgXCIuLi9wYWdlL2luZGV4LmNzc1wiO1xyXG5cclxuY29uc3QgcHJvZmlsZUFkZEJ0biA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIjcHJvZmlsZV9fYWRkLWJ1dHRvblwiKTtcclxuY29uc3QgcHJvZmlsZUVkaXRCdG4gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiI3Byb2ZpbGVfX2VkaXQtYnRuXCIpO1xyXG4vL3BsYWNlaG9sZGVyIGZvciBzZWN0aW9uXHJcbmxldCBjYXJkU2VjdGlvbjtcclxuLy9wbGFjZWhvbGRlciBmb3IgdXNlckluZm9cclxubGV0IHVzZXJJbmZvO1xyXG5cclxuZnVuY3Rpb24gY3JlYXRlQ2FyZChpdGVtKSB7XHJcbiAgY29uc3QgY2FyZEVsZW1lbnQgPSBuZXcgQ2FyZChcclxuICAgIGl0ZW0sXHJcbiAgICBcIiNjYXJkX190ZW1wbGF0ZVwiLFxyXG4gICAgaGFuZGxlSW1hZ2VDbGljayxcclxuICAgIGhhbmRsZURlbGV0ZUNsaWNrXHJcbiAgKS5nZXRWaWV3KCk7XHJcbiAgcmV0dXJuIGNhcmRFbGVtZW50O1xyXG59XHJcblxyXG5mdW5jdGlvbiByZW5kZXJDYXJkKGl0ZW0pIHtcclxuICBjb25zdCBjYXJkID0gY3JlYXRlQ2FyZChpdGVtKTtcclxuICBjYXJkU2VjdGlvbi5hZGRJdGVtKGNhcmQpO1xyXG59XHJcblxyXG5mdW5jdGlvbiBoYW5kbGVJbWFnZUNsaWNrKG5hbWUsIGxpbmspIHtcclxuICBwb3B1cEltYWdlLm9wZW4obmFtZSwgbGluayk7XHJcbn1cclxuXHJcbmZ1bmN0aW9uIGhhbmRsZURlbGV0ZUNsaWNrKCl7XHJcbiAgcG9wdXBEZWxldGUub3BlbigpXHJcbn1cclxuXHJcblxyXG5cclxuXHJcblxyXG4vL25ldyBpbnN0IG9mIEFQSShzZXQgb3B0aW9ucylcclxuY29uc3QgYXBpID0gbmV3IEFwaSh7XHJcbiAgYmFzZVVybDogXCJodHRwczovL2Fyb3VuZC5ub21vcmVwYXJ0aWVzLmNvL3YxL2dyb3VwLTEyXCIsXHJcbiAgaGVhZGVyczoge1xyXG4gICAgYXV0aG9yaXphdGlvbjogXCJjZDhiMzk4Ni1mM2Q2LTRkYTktOGY0OC05NmJjNDhhZTRiYjdcIixcclxuICAgIFwiQ29udGVudC1UeXBlXCI6IFwiYXBwbGljYXRpb24vanNvblwiLFxyXG4gIH0sXHJcbn0pO1xyXG5cclxuYXBpLmdldFVzZXJJbmZvKCkudGhlbigocmVzKSA9PiB7XHJcbiAgLy9uZXcgVXNlckluZm8gXHJcbiAgdXNlckluZm8gPSBuZXcgVXNlckluZm8oe1xyXG4gICAgdGl0bGU6IFwiLnByb2ZpbGVfX3RpdGxlXCIsXHJcbiAgICBzdWJ0aXRsZTogXCIucHJvZmlsZV9fc3VidGl0bGVcIixcclxuICB9KTtcclxuICAvL3NldHRpbmcgdXNlckluZm8gZnJvbSBzZXJ2ZXJcclxuICB1c2VySW5mby5zZXRVc2VySW5mbyhyZXMpXHJcbn0pXHJcblxyXG4vLyBsb2FkZWQgY2FyZHMgZnJvbSBzZXJ2ZXJcclxuYXBpLmdldEluaXRpYWxDYXJkcygpLnRoZW4oKHJlcykgPT4ge1xyXG4gIC8vbmV3IHNlY3Rpb25cclxuICBjYXJkU2VjdGlvbiA9IG5ldyBTZWN0aW9uKFxyXG4gICAge1xyXG4gICAgICAvL3VzaW5nIGRhdGEgZnJvbSBzZXJ2ZXJcclxuICAgICAgZGF0YTogcmVzLFxyXG4gICAgICByZW5kZXJlcjogKGl0ZW0pID0+IHtcclxuICAgICAgICByZW5kZXJDYXJkKGl0ZW0pO1xyXG4gICAgICB9LFxyXG4gICAgfSxcclxuICAgIGNvbmZpZy5jYXJkU2VjdGlvbkNsYXNzXHJcbiAgKTtcclxuICBjYXJkU2VjdGlvbi5yZW5kZXJJdGVtcygpO1xyXG59KTtcclxuXHJcblxyXG5jb25zdCBwb3B1cEVkaXRGb3JtID0gbmV3IFBvcHVwV2l0aEZvcm0oXHJcbiAgXCIjcHJvZmlsZV9fZWRpdC1tb2RhbFwiLFxyXG4gIChpbnB1dFZhbHVlcykgPT4ge1xyXG4gICAgdXNlckluZm8uc2V0VXNlckluZm8oaW5wdXRWYWx1ZXMpO1xyXG4gICAgLy91cGRhdGluZyB1c2VySW5mbyAob24/YXQ/aW4pIHNlcnZlclxyXG4gICAgYXBpLnVwZGF0ZVVzZXJJbmZvKGlucHV0VmFsdWVzKVxyXG4gICAgcG9wdXBFZGl0Rm9ybS5jbG9zZSgpO1xyXG4gIH1cclxuKTtcclxuXHJcblxyXG5cclxuY29uc3QgcG9wdXBEZWxldGUgPSBuZXcgUG9wcHVyRGVsZXRlKFwiI2NhcmRfX2RlbGV0ZS1tb2RhbFwiKTtcclxuXHJcbmNvbnN0IHBvcHVwSW1hZ2UgPSBuZXcgUG9wdXBXaXRoSW1hZ2UoXCIjY2FyZF9faW1hZ2UtbW9kYWxcIik7XHJcblxyXG5jb25zdCBwb3B1cEFkZEZvcm0gPSBuZXcgUG9wdXBXaXRoRm9ybShcIiNwcm9maWxlX19hZGQtbW9kYWxcIiwgKGlucHV0VmFsdWVzKSA9PiB7XHJcbiAgYXBpLmFkZE5ld0NhcmQoaW5wdXRWYWx1ZXMpXHJcbiAgcmVuZGVyQ2FyZChpbnB1dFZhbHVlcyk7XHJcbiAgcG9wdXBBZGRGb3JtLmNsb3NlKCk7XHJcbn0pO1xyXG5cclxuXHJcblxyXG5cclxuXHJcblxyXG5jb25zdCBmb3JtVmFsaWRhdG9ycyA9IHt9O1xyXG5cclxuLy8gZW5hYmxlIHZhbGlkYXRpb25cclxuY29uc3QgZW5hYmxlVmFsaWRhdGlvbiA9IChjb25maWcpID0+IHtcclxuICBjb25zdCBmb3JtTGlzdCA9IEFycmF5LmZyb20oZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbChjb25maWcuZm9ybVNlbGVjdG9yKSk7XHJcbiAgZm9ybUxpc3QuZm9yRWFjaCgoZm9ybUVsZW1lbnQpID0+IHtcclxuICAgIGNvbnN0IHZhbGlkYXRvciA9IG5ldyBGb3JtVmFsaWRhdG9yKGNvbmZpZywgZm9ybUVsZW1lbnQpO1xyXG4gICAgLy8gaGVyZSB5b3UgZ2V0IHRoZSBuYW1lIG9mIHRoZSBmb3JtXHJcbiAgICBjb25zdCBmb3JtTmFtZSA9IGZvcm1FbGVtZW50LmdldEF0dHJpYnV0ZShcIm5hbWVcIik7XHJcblxyXG4gICAgLy8gaGVyZSB5b3Ugc3RvcmUgYSB2YWxpZGF0b3IgYnkgdGhlIGBuYW1lYCBvZiB0aGUgZm9ybVxyXG4gICAgZm9ybVZhbGlkYXRvcnNbZm9ybU5hbWVdID0gdmFsaWRhdG9yO1xyXG4gICAgdmFsaWRhdG9yLmVuYWJsZVZhbGlkYXRpb24oKTtcclxuICB9KTtcclxufTtcclxuXHJcbmVuYWJsZVZhbGlkYXRpb24oY29uZmlnKTtcclxuXHJcbnBvcHVwSW1hZ2Uuc2V0RXZlbnRMaXN0ZW5lcnMoKTtcclxucG9wdXBBZGRGb3JtLnNldEV2ZW50TGlzdGVuZXJzKCk7XHJcbnBvcHVwRWRpdEZvcm0uc2V0RXZlbnRMaXN0ZW5lcnMoKTtcclxucG9wdXBEZWxldGUuc2V0RXZlbnRMaXN0ZW5lcnMoKTtcclxucHJvZmlsZUFkZEJ0bi5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgKCkgPT4gcG9wdXBBZGRGb3JtLm9wZW4oKSk7XHJcbnByb2ZpbGVFZGl0QnRuLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCAoKSA9PiB7XHJcbiAgcG9wdXBFZGl0Rm9ybS5vcGVuKCk7XHJcbiAgcG9wdXBFZGl0Rm9ybS5zZXRJbnB1dFZhbHVlcyh1c2VySW5mby5nZXRVc2VySW5mbygpKTtcclxufSk7XHJcbiIsImV4cG9ydCBkZWZhdWx0IGNsYXNzIEFwaSB7XHJcbiAgICBjb25zdHJ1Y3RvcihvcHRpb25zKXtcclxuICAgICAgICB0aGlzLl9iYXNlVXJsID0gb3B0aW9ucy5iYXNlVXJsO1xyXG4gICAgICAgIHRoaXMuX2hlYWRlcnMgPSBvcHRpb25zLmhlYWRlcnM7XHJcblxyXG4gICAgfVxyXG5cclxuICAgIF9jaGVja1Jlc3BvbnNlKHJlcykge1xyXG4gICAgICAgIGlmIChyZXMub2spIHtcclxuICAgICAgICAgIGNvbnNvbGUubG9nKFwiaXRzIHdvcmtpbmdcIilcclxuICAgICAgICAgIHJldHVybiByZXMuanNvbigpO1xyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gUHJvbWlzZS5yZWplY3QoYEVycm9yOiAke3Jlcy5zdGF0dXN9YCk7XHJcbiAgICB9XHJcbiAgICBcclxuXHJcbiAgICBnZXRJbml0aWFsQ2FyZHMoKXtcclxuICAgICAgcmV0dXJuIGZldGNoKGAke3RoaXMuX2Jhc2VVcmx9L2NhcmRzYCx7XHJcbiAgICAgICAgaGVhZGVyczogdGhpcy5faGVhZGVyc1xyXG4gICAgICB9KVxyXG4gICAgICAudGhlbih0aGlzLl9jaGVja1Jlc3BvbnNlKSBcclxuICAgIH1cclxuXHJcbiAgICBnZXRVc2VySW5mbygpe1xyXG4gICAgICByZXR1cm4gZmV0Y2goYCR7dGhpcy5fYmFzZVVybH0vdXNlcnMvbWVgLHtcclxuICAgICAgICBoZWFkZXJzOiB0aGlzLl9oZWFkZXJzXHJcbiAgICAgIH0pXHJcbiAgICAgIC50aGVuKHRoaXMuX2NoZWNrUmVzcG9uc2UpXHJcbiAgICB9XHJcblxyXG5cclxuICAgIHVwZGF0ZVVzZXJJbmZvKGlucHV0KXtcclxuICAgICAgZmV0Y2goYCR7dGhpcy5fYmFzZVVybH0vdXNlcnMvbWVgLCB7XHJcbiAgICAgICAgbWV0aG9kOiBcIlBBVENIXCIsXHJcbiAgICAgICAgaGVhZGVyczogdGhpcy5faGVhZGVycyxcclxuICAgICAgICBib2R5OiBKU09OLnN0cmluZ2lmeSh7XHJcbiAgICAgICAgICBuYW1lOiBpbnB1dC5uYW1lICxcclxuICAgICAgICAgIGFib3V0OiBpbnB1dC5hYm91dFxyXG4gICAgICAgIH0pXHJcbiAgICAgIH0pO1xyXG4gICAgfVxyXG5cclxuICAgIGFkZE5ld0NhcmQoaW5wdXQpe1xyXG4gICAgICBmZXRjaChgJHt0aGlzLl9iYXNlVXJsfS9jYXJkc2AsIHtcclxuICAgICAgICBtZXRob2Q6IFwiUE9TVFwiLFxyXG4gICAgICAgIGhlYWRlcnM6IHRoaXMuX2hlYWRlcnMsXHJcbiAgICAgICAgYm9keTogSlNPTi5zdHJpbmdpZnkoe1xyXG4gICAgICAgICAgbmFtZTogaW5wdXQubmFtZSxcclxuICAgICAgICAgIGxpbms6IGlucHV0LmxpbmtcclxuICAgICAgICB9KVxyXG4gICAgICB9KVxyXG4gICAgfVxyXG59XHJcblxyXG5cclxuXHJcbiIsImltcG9ydCBQb3B1cCBmcm9tIFwiLi9Qb3B1cFwiO1xyXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBQb3BwdXJEZWxldGUgZXh0ZW5kcyBQb3B1cHtcclxuICAgIGNvbnN0cnVjdG9yKHBvcHVwU2VsZWN0b3Ipe1xyXG4gICAgICAgIHN1cGVyKHtwb3B1cFNlbGVjdG9yfSlcclxuICAgICAgICBcclxuICAgICAgICBcclxuICAgIH1cclxuXHJcbiAgICBzZXRFdmVudExpc3RlbmVycygpe1xyXG4gICAgICAgIHN1cGVyLnNldEV2ZW50TGlzdGVuZXJzKClcclxuICAgICAgICB0aGlzLl9wb3B1cEVsZW1lbnQuYWRkRXZlbnRMaXN0ZW5lcihcInN1Ym1pdFwiLCAoKSA9PiB7XHJcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKCdidXR0b24gaXMgd29ya2luZycpXHJcbiAgICAgICAgfSk7XHJcbiAgICB9XHJcblxyXG4gICAgXHJcbn07IiwiaW1wb3J0IFBvcHVwIGZyb20gXCIuL1BvcHVwXCI7XHJcblxyXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBQb3B1cFdpdGhJbWFnZSBleHRlbmRzIFBvcHVwIHtcclxuICBjb25zdHJ1Y3Rvcihwb3B1cFNlbGVjdG9yKSB7XHJcbiAgICBzdXBlcih7IHBvcHVwU2VsZWN0b3IgfSk7XHJcbiAgICB0aGlzLl9pbWFnZSA9IHRoaXMuX3BvcHVwRWxlbWVudC5xdWVyeVNlbGVjdG9yKFwiLm1vZGFsX19pbWFnZVwiKTtcclxuICAgIHRoaXMuX2NhcHRpb24gPSB0aGlzLl9wb3B1cEVsZW1lbnQucXVlcnlTZWxlY3RvcihcIi5tb2RhbF9faW1hZ2UtY2FwdGlvblwiKTtcclxuICB9XHJcbiAgb3BlbihuYW1lLCBsaW5rKSB7XHJcbiAgICBzdXBlci5vcGVuKCk7ICAgIFxyXG4gICAgdGhpcy5faW1hZ2Uuc3JjID0gbmFtZTtcclxuICAgIHRoaXMuX2ltYWdlLmFsdCA9IGxpbms7XHJcbiAgICB0aGlzLl9jYXB0aW9uLnRleHRDb250ZW50ID0gbGluaztcclxuICB9XHJcbn1cclxuIiwiY2xhc3MgRm9ybVZhbGlkYXRvciB7XHJcbiAgY29uc3RydWN0b3IoY29uZmlnLCBmb3JtRWxlbWVudCkge1xyXG4gICAgdGhpcy5faW5wdXRTZWxlY3RvciA9IGNvbmZpZy5pbnB1dFNlbGVjdG9yO1xyXG4gICAgdGhpcy5fc3VibWl0QnV0dG9uU2VsZWN0b3IgPSBjb25maWcuc3VibWl0QnV0dG9uU2VsZWN0b3I7XHJcbiAgICB0aGlzLl9pbmFjdGl2ZUJ1dHRvbkNsYXNzID0gY29uZmlnLmluYWN0aXZlQnV0dG9uQ2xhc3M7XHJcbiAgICB0aGlzLl9pbnB1dEVycm9yQ2xhc3MgPSBjb25maWcuaW5wdXRFcnJvckNsYXNzO1xyXG4gICAgdGhpcy5fZXJyb3JDbGFzcyA9IGNvbmZpZy5lcnJvckNsYXNzO1xyXG4gICAgdGhpcy5fZm9ybUVsZW1lbnQgPSBmb3JtRWxlbWVudDtcclxuICAgIHRoaXMuX2J1dHRvbkVsID0gdGhpcy5fZm9ybUVsZW1lbnQucXVlcnlTZWxlY3RvcihcclxuICAgICAgdGhpcy5fc3VibWl0QnV0dG9uU2VsZWN0b3JcclxuICAgICk7XHJcbiAgICB0aGlzLl9pbnB1dEVscyA9IFtcclxuICAgICAgLi4udGhpcy5fZm9ybUVsZW1lbnQucXVlcnlTZWxlY3RvckFsbCh0aGlzLl9pbnB1dFNlbGVjdG9yKSxcclxuICAgIF07XHJcbiAgfVxyXG5cclxuICBfc2V0RXZlbnRMaXN0ZW5lcnMoKSB7XHJcbiAgICB0aGlzLl9pbnB1dEVscy5mb3JFYWNoKChpbnB1dEVsKSA9PiB7XHJcbiAgICAgIGlucHV0RWwuYWRkRXZlbnRMaXN0ZW5lcihcImlucHV0XCIsICgpID0+IHtcclxuICAgICAgICB0aGlzLl9jaGVja1ZhbGlkaXR5KGlucHV0RWwpO1xyXG4gICAgICAgIHRoaXMuX3RvZ2dsZVN1Ym1pdEJ0bihpbnB1dEVsKTtcclxuICAgICAgfSk7XHJcbiAgICAgIHRoaXMuX2Rpc2FibGVTdWJtaXRCdG4oKTtcclxuICAgICAgLy9yZXNldCBcImV2ZW50XCJcclxuICAgICAgdGhpcy5fZm9ybUVsZW1lbnQuYWRkRXZlbnRMaXN0ZW5lcihcInJlc2V0XCIsICgpID0+IHtcclxuICAgICAgICAvLyBgc2V0VGltZW91dGAgaXMgbmVlZGVkIHRvIHdhaXQgdGlsbCB0aGUgZm9ybSBpcyBmdWxseSByZXNldCBhbmQgdGhlbiB0byBjYWxsIGB0b2dnbGVCdXR0b25TdGF0ZWBcclxuICAgICAgICBzZXRUaW1lb3V0KCgpID0+IHtcclxuICAgICAgICAgIHRoaXMuX3RvZ2dsZVN1Ym1pdEJ0bihpbnB1dEVsKTtcclxuICAgICAgICB9LCAwKTtcclxuICAgICAgfSk7XHJcbiAgICB9KTtcclxuICB9XHJcblxyXG4gIF9jaGVja1ZhbGlkaXR5KGlucHV0RWwpIHtcclxuICAgIC8vdGFraW5nIGlucHV0RWwgZnJvbSBldmVudCBsaXNlbmVyc1xyXG4gICAgaWYgKCFpbnB1dEVsLnZhbGlkaXR5LnZhbGlkKSB7XHJcbiAgICAgIHRoaXMuX3Nob3dJbnB1dEVycm9yKGlucHV0RWwpO1xyXG4gICAgfSBlbHNlIHtcclxuICAgICAgdGhpcy5faGlkZUlucHV0RXJyb3IoaW5wdXRFbCk7XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICBfc2hvd0lucHV0RXJyb3IoaW5wdXRFbCkge1xyXG4gICAgY29uc3QgZXJyb3JNZXNzYWdlID0gdGhpcy5fZm9ybUVsZW1lbnQucXVlcnlTZWxlY3RvcihcclxuICAgICAgYCMke2lucHV0RWwuaWR9LWVycm9yYFxyXG4gICAgKTtcclxuICAgIGlucHV0RWwuY2xhc3NMaXN0LmFkZCh0aGlzLl9pbnB1dEVycm9yQ2xhc3MpO1xyXG4gICAgZXJyb3JNZXNzYWdlLnRleHRDb250ZW50ID0gaW5wdXRFbC52YWxpZGF0aW9uTWVzc2FnZTtcclxuICAgIGVycm9yTWVzc2FnZS5jbGFzc0xpc3QuYWRkKHRoaXMuX2Vycm9yQ2xhc3MpO1xyXG4gIH1cclxuXHJcbiAgX2hpZGVJbnB1dEVycm9yKGlucHV0RWwpIHtcclxuICAgIGNvbnN0IGVycm9yTWVzc2FnZSA9IHRoaXMuX2Zvcm1FbGVtZW50LnF1ZXJ5U2VsZWN0b3IoXHJcbiAgICAgIGAjJHtpbnB1dEVsLmlkfS1lcnJvcmBcclxuICAgICk7XHJcbiAgICBpbnB1dEVsLmNsYXNzTGlzdC5yZW1vdmUodGhpcy5faW5wdXRFcnJvckNsYXNzKTtcclxuICAgIGVycm9yTWVzc2FnZS50ZXh0Q29udGVudCA9IFwiXCI7XHJcbiAgICBlcnJvck1lc3NhZ2UuY2xhc3NMaXN0LnJlbW92ZSh0aGlzLl9lcnJvckNsYXNzKTtcclxuICB9XHJcblxyXG4gIF90b2dnbGVTdWJtaXRCdG4oKSB7XHJcbiAgICBpZiAodGhpcy5faGFzSW52YWxpZElucHV0KCkpIHtcclxuICAgICAgdGhpcy5fZGlzYWJsZVN1Ym1pdEJ0bigpO1xyXG4gICAgfSBlbHNlIHtcclxuICAgICAgdGhpcy5fZW5hYmxlU3VibWl0QnRuKCk7XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICBfaGFzSW52YWxpZElucHV0KCkge1xyXG4gICAgcmV0dXJuICF0aGlzLl9pbnB1dEVscy5ldmVyeSgoaW5wdXRFbCkgPT4gaW5wdXRFbC52YWxpZGl0eS52YWxpZCk7XHJcbiAgfVxyXG5cclxuICBfZGlzYWJsZVN1Ym1pdEJ0bigpIHtcclxuICAgIHRoaXMuX2J1dHRvbkVsLmNsYXNzTGlzdC5hZGQodGhpcy5faW5hY3RpdmVCdXR0b25DbGFzcyk7XHJcbiAgICB0aGlzLl9idXR0b25FbC5kaXNhYmxlZCA9IHRydWU7XHJcbiAgfVxyXG5cclxuICBfZW5hYmxlU3VibWl0QnRuKCkge1xyXG4gICAgdGhpcy5fYnV0dG9uRWwuY2xhc3NMaXN0LnJlbW92ZSh0aGlzLl9pbmFjdGl2ZUJ1dHRvbkNsYXNzKTtcclxuICAgIHRoaXMuX2J1dHRvbkVsLmRpc2FibGVkID0gZmFsc2U7XHJcbiAgfVxyXG5cclxuICBlbmFibGVWYWxpZGF0aW9uKCkge1xyXG4gICAgdGhpcy5fZm9ybUVsZW1lbnQuYWRkRXZlbnRMaXN0ZW5lcihcInN1Ym1pdFwiLCAoZXZ0KSA9PiB7XHJcbiAgICAgIGV2dC5wcmV2ZW50RGVmYXVsdCgpO1xyXG4gICAgfSk7XHJcbiAgICB0aGlzLl9zZXRFdmVudExpc3RlbmVycygpO1xyXG4gIH1cclxufVxyXG5cclxuZXhwb3J0IGRlZmF1bHQgRm9ybVZhbGlkYXRvcjtcclxuIl0sIm5hbWVzIjpbIkNhcmQiLCJjb25zdHJ1Y3RvciIsImRhdGEiLCJjYXJkU2VsZWN0b3IiLCJoYW5kbGVJbWFnZUNsaWNrIiwiaGFuZGxlRGVsZXRlQ2xpY2siLCJ0aGlzIiwiX25hbWUiLCJuYW1lIiwiX2xpbmsiLCJsaW5rIiwiX2NhcmRTZWxlY3RvciIsIl9oYW5kZUltYWdlQ2xpY2siLCJfaGFuZGxlRGVsZXRlQ2xpY2siLCJfZ2V0VGVtcGxhdGUiLCJkb2N1bWVudCIsInF1ZXJ5U2VsZWN0b3IiLCJjb250ZW50IiwiY2xvbmVOb2RlIiwiX3NldEV2ZW50TGlzdGVuZXJzIiwiX2xpa2VCdG4iLCJfY2FyZCIsIl9kZWxldGVCdG4iLCJfaW1hZ2UiLCJhZGRFdmVudExpc3RlbmVyIiwiX3RvZ2dsZUxpa2VCdG4iLCJfcmVtb3ZlQ2FyZCIsIl9vcGVuSW1hZ2UiLCJjbGFzc0xpc3QiLCJ0b2dnbGUiLCJyZW1vdmUiLCJnZXRWaWV3Iiwic3JjIiwiYWx0IiwidGV4dENvbnRlbnQiLCJjb25maWciLCJmb3JtU2VsZWN0b3IiLCJpbnB1dFNlbGVjdG9yIiwic3VibWl0QnV0dG9uU2VsZWN0b3IiLCJpbmFjdGl2ZUJ1dHRvbkNsYXNzIiwiaW5wdXRFcnJvckNsYXNzIiwiZXJyb3JDbGFzcyIsImNhcmRTZWN0aW9uQ2xhc3MiLCJjYXJkVGVwbGF0ZSIsIlNlY3Rpb24iLCJfcmVmIiwiY2FyZExpc3QiLCJyZW5kZXJlciIsIl9yZW5kZXJlZEl0ZW1zIiwiX3JlbmRlcmVyIiwiX2NvbnRhaW5lciIsImFkZEl0ZW0iLCJlbGVtZW50IiwicHJlcGVuZCIsInJlbmRlckl0ZW1zIiwiZm9yRWFjaCIsIml0ZW0iLCJQb3B1cCIsInBvcHVwU2VsZWN0b3IiLCJfcG9wdXBFbGVtZW50Iiwib3BlbiIsImFkZCIsIl9jbG9zZUJ5RXNjIiwiY2xvc2UiLCJyZW1vdmVFdmVudExpc3RlbmVyIiwiZXZ0Iiwia2V5Iiwic2V0RXZlbnRMaXN0ZW5lcnMiLCJ0YXJnZXQiLCJjb250YWlucyIsIlBvcHVwV2l0aEZvcm0iLCJoYW5kbGVTdWJtaXQiLCJzdXBlciIsIl9wb3B1cEZvcm1FbCIsIl9pbnB1dEVscyIsInF1ZXJ5U2VsZWN0b3JBbGwiLCJfaGFuZGxlU3VibWl0Iiwic2V0SW5wdXRWYWx1ZXMiLCJpbnB1dCIsInZhbHVlIiwicmVzZXQiLCJfZ2V0SW5wdXRWYWx1ZXMiLCJpbnB1dFZhbHVlcyIsIlVzZXJJbmZvIiwidGl0bGUiLCJzdWJ0aXRsZSIsIl9uYW1lRWwiLCJfam9iRWwiLCJnZXRVc2VySW5mbyIsImFib3V0Iiwic2V0VXNlckluZm8iLCJwcm9maWxlQWRkQnRuIiwicHJvZmlsZUVkaXRCdG4iLCJjYXJkU2VjdGlvbiIsInVzZXJJbmZvIiwicmVuZGVyQ2FyZCIsImNhcmQiLCJjcmVhdGVDYXJkIiwicG9wdXBJbWFnZSIsInBvcHVwRGVsZXRlIiwiYXBpIiwib3B0aW9ucyIsIl9iYXNlVXJsIiwiYmFzZVVybCIsIl9oZWFkZXJzIiwiaGVhZGVycyIsIl9jaGVja1Jlc3BvbnNlIiwicmVzIiwib2siLCJjb25zb2xlIiwibG9nIiwianNvbiIsIlByb21pc2UiLCJyZWplY3QiLCJzdGF0dXMiLCJnZXRJbml0aWFsQ2FyZHMiLCJmZXRjaCIsInRoZW4iLCJ1cGRhdGVVc2VySW5mbyIsIm1ldGhvZCIsImJvZHkiLCJKU09OIiwic3RyaW5naWZ5IiwiYWRkTmV3Q2FyZCIsImF1dGhvcml6YXRpb24iLCJwb3B1cEVkaXRGb3JtIiwiX2NhcHRpb24iLCJwb3B1cEFkZEZvcm0iLCJmb3JtVmFsaWRhdG9ycyIsIkFycmF5IiwiZnJvbSIsImZvcm1FbGVtZW50IiwidmFsaWRhdG9yIiwiX2lucHV0U2VsZWN0b3IiLCJfc3VibWl0QnV0dG9uU2VsZWN0b3IiLCJfaW5hY3RpdmVCdXR0b25DbGFzcyIsIl9pbnB1dEVycm9yQ2xhc3MiLCJfZXJyb3JDbGFzcyIsIl9mb3JtRWxlbWVudCIsIl9idXR0b25FbCIsImlucHV0RWwiLCJfY2hlY2tWYWxpZGl0eSIsIl90b2dnbGVTdWJtaXRCdG4iLCJfZGlzYWJsZVN1Ym1pdEJ0biIsInNldFRpbWVvdXQiLCJ2YWxpZGl0eSIsInZhbGlkIiwiX2hpZGVJbnB1dEVycm9yIiwiX3Nob3dJbnB1dEVycm9yIiwiZXJyb3JNZXNzYWdlIiwiaWQiLCJ2YWxpZGF0aW9uTWVzc2FnZSIsIl9oYXNJbnZhbGlkSW5wdXQiLCJfZW5hYmxlU3VibWl0QnRuIiwiZXZlcnkiLCJkaXNhYmxlZCIsImVuYWJsZVZhbGlkYXRpb24iLCJwcmV2ZW50RGVmYXVsdCIsImZvcm1OYW1lIiwiZ2V0QXR0cmlidXRlIl0sInNvdXJjZVJvb3QiOiIifQ==