!function(){"use strict";class e{constructor(e,t,s){this._name=e.name,this._link=e.link,this._cardSelector=t,this._handeImageClick=s}_getTemplate(){return document.querySelector(this._cardSelector).content.querySelector(".card").cloneNode(!0)}_setEventListeners(){this._likeBtn=this._card.querySelector("#card_like-button"),this._deleteBtn=this._card.querySelector(".card__delete-btn"),this._image=this._card.querySelector(".card__image"),this._likeBtn.addEventListener("click",(()=>this._toggleLikeBtn())),this._deleteBtn.addEventListener("click",(()=>this._removeCard())),this._image.addEventListener("click",(()=>this._openImage()))}_openImage(){this._handeImageClick(this._link,this._name)}_toggleLikeBtn(){this._likeBtn.classList.toggle("card__like-button_enabled")}_removeCard(){this._card.remove(),this._card=null}getView(){return this._card=this._getTemplate(),this._setEventListeners(),this._image.src=this._link,this._image.alt=this._name,this._card.querySelector(".card__title").textContent=this._name,this._card}}const t={formSelector:".modal__form",inputSelector:".modal__input",submitButtonSelector:".modal__save-button",inactiveButtonClass:"modal__save-button-disabled",inputErrorClass:".modal__input-type-error",errorClass:"modal__error_visible",cardSectionClass:".cards__list",cardTeplate:".card__teplate"};class s{constructor(e){let{popupSelector:t}=e;this._popupElement=document.querySelector(t)}open(){this._popupElement.classList.add("modal_opened"),document.addEventListener("keydown",this._closeByEsc)}close(){this._popupElement.classList.remove("modal_opened"),document.removeEventListener("keydown",this._closeByEsc)}_closeByEsc=e=>{"Escape"===e.key&&this.close()};setEventListeners(){this._popupElement.addEventListener("mousedown",(e=>{e.target.classList.contains("modal")&&this.close(),e.target.classList.contains("modal__close-button")&&this.close()}))}}class i extends s{constructor(e,s){super({popupSelector:e}),this._popupFormEl=this._popupElement.querySelector(t.formSelector),this._inputEls=this._popupFormEl.querySelectorAll(t.inputSelector),this._handleSubmit=s}setInputValues(e){this._inputEls.forEach((t=>{t.value=e[t.name]}))}close(){super.close(),this._popupFormEl.reset()}_getInputValues(){const e={};return this._inputEls.forEach((t=>{e[t.name]=t.value})),e}setEventListeners(){super.setEventListeners(),this._popupFormEl.addEventListener("submit",(()=>{this._handleSubmit(this._getInputValues())}))}}const n=document.querySelector("#profile__add-button"),r=document.querySelector("#profile__edit-btn");function o(t){const s=function(t){return new e(t,"#card__template",l).getView()}(t);u.addItem(s)}function l(e,t){c.open(e,t)}new class{constructor(e){this._baseUrl=e.baseUrl,this._headers=e.headers}_checkResponse(e){return e.ok?(console.log("its here!"),e.json()):Promise.reject(`Error: ${e.status}`)}getInitialCards(){fetch(`${this._baseUrl}/cards`,{headers:this._headers}).then(this._checkResponse).then(console.log(res))}getUserIngo(){}}({baseUrl:"https://around.nomoreparties.co/v1/group-12",headers:{authorization:"cd8b3986-f3d6-4da9-8f48-96bc48ae4bb7","Content-Type":"application/json"}}).getInitialCards();const a=new class{constructor(e){let{title:t,subtitle:s}=e;this._nameEl=document.querySelector(t),this._jobEl=document.querySelector(s)}getUserInfo(){return{title:this._nameEl.textContent,subtitle:this._jobEl.textContent}}setUserInfo(e){this._nameEl.textContent=e.title,this._jobEl.textContent=e.subtitle}}({title:".profile__title",subtitle:".profile__subtitle"}),c=new class extends s{constructor(e){super({popupSelector:e}),this._image=this._popupElement.querySelector(".modal__image"),this._caption=this._popupElement.querySelector(".modal__image-caption")}open(e,t){super.open(),this._image.src=e,this._image.alt=t,this._caption.textContent=t}}("#card__image-modal"),_=new i("#profile__add-modal",(e=>{o(e),_.close()})),d=new i("#profile__edit-modal",(e=>{a.setUserInfo(e),d.close()})),u=new class{constructor(e,t){let{data:s,renderer:i}=e;this._renderedItems=s,this._renderer=i,this._container=document.querySelector(t)}addItem(e){this._container.prepend(e)}renderItems(){this._renderedItems.forEach((e=>{this._renderer(e)}))}}({data:[{name:"Yosemite Valley",link:"https://code.s3.yandex.net/web-code/yosemite.jpg"},{name:"Lake Louise",link:"https://code.s3.yandex.net/web-code/lake-louise.jpg"},{name:"Bald Mountains",link:"https://code.s3.yandex.net/web-code/bald-mountains.jpg"},{name:"Latemar",link:"https://code.s3.yandex.net/web-code/latemar.jpg"},{name:"Vanoise National Park",link:"https://code.s3.yandex.net/web-code/vanoise.jpg"},{name:"Lago di Braies",link:"https://code.s3.yandex.net/web-code/lago.jpg"}],renderer:e=>{o(e)}},t.cardSectionClass);u.renderItems();const h={};(e=>{Array.from(document.querySelectorAll(e.formSelector)).forEach((t=>{const s=new class{constructor(e,t){this._inputSelector=e.inputSelector,this._submitButtonSelector=e.submitButtonSelector,this._inactiveButtonClass=e.inactiveButtonClass,this._inputErrorClass=e.inputErrorClass,this._errorClass=e.errorClass,this._formElement=t,this._buttonEl=this._formElement.querySelector(this._submitButtonSelector),this._inputEls=[...this._formElement.querySelectorAll(this._inputSelector)]}_setEventListeners(){this._inputEls.forEach((e=>{e.addEventListener("input",(()=>{this._checkValidity(e),this._toggleSubmitBtn(e)})),this._disableSubmitBtn(),this._formElement.addEventListener("reset",(()=>{setTimeout((()=>{this._toggleSubmitBtn(e)}),0)}))}))}_checkValidity(e){e.validity.valid?this._hideInputError(e):this._showInputError(e)}_showInputError(e){const t=this._formElement.querySelector(`#${e.id}-error`);e.classList.add(this._inputErrorClass),t.textContent=e.validationMessage,t.classList.add(this._errorClass)}_hideInputError(e){const t=this._formElement.querySelector(`#${e.id}-error`);e.classList.remove(this._inputErrorClass),t.textContent="",t.classList.remove(this._errorClass)}_toggleSubmitBtn(){this._hasInvalidInput()?this._disableSubmitBtn():this._enableSubmitBtn()}_hasInvalidInput(){return!this._inputEls.every((e=>e.validity.valid))}_disableSubmitBtn(){this._buttonEl.classList.add(this._inactiveButtonClass),this._buttonEl.disabled=!0}_enableSubmitBtn(){this._buttonEl.classList.remove(this._inactiveButtonClass),this._buttonEl.disabled=!1}enableValidation(){this._formElement.addEventListener("submit",(e=>{e.preventDefault()})),this._setEventListeners()}}(e,t),i=t.getAttribute("name");h[i]=s,s.enableValidation()}))})(t),c.setEventListeners(),_.setEventListeners(),d.setEventListeners(),n.addEventListener("click",(()=>_.open())),r.addEventListener("click",(()=>{d.open(),d.setInputValues(a.getUserInfo())}))}();
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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QUFjaEQsaUJBQWlCLFNBQVMsSUFBTW9GLEVBQWE1RCxTQUMzRHlCLEVBQWVqRCxpQkFBaUIsU0FBUyxLQUN2Q3FGLEVBQWM3RCxPQUNkNkQsRUFBYzVDLGVBQWVtQyxFQUFTSyxjQUFjLEciLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9wcmFjdGljdW0vLi9zcmMvY29tcG9uZW50cy9DYXJkLmpzIiwid2VicGFjazovL3ByYWN0aWN1bS8uL3NyYy91dGlscy9jb25zdGFudHMuanMiLCJ3ZWJwYWNrOi8vcHJhY3RpY3VtLy4vc3JjL2NvbXBvbmVudHMvUG9wdXAuanMiLCJ3ZWJwYWNrOi8vcHJhY3RpY3VtLy4vc3JjL2NvbXBvbmVudHMvUG9wdXBXaXRoRm9ybS5qcyIsIndlYnBhY2s6Ly9wcmFjdGljdW0vLi9zcmMvcGFnZS9pbmRleC5qcyIsIndlYnBhY2s6Ly9wcmFjdGljdW0vLi9zcmMvY29tcG9uZW50cy9BcGkuanMiLCJ3ZWJwYWNrOi8vcHJhY3RpY3VtLy4vc3JjL2NvbXBvbmVudHMvVXNlckluZm8uanMiLCJ3ZWJwYWNrOi8vcHJhY3RpY3VtLy4vc3JjL2NvbXBvbmVudHMvUG9wdXBXaXRoSW1hZ2UuanMiLCJ3ZWJwYWNrOi8vcHJhY3RpY3VtLy4vc3JjL2NvbXBvbmVudHMvU2VjdGlvbi5qcyIsIndlYnBhY2s6Ly9wcmFjdGljdW0vLi9zcmMvY29tcG9uZW50cy9Gb3JtVmFsaWRhdG9yLmpzIl0sInNvdXJjZXNDb250ZW50IjpbImV4cG9ydCBkZWZhdWx0IGNsYXNzIENhcmQge1xyXG4gIGNvbnN0cnVjdG9yKGRhdGEsIGNhcmRTZWxlY3RvciwgaGFuZGxlSW1hZ2VDbGljaykge1xyXG4gICAgdGhpcy5fbmFtZSA9IGRhdGEubmFtZTtcclxuICAgIHRoaXMuX2xpbmsgPSBkYXRhLmxpbms7XHJcbiAgICB0aGlzLl9jYXJkU2VsZWN0b3IgPSBjYXJkU2VsZWN0b3I7XHJcbiAgICB0aGlzLl9oYW5kZUltYWdlQ2xpY2sgPSBoYW5kbGVJbWFnZUNsaWNrO1xyXG4gIH1cclxuXHJcbiAgX2dldFRlbXBsYXRlKCkge1xyXG4gICAgY29uc3QgY2FyZEVsID0gZG9jdW1lbnRcclxuICAgICAgLnF1ZXJ5U2VsZWN0b3IodGhpcy5fY2FyZFNlbGVjdG9yKVxyXG4gICAgICAuY29udGVudC5xdWVyeVNlbGVjdG9yKFwiLmNhcmRcIilcclxuICAgICAgLmNsb25lTm9kZSh0cnVlKTtcclxuICAgIHJldHVybiBjYXJkRWw7XHJcbiAgfVxyXG5cclxuICBfc2V0RXZlbnRMaXN0ZW5lcnMoKSB7XHJcbiAgICB0aGlzLl9saWtlQnRuID0gdGhpcy5fY2FyZC5xdWVyeVNlbGVjdG9yKFwiI2NhcmRfbGlrZS1idXR0b25cIik7XHJcbiAgICB0aGlzLl9kZWxldGVCdG4gPSB0aGlzLl9jYXJkLnF1ZXJ5U2VsZWN0b3IoXCIuY2FyZF9fZGVsZXRlLWJ0blwiKTtcclxuICAgIHRoaXMuX2ltYWdlID0gdGhpcy5fY2FyZC5xdWVyeVNlbGVjdG9yKFwiLmNhcmRfX2ltYWdlXCIpO1xyXG4gICAgdGhpcy5fbGlrZUJ0bi5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgKCkgPT4gdGhpcy5fdG9nZ2xlTGlrZUJ0bigpKTtcclxuICAgIHRoaXMuX2RlbGV0ZUJ0bi5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgKCkgPT4gdGhpcy5fcmVtb3ZlQ2FyZCgpKTtcclxuICAgIHRoaXMuX2ltYWdlLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCAoKSA9PiB0aGlzLl9vcGVuSW1hZ2UoKSk7XHJcbiAgfVxyXG5cclxuICBfb3BlbkltYWdlKCkge1xyXG4gICAgdGhpcy5faGFuZGVJbWFnZUNsaWNrKHRoaXMuX2xpbmssIHRoaXMuX25hbWUpO1xyXG4gIH1cclxuXHJcbiAgX3RvZ2dsZUxpa2VCdG4oKSB7XHJcbiAgICB0aGlzLl9saWtlQnRuLmNsYXNzTGlzdC50b2dnbGUoXCJjYXJkX19saWtlLWJ1dHRvbl9lbmFibGVkXCIpO1xyXG4gIH1cclxuXHJcbiAgX3JlbW92ZUNhcmQoKSB7XHJcbiAgICB0aGlzLl9jYXJkLnJlbW92ZSgpO1xyXG4gICAgdGhpcy5fY2FyZCA9IG51bGw7XHJcbiAgfVxyXG5cclxuICBnZXRWaWV3KCkge1xyXG4gICAgdGhpcy5fY2FyZCA9IHRoaXMuX2dldFRlbXBsYXRlKCk7XHJcbiAgICB0aGlzLl9zZXRFdmVudExpc3RlbmVycygpO1xyXG4gICAgdGhpcy5faW1hZ2Uuc3JjID0gdGhpcy5fbGluaztcclxuICAgIHRoaXMuX2ltYWdlLmFsdCA9IHRoaXMuX25hbWU7XHJcbiAgICB0aGlzLl9jYXJkLnF1ZXJ5U2VsZWN0b3IoXCIuY2FyZF9fdGl0bGVcIikudGV4dENvbnRlbnQgPSB0aGlzLl9uYW1lO1xyXG5cclxuICAgIHJldHVybiB0aGlzLl9jYXJkO1xyXG4gIH1cclxufVxyXG4iLCIvL3NlbGVjdG9ycyBmb3IgdmFsaWRhdGlvblxyXG5cclxuY29uc3QgY29uZmlnID0ge1xyXG4gIGZvcm1TZWxlY3RvcjogXCIubW9kYWxfX2Zvcm1cIixcclxuICBpbnB1dFNlbGVjdG9yOiBcIi5tb2RhbF9faW5wdXRcIixcclxuICBzdWJtaXRCdXR0b25TZWxlY3RvcjogXCIubW9kYWxfX3NhdmUtYnV0dG9uXCIsXHJcbiAgaW5hY3RpdmVCdXR0b25DbGFzczogXCJtb2RhbF9fc2F2ZS1idXR0b24tZGlzYWJsZWRcIixcclxuICBpbnB1dEVycm9yQ2xhc3M6IFwiLm1vZGFsX19pbnB1dC10eXBlLWVycm9yXCIsXHJcbiAgZXJyb3JDbGFzczogXCJtb2RhbF9fZXJyb3JfdmlzaWJsZVwiLFxyXG4gIGNhcmRTZWN0aW9uQ2xhc3M6IFwiLmNhcmRzX19saXN0XCIsXHJcbiAgY2FyZFRlcGxhdGU6IFwiLmNhcmRfX3RlcGxhdGVcIixcclxufTtcclxuXHJcbmNvbnN0IGluaXRpYWxDYXJkcyA9IFtcclxuICB7XHJcbiAgICBuYW1lOiBcIllvc2VtaXRlIFZhbGxleVwiLFxyXG4gICAgbGluazogXCJodHRwczovL2NvZGUuczMueWFuZGV4Lm5ldC93ZWItY29kZS95b3NlbWl0ZS5qcGdcIixcclxuICB9LFxyXG4gIHtcclxuICAgIG5hbWU6IFwiTGFrZSBMb3Vpc2VcIixcclxuICAgIGxpbms6IFwiaHR0cHM6Ly9jb2RlLnMzLnlhbmRleC5uZXQvd2ViLWNvZGUvbGFrZS1sb3Vpc2UuanBnXCIsXHJcbiAgfSxcclxuICB7XHJcbiAgICBuYW1lOiBcIkJhbGQgTW91bnRhaW5zXCIsXHJcbiAgICBsaW5rOiBcImh0dHBzOi8vY29kZS5zMy55YW5kZXgubmV0L3dlYi1jb2RlL2JhbGQtbW91bnRhaW5zLmpwZ1wiLFxyXG4gIH0sXHJcbiAge1xyXG4gICAgbmFtZTogXCJMYXRlbWFyXCIsXHJcbiAgICBsaW5rOiBcImh0dHBzOi8vY29kZS5zMy55YW5kZXgubmV0L3dlYi1jb2RlL2xhdGVtYXIuanBnXCIsXHJcbiAgfSxcclxuICB7XHJcbiAgICBuYW1lOiBcIlZhbm9pc2UgTmF0aW9uYWwgUGFya1wiLFxyXG4gICAgbGluazogXCJodHRwczovL2NvZGUuczMueWFuZGV4Lm5ldC93ZWItY29kZS92YW5vaXNlLmpwZ1wiLFxyXG4gIH0sXHJcbiAge1xyXG4gICAgbmFtZTogXCJMYWdvIGRpIEJyYWllc1wiLFxyXG4gICAgbGluazogXCJodHRwczovL2NvZGUuczMueWFuZGV4Lm5ldC93ZWItY29kZS9sYWdvLmpwZ1wiLFxyXG4gIH0sXHJcbl07XHJcblxyXG5leHBvcnQgeyBjb25maWcsIGluaXRpYWxDYXJkcyB9O1xyXG4iLCJleHBvcnQgZGVmYXVsdCBjbGFzcyBQb3B1cCB7XHJcbiAgY29uc3RydWN0b3IoeyBwb3B1cFNlbGVjdG9yIH0pIHtcclxuICAgIHRoaXMuX3BvcHVwRWxlbWVudCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IocG9wdXBTZWxlY3Rvcik7XHJcbiAgfVxyXG4gIG9wZW4oKSB7XHJcbiAgICAvL29wZW4gcG9wdXBcclxuICAgIHRoaXMuX3BvcHVwRWxlbWVudC5jbGFzc0xpc3QuYWRkKFwibW9kYWxfb3BlbmVkXCIpO1xyXG4gICAgZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lcihcImtleWRvd25cIiwgdGhpcy5fY2xvc2VCeUVzYyk7XHJcbiAgfVxyXG4gIGNsb3NlKCkge1xyXG4gICAgLy9jbG9zZSBwb3B1cFxyXG4gICAgdGhpcy5fcG9wdXBFbGVtZW50LmNsYXNzTGlzdC5yZW1vdmUoXCJtb2RhbF9vcGVuZWRcIik7XHJcbiAgICBkb2N1bWVudC5yZW1vdmVFdmVudExpc3RlbmVyKFwia2V5ZG93blwiLCB0aGlzLl9jbG9zZUJ5RXNjKTtcclxuICB9XHJcbiAgX2Nsb3NlQnlFc2MgPSAoZXZ0KSA9PiB7XHJcbiAgICBpZiAoZXZ0LmtleSA9PT0gXCJFc2NhcGVcIikge1xyXG4gICAgICB0aGlzLmNsb3NlKCk7XHJcbiAgICB9XHJcbiAgfTtcclxuXHJcbiAgc2V0RXZlbnRMaXN0ZW5lcnMoKSB7XHJcbiAgICB0aGlzLl9wb3B1cEVsZW1lbnQuYWRkRXZlbnRMaXN0ZW5lcihcIm1vdXNlZG93blwiLCAoZXZ0KSA9PiB7XHJcbiAgICAgIGlmIChldnQudGFyZ2V0LmNsYXNzTGlzdC5jb250YWlucyhcIm1vZGFsXCIpKSB7XHJcbiAgICAgICAgdGhpcy5jbG9zZSgpO1xyXG4gICAgICB9XHJcbiAgICAgIGlmIChldnQudGFyZ2V0LmNsYXNzTGlzdC5jb250YWlucyhcIm1vZGFsX19jbG9zZS1idXR0b25cIikpIHtcclxuICAgICAgICB0aGlzLmNsb3NlKCk7XHJcbiAgICAgIH1cclxuICAgIH0pO1xyXG4gIH1cclxufVxyXG4iLCJpbXBvcnQgUG9wdXAgZnJvbSBcIi4vUG9wdXBcIjtcclxuaW1wb3J0IHsgY29uZmlnIH0gZnJvbSBcIi4uL3V0aWxzL2NvbnN0YW50cy5qc1wiO1xyXG5cclxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgUG9wdXBXaXRoRm9ybSBleHRlbmRzIFBvcHVwIHtcclxuICBjb25zdHJ1Y3Rvcihwb3B1cFNlbGVjdG9yLCBoYW5kbGVTdWJtaXQpIHtcclxuICAgIHN1cGVyKHsgcG9wdXBTZWxlY3RvciB9KTsgICAgXHJcbiAgICB0aGlzLl9wb3B1cEZvcm1FbCA9IHRoaXMuX3BvcHVwRWxlbWVudC5xdWVyeVNlbGVjdG9yKGNvbmZpZy5mb3JtU2VsZWN0b3IpO1xyXG4gICAgdGhpcy5faW5wdXRFbHMgPSB0aGlzLl9wb3B1cEZvcm1FbC5xdWVyeVNlbGVjdG9yQWxsKGNvbmZpZy5pbnB1dFNlbGVjdG9yKTtcclxuICAgIHRoaXMuX2hhbmRsZVN1Ym1pdCA9IGhhbmRsZVN1Ym1pdDsgICAgXHJcbiAgfVxyXG4gIHNldElucHV0VmFsdWVzKGRhdGEpIHtcclxuICAgIHRoaXMuX2lucHV0RWxzLmZvckVhY2goKGlucHV0KSA9PiB7XHJcbiAgICAgIC8vIGhlcmUgeW91IGluc2VydCB0aGUgYHZhbHVlYCBieSB0aGUgYG5hbWVgIG9mIHRoZSBpbnB1dFxyXG4gICAgICBpbnB1dC52YWx1ZSA9IGRhdGFbaW5wdXQubmFtZV07XHJcbiAgICB9KTtcclxuICB9XHJcblxyXG4gIGNsb3NlKCkge1xyXG4gICAgc3VwZXIuY2xvc2UoKTtcclxuICAgIHRoaXMuX3BvcHVwRm9ybUVsLnJlc2V0KCk7XHJcbiAgfSAgXHJcblxyXG4gIF9nZXRJbnB1dFZhbHVlcygpIHtcclxuICAgIGNvbnN0IGlucHV0VmFsdWVzID0ge307XHJcbiAgICAvL2dldCBhbGwgaW5wdXRzICAgIFxyXG4gICAgLy9sb29wIG92ZXIgYWxsIGlucHV0c1xyXG4gICAgdGhpcy5faW5wdXRFbHMuZm9yRWFjaCgoaW5wdXQpID0+IHtcclxuICAgICAgLy9hc3NpZ24gaW5wdXRzIHRvIGVtcHR5IG9iamVjdCBieSBuYW1lPXZhbHVlXHJcbiAgICAgIGlucHV0VmFsdWVzW2lucHV0Lm5hbWVdID0gaW5wdXQudmFsdWU7XHJcbiAgICB9KTtcclxuICAgIHJldHVybiBpbnB1dFZhbHVlcztcclxuICB9XHJcblxyXG4gIHNldEV2ZW50TGlzdGVuZXJzKCkge1xyXG4gICAgc3VwZXIuc2V0RXZlbnRMaXN0ZW5lcnMoKTtcclxuICAgIHRoaXMuX3BvcHVwRm9ybUVsLmFkZEV2ZW50TGlzdGVuZXIoXCJzdWJtaXRcIiwgKCkgPT4ge1xyXG4gICAgICB0aGlzLl9oYW5kbGVTdWJtaXQodGhpcy5fZ2V0SW5wdXRWYWx1ZXMoKSk7XHJcbiAgICB9KTtcclxuICB9XHJcbn1cclxuIiwiLy9idXQgd2h5IHdlIGNhbm5vdCBqdXN0IHVzZSBUQUIgaW5kZW50YXRpb24gb24gY29kZSBmb3JtYXR0aW5nPyB3aHkgaXQgc2hvdWxkIGJlIGRvdWJsZSBzcGFjZT9cclxuaW1wb3J0IEZvcm1WYWxpZGF0b3IgZnJvbSBcIi4uL2NvbXBvbmVudHMvRm9ybVZhbGlkYXRvci5qc1wiO1xyXG5pbXBvcnQgQ2FyZCBmcm9tIFwiLi4vY29tcG9uZW50cy9DYXJkLmpzXCI7XHJcbmltcG9ydCB7IGNvbmZpZyAsIGluaXRpYWxDYXJkc30gZnJvbSBcIi4uL3V0aWxzL2NvbnN0YW50cy5qc1wiO1xyXG5pbXBvcnQgU2VjdGlvbiBmcm9tIFwiLi4vY29tcG9uZW50cy9TZWN0aW9uLmpzXCI7XHJcbmltcG9ydCBQb3B1cFdpdGhJbWFnZSBmcm9tIFwiLi4vY29tcG9uZW50cy9Qb3B1cFdpdGhJbWFnZS5qc1wiO1xyXG5pbXBvcnQgUG9wdXBXaXRoRm9ybSBmcm9tIFwiLi4vY29tcG9uZW50cy9Qb3B1cFdpdGhGb3JtLmpzXCI7XHJcbmltcG9ydCBVc2VySW5mbyBmcm9tIFwiLi4vY29tcG9uZW50cy9Vc2VySW5mby5qc1wiO1xyXG5pbXBvcnQgQXBpIGZyb20gXCIuLi9jb21wb25lbnRzL0FwaS5qc1wiO1xyXG5pbXBvcnQgXCIuLi9wYWdlL2luZGV4LmNzc1wiO1xyXG5cclxuY29uc3QgcHJvZmlsZUFkZEJ0biA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIjcHJvZmlsZV9fYWRkLWJ1dHRvblwiKTtcclxuY29uc3QgcHJvZmlsZUVkaXRCdG4gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiI3Byb2ZpbGVfX2VkaXQtYnRuXCIpO1xyXG5cclxuZnVuY3Rpb24gY3JlYXRlQ2FyZChpdGVtKSB7XHJcbiAgY29uc3QgY2FyZEVsZW1lbnQgPSBuZXcgQ2FyZChcclxuICAgIGl0ZW0sXHJcbiAgICBcIiNjYXJkX190ZW1wbGF0ZVwiLFxyXG4gICAgaGFuZGxlSW1hZ2VDbGlja1xyXG4gICkuZ2V0VmlldygpO1xyXG4gIHJldHVybiBjYXJkRWxlbWVudDtcclxufVxyXG5cclxuZnVuY3Rpb24gcmVuZGVyQ2FyZChpdGVtKSB7XHJcbiAgY29uc3QgY2FyZCA9IGNyZWF0ZUNhcmQoaXRlbSk7XHJcbiAgY2FyZFNlY3Rpb24uYWRkSXRlbShjYXJkKTtcclxufVxyXG5cclxuZnVuY3Rpb24gaGFuZGxlSW1hZ2VDbGljayhuYW1lLCBsaW5rKSB7XHJcbiAgcG9wdXBJbWFnZS5vcGVuKG5hbWUsIGxpbmspO1xyXG59XHJcblxyXG5jb25zdCBhcGkgPSBuZXcgQXBpKHtcclxuICBiYXNlVXJsOiBcImh0dHBzOi8vYXJvdW5kLm5vbW9yZXBhcnRpZXMuY28vdjEvZ3JvdXAtMTJcIixcclxuICBoZWFkZXJzOiB7XHJcbiAgICBhdXRob3JpemF0aW9uOiBcImNkOGIzOTg2LWYzZDYtNGRhOS04ZjQ4LTk2YmM0OGFlNGJiN1wiLFxyXG4gICAgXCJDb250ZW50LVR5cGVcIjogXCJhcHBsaWNhdGlvbi9qc29uXCIsXHJcbiAgfSxcclxufSk7XHJcblxyXG5hcGkuZ2V0SW5pdGlhbENhcmRzKClcclxuXHJcblxyXG5jb25zdCB1c2VySW5mbyA9IG5ldyBVc2VySW5mbyh7XHJcbiAgdGl0bGU6IFwiLnByb2ZpbGVfX3RpdGxlXCIsXHJcbiAgc3VidGl0bGU6IFwiLnByb2ZpbGVfX3N1YnRpdGxlXCIsXHJcbn0pO1xyXG5cclxuY29uc3QgcG9wdXBJbWFnZSA9IG5ldyBQb3B1cFdpdGhJbWFnZShcIiNjYXJkX19pbWFnZS1tb2RhbFwiKTtcclxuXHJcbmNvbnN0IHBvcHVwQWRkRm9ybSA9IG5ldyBQb3B1cFdpdGhGb3JtKFwiI3Byb2ZpbGVfX2FkZC1tb2RhbFwiLCAoaW5wdXRWYWx1ZXMpID0+IHtcclxuICByZW5kZXJDYXJkKGlucHV0VmFsdWVzKTtcclxuICBwb3B1cEFkZEZvcm0uY2xvc2UoKTtcclxufSk7XHJcblxyXG5jb25zdCBwb3B1cEVkaXRGb3JtID0gbmV3IFBvcHVwV2l0aEZvcm0oXHJcbiAgXCIjcHJvZmlsZV9fZWRpdC1tb2RhbFwiLFxyXG4gIChpbnB1dFZhbHVlcykgPT4ge1xyXG4gICAgdXNlckluZm8uc2V0VXNlckluZm8oaW5wdXRWYWx1ZXMpO1xyXG4gICAgcG9wdXBFZGl0Rm9ybS5jbG9zZSgpO1xyXG4gIH1cclxuKTtcclxuXHJcbmNvbnN0IGNhcmRTZWN0aW9uID0gbmV3IFNlY3Rpb24oXHJcbiAge1xyXG4gICAgZGF0YTogaW5pdGlhbENhcmRzLFxyXG4gICAgcmVuZGVyZXI6IChpdGVtKSA9PiB7XHJcbiAgICAgIHJlbmRlckNhcmQoaXRlbSk7XHJcbiAgICB9LFxyXG4gIH0sXHJcbiAgY29uZmlnLmNhcmRTZWN0aW9uQ2xhc3NcclxuKTtcclxuY2FyZFNlY3Rpb24ucmVuZGVySXRlbXMoKTtcclxuXHJcbmNvbnN0IGZvcm1WYWxpZGF0b3JzID0ge307XHJcblxyXG4vLyBlbmFibGUgdmFsaWRhdGlvblxyXG5jb25zdCBlbmFibGVWYWxpZGF0aW9uID0gKGNvbmZpZykgPT4ge1xyXG4gIGNvbnN0IGZvcm1MaXN0ID0gQXJyYXkuZnJvbShkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKGNvbmZpZy5mb3JtU2VsZWN0b3IpKTtcclxuICBmb3JtTGlzdC5mb3JFYWNoKChmb3JtRWxlbWVudCkgPT4ge1xyXG4gICAgY29uc3QgdmFsaWRhdG9yID0gbmV3IEZvcm1WYWxpZGF0b3IoY29uZmlnLCBmb3JtRWxlbWVudCk7XHJcbiAgICAvLyBoZXJlIHlvdSBnZXQgdGhlIG5hbWUgb2YgdGhlIGZvcm1cclxuICAgIGNvbnN0IGZvcm1OYW1lID0gZm9ybUVsZW1lbnQuZ2V0QXR0cmlidXRlKFwibmFtZVwiKTtcclxuXHJcbiAgICAvLyBoZXJlIHlvdSBzdG9yZSBhIHZhbGlkYXRvciBieSB0aGUgYG5hbWVgIG9mIHRoZSBmb3JtXHJcbiAgICBmb3JtVmFsaWRhdG9yc1tmb3JtTmFtZV0gPSB2YWxpZGF0b3I7XHJcbiAgICB2YWxpZGF0b3IuZW5hYmxlVmFsaWRhdGlvbigpO1xyXG4gIH0pO1xyXG59O1xyXG5cclxuZW5hYmxlVmFsaWRhdGlvbihjb25maWcpO1xyXG5cclxucG9wdXBJbWFnZS5zZXRFdmVudExpc3RlbmVycygpO1xyXG5wb3B1cEFkZEZvcm0uc2V0RXZlbnRMaXN0ZW5lcnMoKTtcclxucG9wdXBFZGl0Rm9ybS5zZXRFdmVudExpc3RlbmVycygpO1xyXG5cclxucHJvZmlsZUFkZEJ0bi5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgKCkgPT4gcG9wdXBBZGRGb3JtLm9wZW4oKSk7XHJcbnByb2ZpbGVFZGl0QnRuLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCAoKSA9PiB7XHJcbiAgcG9wdXBFZGl0Rm9ybS5vcGVuKCk7XHJcbiAgcG9wdXBFZGl0Rm9ybS5zZXRJbnB1dFZhbHVlcyh1c2VySW5mby5nZXRVc2VySW5mbygpKTtcclxufSk7XHJcbiIsImV4cG9ydCBkZWZhdWx0IGNsYXNzIEFwaSB7XHJcbiAgICBjb25zdHJ1Y3RvcihvcHRpb25zKXtcclxuICAgICAgICB0aGlzLl9iYXNlVXJsID0gb3B0aW9ucy5iYXNlVXJsO1xyXG4gICAgICAgIHRoaXMuX2hlYWRlcnMgPSBvcHRpb25zLmhlYWRlcnM7XHJcblxyXG4gICAgfVxyXG5cclxuICAgIF9jaGVja1Jlc3BvbnNlKHJlcykge1xyXG4gICAgICAgIGlmIChyZXMub2spIHtcclxuICAgICAgICAgIGNvbnNvbGUubG9nKFwiaXRzIGhlcmUhXCIpXHJcbiAgICAgICAgICByZXR1cm4gcmVzLmpzb24oKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIFByb21pc2UucmVqZWN0KGBFcnJvcjogJHtyZXMuc3RhdHVzfWApO1xyXG4gICAgfVxyXG4gICAgXHJcblxyXG4gICAgZ2V0SW5pdGlhbENhcmRzKCl7XHJcbiAgICAgIGZldGNoKGAke3RoaXMuX2Jhc2VVcmx9L2NhcmRzYCx7XHJcbiAgICAgICAgaGVhZGVyczogdGhpcy5faGVhZGVyc1xyXG4gICAgICB9KSAgICAgIFxyXG4gICAgICAudGhlbih0aGlzLl9jaGVja1Jlc3BvbnNlKVxyXG4gICAgICAudGhlbihcclxuICAgICAgICBjb25zb2xlLmxvZyhyZXMpXHJcbiAgICAgIClcclxuICAgICAgXHJcbiAgICB9XHJcblxyXG4gICAgZ2V0VXNlckluZ28oKXtcclxuXHJcbiAgICB9XHJcbn1cclxuXHJcblxyXG5cclxuIiwiZXhwb3J0IGRlZmF1bHQgY2xhc3MgVXNlckluZm8ge1xyXG4gIGNvbnN0cnVjdG9yKHsgdGl0bGUsIHN1YnRpdGxlIH0pIHtcclxuICAgIHRoaXMuX25hbWVFbCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IodGl0bGUpO1xyXG4gICAgdGhpcy5fam9iRWwgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKHN1YnRpdGxlKTtcclxuICB9XHJcbiAgZ2V0VXNlckluZm8oKSB7XHJcbiAgICByZXR1cm4ge1xyXG4gICAgICB0aXRsZTogdGhpcy5fbmFtZUVsLnRleHRDb250ZW50LFxyXG4gICAgICBzdWJ0aXRsZTogdGhpcy5fam9iRWwudGV4dENvbnRlbnQsXHJcbiAgICB9O1xyXG4gIH1cclxuICBzZXRVc2VySW5mbyh2YWx1ZSkge1xyXG4gICAgLy9zZXQgdXNlciBpbmZvIGZyb20gdmFsdWVcclxuICAgIHRoaXMuX25hbWVFbC50ZXh0Q29udGVudCA9IHZhbHVlLnRpdGxlO1xyXG4gICAgdGhpcy5fam9iRWwudGV4dENvbnRlbnQgPSB2YWx1ZS5zdWJ0aXRsZTtcclxuICB9XHJcbn1cclxuIiwiaW1wb3J0IFBvcHVwIGZyb20gXCIuL1BvcHVwXCI7XHJcblxyXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBQb3B1cFdpdGhJbWFnZSBleHRlbmRzIFBvcHVwIHtcclxuICBjb25zdHJ1Y3Rvcihwb3B1cFNlbGVjdG9yKSB7XHJcbiAgICBzdXBlcih7IHBvcHVwU2VsZWN0b3IgfSk7XHJcbiAgICB0aGlzLl9pbWFnZSA9IHRoaXMuX3BvcHVwRWxlbWVudC5xdWVyeVNlbGVjdG9yKFwiLm1vZGFsX19pbWFnZVwiKTtcclxuICAgIHRoaXMuX2NhcHRpb24gPSB0aGlzLl9wb3B1cEVsZW1lbnQucXVlcnlTZWxlY3RvcihcIi5tb2RhbF9faW1hZ2UtY2FwdGlvblwiKTtcclxuICB9XHJcbiAgb3BlbihuYW1lLCBsaW5rKSB7XHJcbiAgICBzdXBlci5vcGVuKCk7ICAgIFxyXG4gICAgdGhpcy5faW1hZ2Uuc3JjID0gbmFtZTtcclxuICAgIHRoaXMuX2ltYWdlLmFsdCA9IGxpbms7XHJcbiAgICB0aGlzLl9jYXB0aW9uLnRleHRDb250ZW50ID0gbGluaztcclxuICB9XHJcbn1cclxuIiwiZXhwb3J0IGRlZmF1bHQgY2xhc3MgU2VjdGlvbiB7XHJcbiAgY29uc3RydWN0b3IoeyBkYXRhLCByZW5kZXJlciB9LCBjYXJkTGlzdCkge1xyXG4gICAgdGhpcy5fcmVuZGVyZWRJdGVtcyA9IGRhdGE7XHJcbiAgICB0aGlzLl9yZW5kZXJlciA9IHJlbmRlcmVyO1xyXG4gICAgdGhpcy5fY29udGFpbmVyID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihjYXJkTGlzdCk7XHJcbiAgfVxyXG5cclxuICBhZGRJdGVtKGVsZW1lbnQpIHtcclxuICAgIHRoaXMuX2NvbnRhaW5lci5wcmVwZW5kKGVsZW1lbnQpO1xyXG4gIH1cclxuXHJcbiAgcmVuZGVySXRlbXMoKSB7XHJcbiAgICB0aGlzLl9yZW5kZXJlZEl0ZW1zLmZvckVhY2goKGl0ZW0pID0+IHtcclxuICAgICAgdGhpcy5fcmVuZGVyZXIoaXRlbSk7XHJcbiAgICB9KTtcclxuICB9XHJcbn1cclxuIiwiY2xhc3MgRm9ybVZhbGlkYXRvciB7XHJcbiAgY29uc3RydWN0b3IoY29uZmlnLCBmb3JtRWxlbWVudCkge1xyXG4gICAgdGhpcy5faW5wdXRTZWxlY3RvciA9IGNvbmZpZy5pbnB1dFNlbGVjdG9yO1xyXG4gICAgdGhpcy5fc3VibWl0QnV0dG9uU2VsZWN0b3IgPSBjb25maWcuc3VibWl0QnV0dG9uU2VsZWN0b3I7XHJcbiAgICB0aGlzLl9pbmFjdGl2ZUJ1dHRvbkNsYXNzID0gY29uZmlnLmluYWN0aXZlQnV0dG9uQ2xhc3M7XHJcbiAgICB0aGlzLl9pbnB1dEVycm9yQ2xhc3MgPSBjb25maWcuaW5wdXRFcnJvckNsYXNzO1xyXG4gICAgdGhpcy5fZXJyb3JDbGFzcyA9IGNvbmZpZy5lcnJvckNsYXNzO1xyXG4gICAgdGhpcy5fZm9ybUVsZW1lbnQgPSBmb3JtRWxlbWVudDtcclxuICAgIHRoaXMuX2J1dHRvbkVsID0gdGhpcy5fZm9ybUVsZW1lbnQucXVlcnlTZWxlY3RvcihcclxuICAgICAgdGhpcy5fc3VibWl0QnV0dG9uU2VsZWN0b3JcclxuICAgICk7XHJcbiAgICB0aGlzLl9pbnB1dEVscyA9IFtcclxuICAgICAgLi4udGhpcy5fZm9ybUVsZW1lbnQucXVlcnlTZWxlY3RvckFsbCh0aGlzLl9pbnB1dFNlbGVjdG9yKSxcclxuICAgIF07XHJcbiAgfVxyXG5cclxuICBfc2V0RXZlbnRMaXN0ZW5lcnMoKSB7XHJcbiAgICB0aGlzLl9pbnB1dEVscy5mb3JFYWNoKChpbnB1dEVsKSA9PiB7XHJcbiAgICAgIGlucHV0RWwuYWRkRXZlbnRMaXN0ZW5lcihcImlucHV0XCIsICgpID0+IHtcclxuICAgICAgICB0aGlzLl9jaGVja1ZhbGlkaXR5KGlucHV0RWwpO1xyXG4gICAgICAgIHRoaXMuX3RvZ2dsZVN1Ym1pdEJ0bihpbnB1dEVsKTtcclxuICAgICAgfSk7XHJcbiAgICAgIHRoaXMuX2Rpc2FibGVTdWJtaXRCdG4oKTtcclxuICAgICAgLy9yZXNldCBcImV2ZW50XCJcclxuICAgICAgdGhpcy5fZm9ybUVsZW1lbnQuYWRkRXZlbnRMaXN0ZW5lcihcInJlc2V0XCIsICgpID0+IHtcclxuICAgICAgICAvLyBgc2V0VGltZW91dGAgaXMgbmVlZGVkIHRvIHdhaXQgdGlsbCB0aGUgZm9ybSBpcyBmdWxseSByZXNldCBhbmQgdGhlbiB0byBjYWxsIGB0b2dnbGVCdXR0b25TdGF0ZWBcclxuICAgICAgICBzZXRUaW1lb3V0KCgpID0+IHtcclxuICAgICAgICAgIHRoaXMuX3RvZ2dsZVN1Ym1pdEJ0bihpbnB1dEVsKTtcclxuICAgICAgICB9LCAwKTtcclxuICAgICAgfSk7XHJcbiAgICB9KTtcclxuICB9XHJcblxyXG4gIF9jaGVja1ZhbGlkaXR5KGlucHV0RWwpIHtcclxuICAgIC8vdGFraW5nIGlucHV0RWwgZnJvbSBldmVudCBsaXNlbmVyc1xyXG4gICAgaWYgKCFpbnB1dEVsLnZhbGlkaXR5LnZhbGlkKSB7XHJcbiAgICAgIHRoaXMuX3Nob3dJbnB1dEVycm9yKGlucHV0RWwpO1xyXG4gICAgfSBlbHNlIHtcclxuICAgICAgdGhpcy5faGlkZUlucHV0RXJyb3IoaW5wdXRFbCk7XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICBfc2hvd0lucHV0RXJyb3IoaW5wdXRFbCkge1xyXG4gICAgY29uc3QgZXJyb3JNZXNzYWdlID0gdGhpcy5fZm9ybUVsZW1lbnQucXVlcnlTZWxlY3RvcihcclxuICAgICAgYCMke2lucHV0RWwuaWR9LWVycm9yYFxyXG4gICAgKTtcclxuICAgIGlucHV0RWwuY2xhc3NMaXN0LmFkZCh0aGlzLl9pbnB1dEVycm9yQ2xhc3MpO1xyXG4gICAgZXJyb3JNZXNzYWdlLnRleHRDb250ZW50ID0gaW5wdXRFbC52YWxpZGF0aW9uTWVzc2FnZTtcclxuICAgIGVycm9yTWVzc2FnZS5jbGFzc0xpc3QuYWRkKHRoaXMuX2Vycm9yQ2xhc3MpO1xyXG4gIH1cclxuXHJcbiAgX2hpZGVJbnB1dEVycm9yKGlucHV0RWwpIHtcclxuICAgIGNvbnN0IGVycm9yTWVzc2FnZSA9IHRoaXMuX2Zvcm1FbGVtZW50LnF1ZXJ5U2VsZWN0b3IoXHJcbiAgICAgIGAjJHtpbnB1dEVsLmlkfS1lcnJvcmBcclxuICAgICk7XHJcbiAgICBpbnB1dEVsLmNsYXNzTGlzdC5yZW1vdmUodGhpcy5faW5wdXRFcnJvckNsYXNzKTtcclxuICAgIGVycm9yTWVzc2FnZS50ZXh0Q29udGVudCA9IFwiXCI7XHJcbiAgICBlcnJvck1lc3NhZ2UuY2xhc3NMaXN0LnJlbW92ZSh0aGlzLl9lcnJvckNsYXNzKTtcclxuICB9XHJcblxyXG4gIF90b2dnbGVTdWJtaXRCdG4oKSB7XHJcbiAgICBpZiAodGhpcy5faGFzSW52YWxpZElucHV0KCkpIHtcclxuICAgICAgdGhpcy5fZGlzYWJsZVN1Ym1pdEJ0bigpO1xyXG4gICAgfSBlbHNlIHtcclxuICAgICAgdGhpcy5fZW5hYmxlU3VibWl0QnRuKCk7XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICBfaGFzSW52YWxpZElucHV0KCkge1xyXG4gICAgcmV0dXJuICF0aGlzLl9pbnB1dEVscy5ldmVyeSgoaW5wdXRFbCkgPT4gaW5wdXRFbC52YWxpZGl0eS52YWxpZCk7XHJcbiAgfVxyXG5cclxuICBfZGlzYWJsZVN1Ym1pdEJ0bigpIHtcclxuICAgIHRoaXMuX2J1dHRvbkVsLmNsYXNzTGlzdC5hZGQodGhpcy5faW5hY3RpdmVCdXR0b25DbGFzcyk7XHJcbiAgICB0aGlzLl9idXR0b25FbC5kaXNhYmxlZCA9IHRydWU7XHJcbiAgfVxyXG5cclxuICBfZW5hYmxlU3VibWl0QnRuKCkge1xyXG4gICAgdGhpcy5fYnV0dG9uRWwuY2xhc3NMaXN0LnJlbW92ZSh0aGlzLl9pbmFjdGl2ZUJ1dHRvbkNsYXNzKTtcclxuICAgIHRoaXMuX2J1dHRvbkVsLmRpc2FibGVkID0gZmFsc2U7XHJcbiAgfVxyXG5cclxuICBlbmFibGVWYWxpZGF0aW9uKCkge1xyXG4gICAgdGhpcy5fZm9ybUVsZW1lbnQuYWRkRXZlbnRMaXN0ZW5lcihcInN1Ym1pdFwiLCAoZXZ0KSA9PiB7XHJcbiAgICAgIGV2dC5wcmV2ZW50RGVmYXVsdCgpO1xyXG4gICAgfSk7XHJcbiAgICB0aGlzLl9zZXRFdmVudExpc3RlbmVycygpO1xyXG4gIH1cclxufVxyXG5cclxuZXhwb3J0IGRlZmF1bHQgRm9ybVZhbGlkYXRvcjtcclxuIl0sIm5hbWVzIjpbIkNhcmQiLCJjb25zdHJ1Y3RvciIsImRhdGEiLCJjYXJkU2VsZWN0b3IiLCJoYW5kbGVJbWFnZUNsaWNrIiwidGhpcyIsIl9uYW1lIiwibmFtZSIsIl9saW5rIiwibGluayIsIl9jYXJkU2VsZWN0b3IiLCJfaGFuZGVJbWFnZUNsaWNrIiwiX2dldFRlbXBsYXRlIiwiZG9jdW1lbnQiLCJxdWVyeVNlbGVjdG9yIiwiY29udGVudCIsImNsb25lTm9kZSIsIl9zZXRFdmVudExpc3RlbmVycyIsIl9saWtlQnRuIiwiX2NhcmQiLCJfZGVsZXRlQnRuIiwiX2ltYWdlIiwiYWRkRXZlbnRMaXN0ZW5lciIsIl90b2dnbGVMaWtlQnRuIiwiX3JlbW92ZUNhcmQiLCJfb3BlbkltYWdlIiwiY2xhc3NMaXN0IiwidG9nZ2xlIiwicmVtb3ZlIiwiZ2V0VmlldyIsInNyYyIsImFsdCIsInRleHRDb250ZW50IiwiY29uZmlnIiwiZm9ybVNlbGVjdG9yIiwiaW5wdXRTZWxlY3RvciIsInN1Ym1pdEJ1dHRvblNlbGVjdG9yIiwiaW5hY3RpdmVCdXR0b25DbGFzcyIsImlucHV0RXJyb3JDbGFzcyIsImVycm9yQ2xhc3MiLCJjYXJkU2VjdGlvbkNsYXNzIiwiY2FyZFRlcGxhdGUiLCJQb3B1cCIsIl9yZWYiLCJwb3B1cFNlbGVjdG9yIiwiX3BvcHVwRWxlbWVudCIsIm9wZW4iLCJhZGQiLCJfY2xvc2VCeUVzYyIsImNsb3NlIiwicmVtb3ZlRXZlbnRMaXN0ZW5lciIsImV2dCIsImtleSIsInNldEV2ZW50TGlzdGVuZXJzIiwidGFyZ2V0IiwiY29udGFpbnMiLCJQb3B1cFdpdGhGb3JtIiwiaGFuZGxlU3VibWl0Iiwic3VwZXIiLCJfcG9wdXBGb3JtRWwiLCJfaW5wdXRFbHMiLCJxdWVyeVNlbGVjdG9yQWxsIiwiX2hhbmRsZVN1Ym1pdCIsInNldElucHV0VmFsdWVzIiwiZm9yRWFjaCIsImlucHV0IiwidmFsdWUiLCJyZXNldCIsIl9nZXRJbnB1dFZhbHVlcyIsImlucHV0VmFsdWVzIiwicHJvZmlsZUFkZEJ0biIsInByb2ZpbGVFZGl0QnRuIiwicmVuZGVyQ2FyZCIsIml0ZW0iLCJjYXJkIiwiY3JlYXRlQ2FyZCIsImNhcmRTZWN0aW9uIiwiYWRkSXRlbSIsInBvcHVwSW1hZ2UiLCJvcHRpb25zIiwiX2Jhc2VVcmwiLCJiYXNlVXJsIiwiX2hlYWRlcnMiLCJoZWFkZXJzIiwiX2NoZWNrUmVzcG9uc2UiLCJyZXMiLCJvayIsImNvbnNvbGUiLCJsb2ciLCJqc29uIiwiUHJvbWlzZSIsInJlamVjdCIsInN0YXR1cyIsImdldEluaXRpYWxDYXJkcyIsImZldGNoIiwidGhlbiIsImdldFVzZXJJbmdvIiwiYXV0aG9yaXphdGlvbiIsInVzZXJJbmZvIiwidGl0bGUiLCJzdWJ0aXRsZSIsIl9uYW1lRWwiLCJfam9iRWwiLCJnZXRVc2VySW5mbyIsInNldFVzZXJJbmZvIiwiX2NhcHRpb24iLCJwb3B1cEFkZEZvcm0iLCJwb3B1cEVkaXRGb3JtIiwiY2FyZExpc3QiLCJyZW5kZXJlciIsIl9yZW5kZXJlZEl0ZW1zIiwiX3JlbmRlcmVyIiwiX2NvbnRhaW5lciIsImVsZW1lbnQiLCJwcmVwZW5kIiwicmVuZGVySXRlbXMiLCJmb3JtVmFsaWRhdG9ycyIsIkFycmF5IiwiZnJvbSIsImZvcm1FbGVtZW50IiwidmFsaWRhdG9yIiwiX2lucHV0U2VsZWN0b3IiLCJfc3VibWl0QnV0dG9uU2VsZWN0b3IiLCJfaW5hY3RpdmVCdXR0b25DbGFzcyIsIl9pbnB1dEVycm9yQ2xhc3MiLCJfZXJyb3JDbGFzcyIsIl9mb3JtRWxlbWVudCIsIl9idXR0b25FbCIsImlucHV0RWwiLCJfY2hlY2tWYWxpZGl0eSIsIl90b2dnbGVTdWJtaXRCdG4iLCJfZGlzYWJsZVN1Ym1pdEJ0biIsInNldFRpbWVvdXQiLCJ2YWxpZGl0eSIsInZhbGlkIiwiX2hpZGVJbnB1dEVycm9yIiwiX3Nob3dJbnB1dEVycm9yIiwiZXJyb3JNZXNzYWdlIiwiaWQiLCJ2YWxpZGF0aW9uTWVzc2FnZSIsIl9oYXNJbnZhbGlkSW5wdXQiLCJfZW5hYmxlU3VibWl0QnRuIiwiZXZlcnkiLCJkaXNhYmxlZCIsImVuYWJsZVZhbGlkYXRpb24iLCJwcmV2ZW50RGVmYXVsdCIsImZvcm1OYW1lIiwiZ2V0QXR0cmlidXRlIl0sInNvdXJjZVJvb3QiOiIifQ==