!function(){"use strict";class e{constructor(e,t,s){this._name=e.name,this._link=e.link,this._cardSelector=t,this._handeImageClick=s}_getTemplate(){return document.querySelector(this._cardSelector).content.querySelector(".card").cloneNode(!0)}_setEventListeners(){this._likeBtn=this._card.querySelector("#card_like-button"),this._deleteBtn=this._card.querySelector(".card__delete-btn"),this._image=this._card.querySelector(".card__image"),this._likeBtn.addEventListener("click",(()=>this._toggleLikeBtn())),this._deleteBtn.addEventListener("click",(()=>this._removeCard())),this._image.addEventListener("click",(()=>this._openImage()))}_openImage(){this._handeImageClick(this._link,this._name)}_toggleLikeBtn(){this._likeBtn.classList.toggle("card__like-button_enabled")}_removeCard(){this._card.remove(),this._card=null}getView(){return this._card=this._getTemplate(),this._setEventListeners(),this._image.src=this._link,this._image.alt=this._name,this._card.querySelector(".card__title").textContent=this._name,this._card}}const t={formSelector:".modal__form",inputSelector:".modal__input",submitButtonSelector:".modal__save-button",inactiveButtonClass:"modal__save-button-disabled",inputErrorClass:".modal__input-type-error",errorClass:"modal__error_visible",cardSectionClass:".cards__list",cardTeplate:".card__teplate"};class s{constructor(e){let{popupSelector:t}=e;this._popupElement=document.querySelector(t)}open(){this._popupElement.classList.add("modal_opened"),document.addEventListener("keydown",this._closeByEsc)}close(){this._popupElement.classList.remove("modal_opened"),document.removeEventListener("keydown",this._closeByEsc)}_closeByEsc=e=>{"Escape"===e.key&&this.close()};setEventListeners(){this._popupElement.addEventListener("mousedown",(e=>{e.target.classList.contains("modal")&&this.close(),e.target.classList.contains("modal__close-button")&&this.close()}))}}class i extends s{constructor(e,s){super({popupSelector:e}),this._popupFormEl=this._popupElement.querySelector(t.formSelector),this._inputEls=this._popupFormEl.querySelectorAll(t.inputSelector),this._handleSubmit=s}setInputValues(e){this._inputEls.forEach((t=>{t.value=e[t.name]}))}close(){super.close(),this._popupFormEl.reset()}_getInputValues(){const e={};return this._inputEls.forEach((t=>{e[t.name]=t.value})),e}setEventListeners(){super.setEventListeners(),this._popupFormEl.addEventListener("submit",(()=>{this._handleSubmit(this._getInputValues())}))}}const n=document.querySelector("#profile__add-button"),r=document.querySelector("#profile__edit-btn");function o(t){const s=function(t){return new e(t,"#card__template",l).getView()}(t);u.addItem(s)}function l(e,t){c.open(e,t)}new class{constructor(e){this._baseUrl=e.baseUrl,this._headers=e.headers}_checkResponse(e){return e.ok?e.json():Promise.reject(`Error: ${e.status}`)}getInitialCards(){fetch(`${this._baseUrl}/cards,`,{headers:this._headers}).then(this._checkResponse).then((e=>{console.log(e)}))}getUserIngo(){}}({baseUrl:"https://around.nomoreparties.co/v1/group-12",headers:{authorization:"cd8b3986-f3d6-4da9-8f48-96bc48ae4bb7","Content-Type":"application/json"}}).getInitialCards();const a=new class{constructor(e){let{title:t,subtitle:s}=e;this._nameEl=document.querySelector(t),this._jobEl=document.querySelector(s)}getUserInfo(){return{title:this._nameEl.textContent,subtitle:this._jobEl.textContent}}setUserInfo(e){this._nameEl.textContent=e.title,this._jobEl.textContent=e.subtitle}}({title:".profile__title",subtitle:".profile__subtitle"}),c=new class extends s{constructor(e){super({popupSelector:e}),this._image=this._popupElement.querySelector(".modal__image"),this._caption=this._popupElement.querySelector(".modal__image-caption")}open(e,t){super.open(),this._image.src=e,this._image.alt=t,this._caption.textContent=t}}("#card__image-modal"),_=new i("#profile__add-modal",(e=>{o(e),_.close()})),d=new i("#profile__edit-modal",(e=>{a.setUserInfo(e),d.close()})),u=new class{constructor(e,t){let{data:s,renderer:i}=e;this._renderedItems=s,this._renderer=i,this._container=document.querySelector(t)}addItem(e){this._container.prepend(e)}renderItems(){this._renderedItems.forEach((e=>{this._renderer(e)}))}}({data:[{name:"Yosemite Valley",link:"https://code.s3.yandex.net/web-code/yosemite.jpg"},{name:"Lake Louise",link:"https://code.s3.yandex.net/web-code/lake-louise.jpg"},{name:"Bald Mountains",link:"https://code.s3.yandex.net/web-code/bald-mountains.jpg"},{name:"Latemar",link:"https://code.s3.yandex.net/web-code/latemar.jpg"},{name:"Vanoise National Park",link:"https://code.s3.yandex.net/web-code/vanoise.jpg"},{name:"Lago di Braies",link:"https://code.s3.yandex.net/web-code/lago.jpg"}],renderer:e=>{o(e)}},t.cardSectionClass);u.renderItems();const h={};(e=>{Array.from(document.querySelectorAll(e.formSelector)).forEach((t=>{const s=new class{constructor(e,t){this._inputSelector=e.inputSelector,this._submitButtonSelector=e.submitButtonSelector,this._inactiveButtonClass=e.inactiveButtonClass,this._inputErrorClass=e.inputErrorClass,this._errorClass=e.errorClass,this._formElement=t,this._buttonEl=this._formElement.querySelector(this._submitButtonSelector),this._inputEls=[...this._formElement.querySelectorAll(this._inputSelector)]}_setEventListeners(){this._inputEls.forEach((e=>{e.addEventListener("input",(()=>{this._checkValidity(e),this._toggleSubmitBtn(e)})),this._disableSubmitBtn(),this._formElement.addEventListener("reset",(()=>{setTimeout((()=>{this._toggleSubmitBtn(e)}),0)}))}))}_checkValidity(e){e.validity.valid?this._hideInputError(e):this._showInputError(e)}_showInputError(e){const t=this._formElement.querySelector(`#${e.id}-error`);e.classList.add(this._inputErrorClass),t.textContent=e.validationMessage,t.classList.add(this._errorClass)}_hideInputError(e){const t=this._formElement.querySelector(`#${e.id}-error`);e.classList.remove(this._inputErrorClass),t.textContent="",t.classList.remove(this._errorClass)}_toggleSubmitBtn(){this._hasInvalidInput()?this._disableSubmitBtn():this._enableSubmitBtn()}_hasInvalidInput(){return!this._inputEls.every((e=>e.validity.valid))}_disableSubmitBtn(){this._buttonEl.classList.add(this._inactiveButtonClass),this._buttonEl.disabled=!0}_enableSubmitBtn(){this._buttonEl.classList.remove(this._inactiveButtonClass),this._buttonEl.disabled=!1}enableValidation(){this._formElement.addEventListener("submit",(e=>{e.preventDefault()})),this._setEventListeners()}}(e,t),i=t.getAttribute("name");h[i]=s,s.enableValidation()}))})(t),c.setEventListeners(),_.setEventListeners(),d.setEventListeners(),n.addEventListener("click",(()=>_.open())),r.addEventListener("click",(()=>{d.open(),d.setInputValues(a.getUserInfo())}))}();
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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Y2hELGlCQUFpQixTQUFTLElBQU1vRixFQUFhNUQsU0FDM0R5QixFQUFlakQsaUJBQWlCLFNBQVMsS0FDdkNxRixFQUFjN0QsT0FDZDZELEVBQWM1QyxlQUFlbUMsRUFBU0ssY0FBYyxHIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vcHJhY3RpY3VtLy4vc3JjL2NvbXBvbmVudHMvQ2FyZC5qcyIsIndlYnBhY2s6Ly9wcmFjdGljdW0vLi9zcmMvdXRpbHMvY29uc3RhbnRzLmpzIiwid2VicGFjazovL3ByYWN0aWN1bS8uL3NyYy9jb21wb25lbnRzL1BvcHVwLmpzIiwid2VicGFjazovL3ByYWN0aWN1bS8uL3NyYy9jb21wb25lbnRzL1BvcHVwV2l0aEZvcm0uanMiLCJ3ZWJwYWNrOi8vcHJhY3RpY3VtLy4vc3JjL3BhZ2UvaW5kZXguanMiLCJ3ZWJwYWNrOi8vcHJhY3RpY3VtLy4vc3JjL2NvbXBvbmVudHMvQXBpLmpzIiwid2VicGFjazovL3ByYWN0aWN1bS8uL3NyYy9jb21wb25lbnRzL1VzZXJJbmZvLmpzIiwid2VicGFjazovL3ByYWN0aWN1bS8uL3NyYy9jb21wb25lbnRzL1BvcHVwV2l0aEltYWdlLmpzIiwid2VicGFjazovL3ByYWN0aWN1bS8uL3NyYy9jb21wb25lbnRzL1NlY3Rpb24uanMiLCJ3ZWJwYWNrOi8vcHJhY3RpY3VtLy4vc3JjL2NvbXBvbmVudHMvRm9ybVZhbGlkYXRvci5qcyJdLCJzb3VyY2VzQ29udGVudCI6WyJleHBvcnQgZGVmYXVsdCBjbGFzcyBDYXJkIHtcclxuICBjb25zdHJ1Y3RvcihkYXRhLCBjYXJkU2VsZWN0b3IsIGhhbmRsZUltYWdlQ2xpY2spIHtcclxuICAgIHRoaXMuX25hbWUgPSBkYXRhLm5hbWU7XHJcbiAgICB0aGlzLl9saW5rID0gZGF0YS5saW5rO1xyXG4gICAgdGhpcy5fY2FyZFNlbGVjdG9yID0gY2FyZFNlbGVjdG9yO1xyXG4gICAgdGhpcy5faGFuZGVJbWFnZUNsaWNrID0gaGFuZGxlSW1hZ2VDbGljaztcclxuICB9XHJcblxyXG4gIF9nZXRUZW1wbGF0ZSgpIHtcclxuICAgIGNvbnN0IGNhcmRFbCA9IGRvY3VtZW50XHJcbiAgICAgIC5xdWVyeVNlbGVjdG9yKHRoaXMuX2NhcmRTZWxlY3RvcilcclxuICAgICAgLmNvbnRlbnQucXVlcnlTZWxlY3RvcihcIi5jYXJkXCIpXHJcbiAgICAgIC5jbG9uZU5vZGUodHJ1ZSk7XHJcbiAgICByZXR1cm4gY2FyZEVsO1xyXG4gIH1cclxuXHJcbiAgX3NldEV2ZW50TGlzdGVuZXJzKCkge1xyXG4gICAgdGhpcy5fbGlrZUJ0biA9IHRoaXMuX2NhcmQucXVlcnlTZWxlY3RvcihcIiNjYXJkX2xpa2UtYnV0dG9uXCIpO1xyXG4gICAgdGhpcy5fZGVsZXRlQnRuID0gdGhpcy5fY2FyZC5xdWVyeVNlbGVjdG9yKFwiLmNhcmRfX2RlbGV0ZS1idG5cIik7XHJcbiAgICB0aGlzLl9pbWFnZSA9IHRoaXMuX2NhcmQucXVlcnlTZWxlY3RvcihcIi5jYXJkX19pbWFnZVwiKTtcclxuICAgIHRoaXMuX2xpa2VCdG4uYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsICgpID0+IHRoaXMuX3RvZ2dsZUxpa2VCdG4oKSk7XHJcbiAgICB0aGlzLl9kZWxldGVCdG4uYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsICgpID0+IHRoaXMuX3JlbW92ZUNhcmQoKSk7XHJcbiAgICB0aGlzLl9pbWFnZS5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgKCkgPT4gdGhpcy5fb3BlbkltYWdlKCkpO1xyXG4gIH1cclxuXHJcbiAgX29wZW5JbWFnZSgpIHtcclxuICAgIHRoaXMuX2hhbmRlSW1hZ2VDbGljayh0aGlzLl9saW5rLCB0aGlzLl9uYW1lKTtcclxuICB9XHJcblxyXG4gIF90b2dnbGVMaWtlQnRuKCkge1xyXG4gICAgdGhpcy5fbGlrZUJ0bi5jbGFzc0xpc3QudG9nZ2xlKFwiY2FyZF9fbGlrZS1idXR0b25fZW5hYmxlZFwiKTtcclxuICB9XHJcblxyXG4gIF9yZW1vdmVDYXJkKCkge1xyXG4gICAgdGhpcy5fY2FyZC5yZW1vdmUoKTtcclxuICAgIHRoaXMuX2NhcmQgPSBudWxsO1xyXG4gIH1cclxuXHJcbiAgZ2V0VmlldygpIHtcclxuICAgIHRoaXMuX2NhcmQgPSB0aGlzLl9nZXRUZW1wbGF0ZSgpO1xyXG4gICAgdGhpcy5fc2V0RXZlbnRMaXN0ZW5lcnMoKTtcclxuICAgIHRoaXMuX2ltYWdlLnNyYyA9IHRoaXMuX2xpbms7XHJcbiAgICB0aGlzLl9pbWFnZS5hbHQgPSB0aGlzLl9uYW1lO1xyXG4gICAgdGhpcy5fY2FyZC5xdWVyeVNlbGVjdG9yKFwiLmNhcmRfX3RpdGxlXCIpLnRleHRDb250ZW50ID0gdGhpcy5fbmFtZTtcclxuXHJcbiAgICByZXR1cm4gdGhpcy5fY2FyZDtcclxuICB9XHJcbn1cclxuIiwiLy9zZWxlY3RvcnMgZm9yIHZhbGlkYXRpb25cclxuXHJcbmNvbnN0IGNvbmZpZyA9IHtcclxuICBmb3JtU2VsZWN0b3I6IFwiLm1vZGFsX19mb3JtXCIsXHJcbiAgaW5wdXRTZWxlY3RvcjogXCIubW9kYWxfX2lucHV0XCIsXHJcbiAgc3VibWl0QnV0dG9uU2VsZWN0b3I6IFwiLm1vZGFsX19zYXZlLWJ1dHRvblwiLFxyXG4gIGluYWN0aXZlQnV0dG9uQ2xhc3M6IFwibW9kYWxfX3NhdmUtYnV0dG9uLWRpc2FibGVkXCIsXHJcbiAgaW5wdXRFcnJvckNsYXNzOiBcIi5tb2RhbF9faW5wdXQtdHlwZS1lcnJvclwiLFxyXG4gIGVycm9yQ2xhc3M6IFwibW9kYWxfX2Vycm9yX3Zpc2libGVcIixcclxuICBjYXJkU2VjdGlvbkNsYXNzOiBcIi5jYXJkc19fbGlzdFwiLFxyXG4gIGNhcmRUZXBsYXRlOiBcIi5jYXJkX190ZXBsYXRlXCIsXHJcbn07XHJcblxyXG5jb25zdCBpbml0aWFsQ2FyZHMgPSBbXHJcbiAge1xyXG4gICAgbmFtZTogXCJZb3NlbWl0ZSBWYWxsZXlcIixcclxuICAgIGxpbms6IFwiaHR0cHM6Ly9jb2RlLnMzLnlhbmRleC5uZXQvd2ViLWNvZGUveW9zZW1pdGUuanBnXCIsXHJcbiAgfSxcclxuICB7XHJcbiAgICBuYW1lOiBcIkxha2UgTG91aXNlXCIsXHJcbiAgICBsaW5rOiBcImh0dHBzOi8vY29kZS5zMy55YW5kZXgubmV0L3dlYi1jb2RlL2xha2UtbG91aXNlLmpwZ1wiLFxyXG4gIH0sXHJcbiAge1xyXG4gICAgbmFtZTogXCJCYWxkIE1vdW50YWluc1wiLFxyXG4gICAgbGluazogXCJodHRwczovL2NvZGUuczMueWFuZGV4Lm5ldC93ZWItY29kZS9iYWxkLW1vdW50YWlucy5qcGdcIixcclxuICB9LFxyXG4gIHtcclxuICAgIG5hbWU6IFwiTGF0ZW1hclwiLFxyXG4gICAgbGluazogXCJodHRwczovL2NvZGUuczMueWFuZGV4Lm5ldC93ZWItY29kZS9sYXRlbWFyLmpwZ1wiLFxyXG4gIH0sXHJcbiAge1xyXG4gICAgbmFtZTogXCJWYW5vaXNlIE5hdGlvbmFsIFBhcmtcIixcclxuICAgIGxpbms6IFwiaHR0cHM6Ly9jb2RlLnMzLnlhbmRleC5uZXQvd2ViLWNvZGUvdmFub2lzZS5qcGdcIixcclxuICB9LFxyXG4gIHtcclxuICAgIG5hbWU6IFwiTGFnbyBkaSBCcmFpZXNcIixcclxuICAgIGxpbms6IFwiaHR0cHM6Ly9jb2RlLnMzLnlhbmRleC5uZXQvd2ViLWNvZGUvbGFnby5qcGdcIixcclxuICB9LFxyXG5dO1xyXG5cclxuZXhwb3J0IHsgY29uZmlnLCBpbml0aWFsQ2FyZHMgfTtcclxuIiwiZXhwb3J0IGRlZmF1bHQgY2xhc3MgUG9wdXAge1xyXG4gIGNvbnN0cnVjdG9yKHsgcG9wdXBTZWxlY3RvciB9KSB7XHJcbiAgICB0aGlzLl9wb3B1cEVsZW1lbnQgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKHBvcHVwU2VsZWN0b3IpO1xyXG4gIH1cclxuICBvcGVuKCkge1xyXG4gICAgLy9vcGVuIHBvcHVwXHJcbiAgICB0aGlzLl9wb3B1cEVsZW1lbnQuY2xhc3NMaXN0LmFkZChcIm1vZGFsX29wZW5lZFwiKTtcclxuICAgIGRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoXCJrZXlkb3duXCIsIHRoaXMuX2Nsb3NlQnlFc2MpO1xyXG4gIH1cclxuICBjbG9zZSgpIHtcclxuICAgIC8vY2xvc2UgcG9wdXBcclxuICAgIHRoaXMuX3BvcHVwRWxlbWVudC5jbGFzc0xpc3QucmVtb3ZlKFwibW9kYWxfb3BlbmVkXCIpO1xyXG4gICAgZG9jdW1lbnQucmVtb3ZlRXZlbnRMaXN0ZW5lcihcImtleWRvd25cIiwgdGhpcy5fY2xvc2VCeUVzYyk7XHJcbiAgfVxyXG4gIF9jbG9zZUJ5RXNjID0gKGV2dCkgPT4ge1xyXG4gICAgaWYgKGV2dC5rZXkgPT09IFwiRXNjYXBlXCIpIHtcclxuICAgICAgdGhpcy5jbG9zZSgpO1xyXG4gICAgfVxyXG4gIH07XHJcblxyXG4gIHNldEV2ZW50TGlzdGVuZXJzKCkge1xyXG4gICAgdGhpcy5fcG9wdXBFbGVtZW50LmFkZEV2ZW50TGlzdGVuZXIoXCJtb3VzZWRvd25cIiwgKGV2dCkgPT4ge1xyXG4gICAgICBpZiAoZXZ0LnRhcmdldC5jbGFzc0xpc3QuY29udGFpbnMoXCJtb2RhbFwiKSkge1xyXG4gICAgICAgIHRoaXMuY2xvc2UoKTtcclxuICAgICAgfVxyXG4gICAgICBpZiAoZXZ0LnRhcmdldC5jbGFzc0xpc3QuY29udGFpbnMoXCJtb2RhbF9fY2xvc2UtYnV0dG9uXCIpKSB7XHJcbiAgICAgICAgdGhpcy5jbG9zZSgpO1xyXG4gICAgICB9XHJcbiAgICB9KTtcclxuICB9XHJcbn1cclxuIiwiaW1wb3J0IFBvcHVwIGZyb20gXCIuL1BvcHVwXCI7XHJcbmltcG9ydCB7IGNvbmZpZyB9IGZyb20gXCIuLi91dGlscy9jb25zdGFudHMuanNcIjtcclxuXHJcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFBvcHVwV2l0aEZvcm0gZXh0ZW5kcyBQb3B1cCB7XHJcbiAgY29uc3RydWN0b3IocG9wdXBTZWxlY3RvciwgaGFuZGxlU3VibWl0KSB7XHJcbiAgICBzdXBlcih7IHBvcHVwU2VsZWN0b3IgfSk7ICAgIFxyXG4gICAgdGhpcy5fcG9wdXBGb3JtRWwgPSB0aGlzLl9wb3B1cEVsZW1lbnQucXVlcnlTZWxlY3Rvcihjb25maWcuZm9ybVNlbGVjdG9yKTtcclxuICAgIHRoaXMuX2lucHV0RWxzID0gdGhpcy5fcG9wdXBGb3JtRWwucXVlcnlTZWxlY3RvckFsbChjb25maWcuaW5wdXRTZWxlY3Rvcik7XHJcbiAgICB0aGlzLl9oYW5kbGVTdWJtaXQgPSBoYW5kbGVTdWJtaXQ7ICAgIFxyXG4gIH1cclxuICBzZXRJbnB1dFZhbHVlcyhkYXRhKSB7XHJcbiAgICB0aGlzLl9pbnB1dEVscy5mb3JFYWNoKChpbnB1dCkgPT4ge1xyXG4gICAgICAvLyBoZXJlIHlvdSBpbnNlcnQgdGhlIGB2YWx1ZWAgYnkgdGhlIGBuYW1lYCBvZiB0aGUgaW5wdXRcclxuICAgICAgaW5wdXQudmFsdWUgPSBkYXRhW2lucHV0Lm5hbWVdO1xyXG4gICAgfSk7XHJcbiAgfVxyXG5cclxuICBjbG9zZSgpIHtcclxuICAgIHN1cGVyLmNsb3NlKCk7XHJcbiAgICB0aGlzLl9wb3B1cEZvcm1FbC5yZXNldCgpO1xyXG4gIH0gIFxyXG5cclxuICBfZ2V0SW5wdXRWYWx1ZXMoKSB7XHJcbiAgICBjb25zdCBpbnB1dFZhbHVlcyA9IHt9O1xyXG4gICAgLy9nZXQgYWxsIGlucHV0cyAgICBcclxuICAgIC8vbG9vcCBvdmVyIGFsbCBpbnB1dHNcclxuICAgIHRoaXMuX2lucHV0RWxzLmZvckVhY2goKGlucHV0KSA9PiB7XHJcbiAgICAgIC8vYXNzaWduIGlucHV0cyB0byBlbXB0eSBvYmplY3QgYnkgbmFtZT12YWx1ZVxyXG4gICAgICBpbnB1dFZhbHVlc1tpbnB1dC5uYW1lXSA9IGlucHV0LnZhbHVlO1xyXG4gICAgfSk7XHJcbiAgICByZXR1cm4gaW5wdXRWYWx1ZXM7XHJcbiAgfVxyXG5cclxuICBzZXRFdmVudExpc3RlbmVycygpIHtcclxuICAgIHN1cGVyLnNldEV2ZW50TGlzdGVuZXJzKCk7XHJcbiAgICB0aGlzLl9wb3B1cEZvcm1FbC5hZGRFdmVudExpc3RlbmVyKFwic3VibWl0XCIsICgpID0+IHtcclxuICAgICAgdGhpcy5faGFuZGxlU3VibWl0KHRoaXMuX2dldElucHV0VmFsdWVzKCkpO1xyXG4gICAgfSk7XHJcbiAgfVxyXG59XHJcbiIsIi8vYnV0IHdoeSB3ZSBjYW5ub3QganVzdCB1c2UgVEFCIGluZGVudGF0aW9uIG9uIGNvZGUgZm9ybWF0dGluZz8gd2h5IGl0IHNob3VsZCBiZSBkb3VibGUgc3BhY2U/XHJcbmltcG9ydCBGb3JtVmFsaWRhdG9yIGZyb20gXCIuLi9jb21wb25lbnRzL0Zvcm1WYWxpZGF0b3IuanNcIjtcclxuaW1wb3J0IENhcmQgZnJvbSBcIi4uL2NvbXBvbmVudHMvQ2FyZC5qc1wiO1xyXG5pbXBvcnQgeyBjb25maWcsIGluaXRpYWxDYXJkcyB9IGZyb20gXCIuLi91dGlscy9jb25zdGFudHMuanNcIjtcclxuaW1wb3J0IFNlY3Rpb24gZnJvbSBcIi4uL2NvbXBvbmVudHMvU2VjdGlvbi5qc1wiO1xyXG5pbXBvcnQgUG9wdXBXaXRoSW1hZ2UgZnJvbSBcIi4uL2NvbXBvbmVudHMvUG9wdXBXaXRoSW1hZ2UuanNcIjtcclxuaW1wb3J0IFBvcHVwV2l0aEZvcm0gZnJvbSBcIi4uL2NvbXBvbmVudHMvUG9wdXBXaXRoRm9ybS5qc1wiO1xyXG5pbXBvcnQgVXNlckluZm8gZnJvbSBcIi4uL2NvbXBvbmVudHMvVXNlckluZm8uanNcIjtcclxuaW1wb3J0IEFwaSBmcm9tIFwiLi4vY29tcG9uZW50cy9BcGkuanNcIjtcclxuaW1wb3J0IFwiLi4vcGFnZS9pbmRleC5jc3NcIjtcclxuXHJcbmNvbnN0IHByb2ZpbGVBZGRCdG4gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiI3Byb2ZpbGVfX2FkZC1idXR0b25cIik7XHJcbmNvbnN0IHByb2ZpbGVFZGl0QnRuID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIiNwcm9maWxlX19lZGl0LWJ0blwiKTtcclxuXHJcbmZ1bmN0aW9uIGNyZWF0ZUNhcmQoaXRlbSkge1xyXG4gIGNvbnN0IGNhcmRFbGVtZW50ID0gbmV3IENhcmQoXHJcbiAgICBpdGVtLFxyXG4gICAgXCIjY2FyZF9fdGVtcGxhdGVcIixcclxuICAgIGhhbmRsZUltYWdlQ2xpY2tcclxuICApLmdldFZpZXcoKTtcclxuICByZXR1cm4gY2FyZEVsZW1lbnQ7XHJcbn1cclxuXHJcbmZ1bmN0aW9uIHJlbmRlckNhcmQoaXRlbSkge1xyXG4gIGNvbnN0IGNhcmQgPSBjcmVhdGVDYXJkKGl0ZW0pO1xyXG4gIGNhcmRTZWN0aW9uLmFkZEl0ZW0oY2FyZCk7XHJcbn1cclxuXHJcbmZ1bmN0aW9uIGhhbmRsZUltYWdlQ2xpY2sobmFtZSwgbGluaykge1xyXG4gIHBvcHVwSW1hZ2Uub3BlbihuYW1lLCBsaW5rKTtcclxufVxyXG5cclxuY29uc3QgYXBpID0gbmV3IEFwaSh7XHJcbiAgYmFzZVVybDogXCJodHRwczovL2Fyb3VuZC5ub21vcmVwYXJ0aWVzLmNvL3YxL2dyb3VwLTEyXCIsXHJcbiAgaGVhZGVyczoge1xyXG4gICAgYXV0aG9yaXphdGlvbjogXCJjZDhiMzk4Ni1mM2Q2LTRkYTktOGY0OC05NmJjNDhhZTRiYjdcIixcclxuICAgIFwiQ29udGVudC1UeXBlXCI6IFwiYXBwbGljYXRpb24vanNvblwiLFxyXG4gIH0sXHJcbn0pO1xyXG5cclxuYXBpLmdldEluaXRpYWxDYXJkcygpXHJcblxyXG5jb25zdCB1c2VySW5mbyA9IG5ldyBVc2VySW5mbyh7XHJcbiAgdGl0bGU6IFwiLnByb2ZpbGVfX3RpdGxlXCIsXHJcbiAgc3VidGl0bGU6IFwiLnByb2ZpbGVfX3N1YnRpdGxlXCIsXHJcbn0pO1xyXG5cclxuY29uc3QgcG9wdXBJbWFnZSA9IG5ldyBQb3B1cFdpdGhJbWFnZShcIiNjYXJkX19pbWFnZS1tb2RhbFwiKTtcclxuXHJcbmNvbnN0IHBvcHVwQWRkRm9ybSA9IG5ldyBQb3B1cFdpdGhGb3JtKFwiI3Byb2ZpbGVfX2FkZC1tb2RhbFwiLCAoaW5wdXRWYWx1ZXMpID0+IHtcclxuICByZW5kZXJDYXJkKGlucHV0VmFsdWVzKTtcclxuICBwb3B1cEFkZEZvcm0uY2xvc2UoKTtcclxufSk7XHJcblxyXG5jb25zdCBwb3B1cEVkaXRGb3JtID0gbmV3IFBvcHVwV2l0aEZvcm0oXHJcbiAgXCIjcHJvZmlsZV9fZWRpdC1tb2RhbFwiLFxyXG4gIChpbnB1dFZhbHVlcykgPT4ge1xyXG4gICAgdXNlckluZm8uc2V0VXNlckluZm8oaW5wdXRWYWx1ZXMpO1xyXG4gICAgcG9wdXBFZGl0Rm9ybS5jbG9zZSgpO1xyXG4gIH1cclxuKTtcclxuXHJcbmNvbnN0IGNhcmRTZWN0aW9uID0gbmV3IFNlY3Rpb24oXHJcbiAge1xyXG4gICAgZGF0YTogaW5pdGlhbENhcmRzLFxyXG4gICAgcmVuZGVyZXI6IChpdGVtKSA9PiB7XHJcbiAgICAgIHJlbmRlckNhcmQoaXRlbSk7XHJcbiAgICB9LFxyXG4gIH0sXHJcbiAgY29uZmlnLmNhcmRTZWN0aW9uQ2xhc3NcclxuKTtcclxuY2FyZFNlY3Rpb24ucmVuZGVySXRlbXMoKTtcclxuXHJcbmNvbnN0IGZvcm1WYWxpZGF0b3JzID0ge307XHJcblxyXG4vLyBlbmFibGUgdmFsaWRhdGlvblxyXG5jb25zdCBlbmFibGVWYWxpZGF0aW9uID0gKGNvbmZpZykgPT4ge1xyXG4gIGNvbnN0IGZvcm1MaXN0ID0gQXJyYXkuZnJvbShkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKGNvbmZpZy5mb3JtU2VsZWN0b3IpKTtcclxuICBmb3JtTGlzdC5mb3JFYWNoKChmb3JtRWxlbWVudCkgPT4ge1xyXG4gICAgY29uc3QgdmFsaWRhdG9yID0gbmV3IEZvcm1WYWxpZGF0b3IoY29uZmlnLCBmb3JtRWxlbWVudCk7XHJcbiAgICAvLyBoZXJlIHlvdSBnZXQgdGhlIG5hbWUgb2YgdGhlIGZvcm1cclxuICAgIGNvbnN0IGZvcm1OYW1lID0gZm9ybUVsZW1lbnQuZ2V0QXR0cmlidXRlKFwibmFtZVwiKTtcclxuXHJcbiAgICAvLyBoZXJlIHlvdSBzdG9yZSBhIHZhbGlkYXRvciBieSB0aGUgYG5hbWVgIG9mIHRoZSBmb3JtXHJcbiAgICBmb3JtVmFsaWRhdG9yc1tmb3JtTmFtZV0gPSB2YWxpZGF0b3I7XHJcbiAgICB2YWxpZGF0b3IuZW5hYmxlVmFsaWRhdGlvbigpO1xyXG4gIH0pO1xyXG59O1xyXG5cclxuZW5hYmxlVmFsaWRhdGlvbihjb25maWcpO1xyXG5cclxucG9wdXBJbWFnZS5zZXRFdmVudExpc3RlbmVycygpO1xyXG5wb3B1cEFkZEZvcm0uc2V0RXZlbnRMaXN0ZW5lcnMoKTtcclxucG9wdXBFZGl0Rm9ybS5zZXRFdmVudExpc3RlbmVycygpO1xyXG5cclxucHJvZmlsZUFkZEJ0bi5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgKCkgPT4gcG9wdXBBZGRGb3JtLm9wZW4oKSk7XHJcbnByb2ZpbGVFZGl0QnRuLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCAoKSA9PiB7XHJcbiAgcG9wdXBFZGl0Rm9ybS5vcGVuKCk7XHJcbiAgcG9wdXBFZGl0Rm9ybS5zZXRJbnB1dFZhbHVlcyh1c2VySW5mby5nZXRVc2VySW5mbygpKTtcclxufSk7XHJcbiIsImV4cG9ydCBkZWZhdWx0IGNsYXNzIEFwaSB7XHJcbiAgICBjb25zdHJ1Y3RvcihvcHRpb25zKXtcclxuICAgICAgICB0aGlzLl9iYXNlVXJsID0gb3B0aW9ucy5iYXNlVXJsO1xyXG4gICAgICAgIHRoaXMuX2hlYWRlcnMgPSBvcHRpb25zLmhlYWRlcnM7XHJcblxyXG4gICAgfVxyXG5cclxuICAgIF9jaGVja1Jlc3BvbnNlKHJlcykge1xyXG4gICAgICAgIGlmIChyZXMub2spIHtcclxuICAgICAgICAgIHJldHVybiByZXMuanNvbigpO1xyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gUHJvbWlzZS5yZWplY3QoYEVycm9yOiAke3Jlcy5zdGF0dXN9YCk7XHJcbiAgICB9XHJcbiAgICBcclxuXHJcbiAgICBnZXRJbml0aWFsQ2FyZHMoKXtcclxuICAgICAgZmV0Y2goYCR7dGhpcy5fYmFzZVVybH0vY2FyZHMsYCx7XHJcbiAgICAgICAgaGVhZGVyczogdGhpcy5faGVhZGVyc1xyXG4gICAgICB9KVxyXG4gICAgICAudGhlbih0aGlzLl9jaGVja1Jlc3BvbnNlKVxyXG4gICAgICAudGhlbigoZGF0YSkgPT4ge1xyXG4gICAgICAgIGNvbnNvbGUubG9nKGRhdGEpXHJcbiAgICAgIH0pXHJcbiAgICAgIFxyXG4gICAgfVxyXG5cclxuICAgIGdldFVzZXJJbmdvKCl7XHJcblxyXG4gICAgfVxyXG59XHJcblxyXG5cclxuXHJcbiIsImV4cG9ydCBkZWZhdWx0IGNsYXNzIFVzZXJJbmZvIHtcclxuICBjb25zdHJ1Y3Rvcih7IHRpdGxlLCBzdWJ0aXRsZSB9KSB7XHJcbiAgICB0aGlzLl9uYW1lRWwgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKHRpdGxlKTtcclxuICAgIHRoaXMuX2pvYkVsID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihzdWJ0aXRsZSk7XHJcbiAgfVxyXG4gIGdldFVzZXJJbmZvKCkge1xyXG4gICAgcmV0dXJuIHtcclxuICAgICAgdGl0bGU6IHRoaXMuX25hbWVFbC50ZXh0Q29udGVudCxcclxuICAgICAgc3VidGl0bGU6IHRoaXMuX2pvYkVsLnRleHRDb250ZW50LFxyXG4gICAgfTtcclxuICB9XHJcbiAgc2V0VXNlckluZm8odmFsdWUpIHtcclxuICAgIC8vc2V0IHVzZXIgaW5mbyBmcm9tIHZhbHVlXHJcbiAgICB0aGlzLl9uYW1lRWwudGV4dENvbnRlbnQgPSB2YWx1ZS50aXRsZTtcclxuICAgIHRoaXMuX2pvYkVsLnRleHRDb250ZW50ID0gdmFsdWUuc3VidGl0bGU7XHJcbiAgfVxyXG59XHJcbiIsImltcG9ydCBQb3B1cCBmcm9tIFwiLi9Qb3B1cFwiO1xyXG5cclxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgUG9wdXBXaXRoSW1hZ2UgZXh0ZW5kcyBQb3B1cCB7XHJcbiAgY29uc3RydWN0b3IocG9wdXBTZWxlY3Rvcikge1xyXG4gICAgc3VwZXIoeyBwb3B1cFNlbGVjdG9yIH0pO1xyXG4gICAgdGhpcy5faW1hZ2UgPSB0aGlzLl9wb3B1cEVsZW1lbnQucXVlcnlTZWxlY3RvcihcIi5tb2RhbF9faW1hZ2VcIik7XHJcbiAgICB0aGlzLl9jYXB0aW9uID0gdGhpcy5fcG9wdXBFbGVtZW50LnF1ZXJ5U2VsZWN0b3IoXCIubW9kYWxfX2ltYWdlLWNhcHRpb25cIik7XHJcbiAgfVxyXG4gIG9wZW4obmFtZSwgbGluaykge1xyXG4gICAgc3VwZXIub3BlbigpOyAgICBcclxuICAgIHRoaXMuX2ltYWdlLnNyYyA9IG5hbWU7XHJcbiAgICB0aGlzLl9pbWFnZS5hbHQgPSBsaW5rO1xyXG4gICAgdGhpcy5fY2FwdGlvbi50ZXh0Q29udGVudCA9IGxpbms7XHJcbiAgfVxyXG59XHJcbiIsImV4cG9ydCBkZWZhdWx0IGNsYXNzIFNlY3Rpb24ge1xyXG4gIGNvbnN0cnVjdG9yKHsgZGF0YSwgcmVuZGVyZXIgfSwgY2FyZExpc3QpIHtcclxuICAgIHRoaXMuX3JlbmRlcmVkSXRlbXMgPSBkYXRhO1xyXG4gICAgdGhpcy5fcmVuZGVyZXIgPSByZW5kZXJlcjtcclxuICAgIHRoaXMuX2NvbnRhaW5lciA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoY2FyZExpc3QpO1xyXG4gIH1cclxuXHJcbiAgYWRkSXRlbShlbGVtZW50KSB7XHJcbiAgICB0aGlzLl9jb250YWluZXIucHJlcGVuZChlbGVtZW50KTtcclxuICB9XHJcblxyXG4gIHJlbmRlckl0ZW1zKCkge1xyXG4gICAgdGhpcy5fcmVuZGVyZWRJdGVtcy5mb3JFYWNoKChpdGVtKSA9PiB7XHJcbiAgICAgIHRoaXMuX3JlbmRlcmVyKGl0ZW0pO1xyXG4gICAgfSk7XHJcbiAgfVxyXG59XHJcbiIsImNsYXNzIEZvcm1WYWxpZGF0b3Ige1xyXG4gIGNvbnN0cnVjdG9yKGNvbmZpZywgZm9ybUVsZW1lbnQpIHtcclxuICAgIHRoaXMuX2lucHV0U2VsZWN0b3IgPSBjb25maWcuaW5wdXRTZWxlY3RvcjtcclxuICAgIHRoaXMuX3N1Ym1pdEJ1dHRvblNlbGVjdG9yID0gY29uZmlnLnN1Ym1pdEJ1dHRvblNlbGVjdG9yO1xyXG4gICAgdGhpcy5faW5hY3RpdmVCdXR0b25DbGFzcyA9IGNvbmZpZy5pbmFjdGl2ZUJ1dHRvbkNsYXNzO1xyXG4gICAgdGhpcy5faW5wdXRFcnJvckNsYXNzID0gY29uZmlnLmlucHV0RXJyb3JDbGFzcztcclxuICAgIHRoaXMuX2Vycm9yQ2xhc3MgPSBjb25maWcuZXJyb3JDbGFzcztcclxuICAgIHRoaXMuX2Zvcm1FbGVtZW50ID0gZm9ybUVsZW1lbnQ7XHJcbiAgICB0aGlzLl9idXR0b25FbCA9IHRoaXMuX2Zvcm1FbGVtZW50LnF1ZXJ5U2VsZWN0b3IoXHJcbiAgICAgIHRoaXMuX3N1Ym1pdEJ1dHRvblNlbGVjdG9yXHJcbiAgICApO1xyXG4gICAgdGhpcy5faW5wdXRFbHMgPSBbXHJcbiAgICAgIC4uLnRoaXMuX2Zvcm1FbGVtZW50LnF1ZXJ5U2VsZWN0b3JBbGwodGhpcy5faW5wdXRTZWxlY3RvciksXHJcbiAgICBdO1xyXG4gIH1cclxuXHJcbiAgX3NldEV2ZW50TGlzdGVuZXJzKCkge1xyXG4gICAgdGhpcy5faW5wdXRFbHMuZm9yRWFjaCgoaW5wdXRFbCkgPT4ge1xyXG4gICAgICBpbnB1dEVsLmFkZEV2ZW50TGlzdGVuZXIoXCJpbnB1dFwiLCAoKSA9PiB7XHJcbiAgICAgICAgdGhpcy5fY2hlY2tWYWxpZGl0eShpbnB1dEVsKTtcclxuICAgICAgICB0aGlzLl90b2dnbGVTdWJtaXRCdG4oaW5wdXRFbCk7XHJcbiAgICAgIH0pO1xyXG4gICAgICB0aGlzLl9kaXNhYmxlU3VibWl0QnRuKCk7XHJcbiAgICAgIC8vcmVzZXQgXCJldmVudFwiXHJcbiAgICAgIHRoaXMuX2Zvcm1FbGVtZW50LmFkZEV2ZW50TGlzdGVuZXIoXCJyZXNldFwiLCAoKSA9PiB7XHJcbiAgICAgICAgLy8gYHNldFRpbWVvdXRgIGlzIG5lZWRlZCB0byB3YWl0IHRpbGwgdGhlIGZvcm0gaXMgZnVsbHkgcmVzZXQgYW5kIHRoZW4gdG8gY2FsbCBgdG9nZ2xlQnV0dG9uU3RhdGVgXHJcbiAgICAgICAgc2V0VGltZW91dCgoKSA9PiB7XHJcbiAgICAgICAgICB0aGlzLl90b2dnbGVTdWJtaXRCdG4oaW5wdXRFbCk7XHJcbiAgICAgICAgfSwgMCk7XHJcbiAgICAgIH0pO1xyXG4gICAgfSk7XHJcbiAgfVxyXG5cclxuICBfY2hlY2tWYWxpZGl0eShpbnB1dEVsKSB7XHJcbiAgICAvL3Rha2luZyBpbnB1dEVsIGZyb20gZXZlbnQgbGlzZW5lcnNcclxuICAgIGlmICghaW5wdXRFbC52YWxpZGl0eS52YWxpZCkge1xyXG4gICAgICB0aGlzLl9zaG93SW5wdXRFcnJvcihpbnB1dEVsKTtcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgIHRoaXMuX2hpZGVJbnB1dEVycm9yKGlucHV0RWwpO1xyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgX3Nob3dJbnB1dEVycm9yKGlucHV0RWwpIHtcclxuICAgIGNvbnN0IGVycm9yTWVzc2FnZSA9IHRoaXMuX2Zvcm1FbGVtZW50LnF1ZXJ5U2VsZWN0b3IoXHJcbiAgICAgIGAjJHtpbnB1dEVsLmlkfS1lcnJvcmBcclxuICAgICk7XHJcbiAgICBpbnB1dEVsLmNsYXNzTGlzdC5hZGQodGhpcy5faW5wdXRFcnJvckNsYXNzKTtcclxuICAgIGVycm9yTWVzc2FnZS50ZXh0Q29udGVudCA9IGlucHV0RWwudmFsaWRhdGlvbk1lc3NhZ2U7XHJcbiAgICBlcnJvck1lc3NhZ2UuY2xhc3NMaXN0LmFkZCh0aGlzLl9lcnJvckNsYXNzKTtcclxuICB9XHJcblxyXG4gIF9oaWRlSW5wdXRFcnJvcihpbnB1dEVsKSB7XHJcbiAgICBjb25zdCBlcnJvck1lc3NhZ2UgPSB0aGlzLl9mb3JtRWxlbWVudC5xdWVyeVNlbGVjdG9yKFxyXG4gICAgICBgIyR7aW5wdXRFbC5pZH0tZXJyb3JgXHJcbiAgICApO1xyXG4gICAgaW5wdXRFbC5jbGFzc0xpc3QucmVtb3ZlKHRoaXMuX2lucHV0RXJyb3JDbGFzcyk7XHJcbiAgICBlcnJvck1lc3NhZ2UudGV4dENvbnRlbnQgPSBcIlwiO1xyXG4gICAgZXJyb3JNZXNzYWdlLmNsYXNzTGlzdC5yZW1vdmUodGhpcy5fZXJyb3JDbGFzcyk7XHJcbiAgfVxyXG5cclxuICBfdG9nZ2xlU3VibWl0QnRuKCkge1xyXG4gICAgaWYgKHRoaXMuX2hhc0ludmFsaWRJbnB1dCgpKSB7XHJcbiAgICAgIHRoaXMuX2Rpc2FibGVTdWJtaXRCdG4oKTtcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgIHRoaXMuX2VuYWJsZVN1Ym1pdEJ0bigpO1xyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgX2hhc0ludmFsaWRJbnB1dCgpIHtcclxuICAgIHJldHVybiAhdGhpcy5faW5wdXRFbHMuZXZlcnkoKGlucHV0RWwpID0+IGlucHV0RWwudmFsaWRpdHkudmFsaWQpO1xyXG4gIH1cclxuXHJcbiAgX2Rpc2FibGVTdWJtaXRCdG4oKSB7XHJcbiAgICB0aGlzLl9idXR0b25FbC5jbGFzc0xpc3QuYWRkKHRoaXMuX2luYWN0aXZlQnV0dG9uQ2xhc3MpO1xyXG4gICAgdGhpcy5fYnV0dG9uRWwuZGlzYWJsZWQgPSB0cnVlO1xyXG4gIH1cclxuXHJcbiAgX2VuYWJsZVN1Ym1pdEJ0bigpIHtcclxuICAgIHRoaXMuX2J1dHRvbkVsLmNsYXNzTGlzdC5yZW1vdmUodGhpcy5faW5hY3RpdmVCdXR0b25DbGFzcyk7XHJcbiAgICB0aGlzLl9idXR0b25FbC5kaXNhYmxlZCA9IGZhbHNlO1xyXG4gIH1cclxuXHJcbiAgZW5hYmxlVmFsaWRhdGlvbigpIHtcclxuICAgIHRoaXMuX2Zvcm1FbGVtZW50LmFkZEV2ZW50TGlzdGVuZXIoXCJzdWJtaXRcIiwgKGV2dCkgPT4ge1xyXG4gICAgICBldnQucHJldmVudERlZmF1bHQoKTtcclxuICAgIH0pO1xyXG4gICAgdGhpcy5fc2V0RXZlbnRMaXN0ZW5lcnMoKTtcclxuICB9XHJcbn1cclxuXHJcbmV4cG9ydCBkZWZhdWx0IEZvcm1WYWxpZGF0b3I7XHJcbiJdLCJuYW1lcyI6WyJDYXJkIiwiY29uc3RydWN0b3IiLCJkYXRhIiwiY2FyZFNlbGVjdG9yIiwiaGFuZGxlSW1hZ2VDbGljayIsInRoaXMiLCJfbmFtZSIsIm5hbWUiLCJfbGluayIsImxpbmsiLCJfY2FyZFNlbGVjdG9yIiwiX2hhbmRlSW1hZ2VDbGljayIsIl9nZXRUZW1wbGF0ZSIsImRvY3VtZW50IiwicXVlcnlTZWxlY3RvciIsImNvbnRlbnQiLCJjbG9uZU5vZGUiLCJfc2V0RXZlbnRMaXN0ZW5lcnMiLCJfbGlrZUJ0biIsIl9jYXJkIiwiX2RlbGV0ZUJ0biIsIl9pbWFnZSIsImFkZEV2ZW50TGlzdGVuZXIiLCJfdG9nZ2xlTGlrZUJ0biIsIl9yZW1vdmVDYXJkIiwiX29wZW5JbWFnZSIsImNsYXNzTGlzdCIsInRvZ2dsZSIsInJlbW92ZSIsImdldFZpZXciLCJzcmMiLCJhbHQiLCJ0ZXh0Q29udGVudCIsImNvbmZpZyIsImZvcm1TZWxlY3RvciIsImlucHV0U2VsZWN0b3IiLCJzdWJtaXRCdXR0b25TZWxlY3RvciIsImluYWN0aXZlQnV0dG9uQ2xhc3MiLCJpbnB1dEVycm9yQ2xhc3MiLCJlcnJvckNsYXNzIiwiY2FyZFNlY3Rpb25DbGFzcyIsImNhcmRUZXBsYXRlIiwiUG9wdXAiLCJfcmVmIiwicG9wdXBTZWxlY3RvciIsIl9wb3B1cEVsZW1lbnQiLCJvcGVuIiwiYWRkIiwiX2Nsb3NlQnlFc2MiLCJjbG9zZSIsInJlbW92ZUV2ZW50TGlzdGVuZXIiLCJldnQiLCJrZXkiLCJzZXRFdmVudExpc3RlbmVycyIsInRhcmdldCIsImNvbnRhaW5zIiwiUG9wdXBXaXRoRm9ybSIsImhhbmRsZVN1Ym1pdCIsInN1cGVyIiwiX3BvcHVwRm9ybUVsIiwiX2lucHV0RWxzIiwicXVlcnlTZWxlY3RvckFsbCIsIl9oYW5kbGVTdWJtaXQiLCJzZXRJbnB1dFZhbHVlcyIsImZvckVhY2giLCJpbnB1dCIsInZhbHVlIiwicmVzZXQiLCJfZ2V0SW5wdXRWYWx1ZXMiLCJpbnB1dFZhbHVlcyIsInByb2ZpbGVBZGRCdG4iLCJwcm9maWxlRWRpdEJ0biIsInJlbmRlckNhcmQiLCJpdGVtIiwiY2FyZCIsImNyZWF0ZUNhcmQiLCJjYXJkU2VjdGlvbiIsImFkZEl0ZW0iLCJwb3B1cEltYWdlIiwib3B0aW9ucyIsIl9iYXNlVXJsIiwiYmFzZVVybCIsIl9oZWFkZXJzIiwiaGVhZGVycyIsIl9jaGVja1Jlc3BvbnNlIiwicmVzIiwib2siLCJqc29uIiwiUHJvbWlzZSIsInJlamVjdCIsInN0YXR1cyIsImdldEluaXRpYWxDYXJkcyIsImZldGNoIiwidGhlbiIsImNvbnNvbGUiLCJsb2ciLCJnZXRVc2VySW5nbyIsImF1dGhvcml6YXRpb24iLCJ1c2VySW5mbyIsInRpdGxlIiwic3VidGl0bGUiLCJfbmFtZUVsIiwiX2pvYkVsIiwiZ2V0VXNlckluZm8iLCJzZXRVc2VySW5mbyIsIl9jYXB0aW9uIiwicG9wdXBBZGRGb3JtIiwicG9wdXBFZGl0Rm9ybSIsImNhcmRMaXN0IiwicmVuZGVyZXIiLCJfcmVuZGVyZWRJdGVtcyIsIl9yZW5kZXJlciIsIl9jb250YWluZXIiLCJlbGVtZW50IiwicHJlcGVuZCIsInJlbmRlckl0ZW1zIiwiZm9ybVZhbGlkYXRvcnMiLCJBcnJheSIsImZyb20iLCJmb3JtRWxlbWVudCIsInZhbGlkYXRvciIsIl9pbnB1dFNlbGVjdG9yIiwiX3N1Ym1pdEJ1dHRvblNlbGVjdG9yIiwiX2luYWN0aXZlQnV0dG9uQ2xhc3MiLCJfaW5wdXRFcnJvckNsYXNzIiwiX2Vycm9yQ2xhc3MiLCJfZm9ybUVsZW1lbnQiLCJfYnV0dG9uRWwiLCJpbnB1dEVsIiwiX2NoZWNrVmFsaWRpdHkiLCJfdG9nZ2xlU3VibWl0QnRuIiwiX2Rpc2FibGVTdWJtaXRCdG4iLCJzZXRUaW1lb3V0IiwidmFsaWRpdHkiLCJ2YWxpZCIsIl9oaWRlSW5wdXRFcnJvciIsIl9zaG93SW5wdXRFcnJvciIsImVycm9yTWVzc2FnZSIsImlkIiwidmFsaWRhdGlvbk1lc3NhZ2UiLCJfaGFzSW52YWxpZElucHV0IiwiX2VuYWJsZVN1Ym1pdEJ0biIsImV2ZXJ5IiwiZGlzYWJsZWQiLCJlbmFibGVWYWxpZGF0aW9uIiwicHJldmVudERlZmF1bHQiLCJmb3JtTmFtZSIsImdldEF0dHJpYnV0ZSJdLCJzb3VyY2VSb290IjoiIn0=