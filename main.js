!function(){"use strict";class e{constructor(e,t,s,r){this._name=e.name,this._link=e.link,this._cardSelector=t,this._handeImageClick=s,this._handleDeleteClick=r}_getTemplate(){return document.querySelector(this._cardSelector).content.querySelector(".card").cloneNode(!0)}_setEventListeners(){this._likeBtn=this._card.querySelector("#card_like-button"),this._deleteBtn=this._card.querySelector(".card__delete-btn"),this._image=this._card.querySelector(".card__image"),this._likeBtn.addEventListener("click",(()=>this._toggleLikeBtn())),this._deleteBtn.addEventListener("click",(()=>{this._removeCard(),this._handleDeleteClick()})),this._image.addEventListener("click",(()=>this._openImage()))}_openImage(){this._handeImageClick(this._link,this._name)}_toggleLikeBtn(){this._likeBtn.classList.toggle("card__like-button_enabled")}_removeCard(){this._card.remove(),this._card=null}getView(){return this._card=this._getTemplate(),this._setEventListeners(),this._image.src=this._link,this._image.alt=this._name,this._card.querySelector(".card__title").textContent=this._name,this._card}}const t={formSelector:".modal__form",inputSelector:".modal__input",submitButtonSelector:".modal__save-button",inactiveButtonClass:"modal__save-button-disabled",inputErrorClass:".modal__input-type-error",errorClass:"modal__error_visible",cardSectionClass:".cards__list",cardTeplate:".card__teplate"};class s{constructor(e,t){let{data:s,renderer:r}=e;this._renderedItems=s,this._renderer=r,this._container=document.querySelector(t)}addItem(e){this._container.prepend(e)}renderItems(){this._renderedItems.forEach((e=>{this._renderer(e)}))}}class r{constructor(e){let{popupSelector:t}=e;this._popupElement=document.querySelector(t)}open(){this._popupElement.classList.add("modal_opened"),document.addEventListener("keydown",this._closeByEsc)}close(){this._popupElement.classList.remove("modal_opened"),document.removeEventListener("keydown",this._closeByEsc)}_closeByEsc=e=>{"Escape"===e.key&&this.close()};setEventListeners(){this._popupElement.addEventListener("mousedown",(e=>{e.target.classList.contains("modal")&&this.close(),e.target.classList.contains("modal__close-button")&&this.close()}))}}class n extends r{constructor(e,s){super({popupSelector:e}),this._popupFormEl=this._popupElement.querySelector(t.formSelector),this._inputEls=this._popupFormEl.querySelectorAll(t.inputSelector),this._handleSubmit=s}setInputValues(e){this._inputEls.forEach((t=>{t.value=e[t.name]}))}close(){super.close(),this._popupFormEl.reset()}_getInputValues(){const e={};return this._inputEls.forEach((t=>{e[t.name]=t.value})),e}setEventListeners(){super.setEventListeners(),this._popupFormEl.addEventListener("submit",(()=>{this._handleSubmit(this._getInputValues())}))}}class i{constructor(e){let{title:t,subtitle:s}=e;this._nameEl=document.querySelector(t),this._jobEl=document.querySelector(s)}getUserInfo(){return{name:this._nameEl.textContent,about:this._jobEl.textContent}}setUserInfo(e){this._nameEl.textContent=e.name,this._jobEl.textContent=e.about}}const o=document.querySelector("#profile__add-button"),l=document.querySelector("#profile__edit-btn");let a,c;function _(t){const s=function(t){return new e(t,"#card__template",d,u).getView()}(t);a.addItem(s)}function d(e,t){E.open(e,t)}function u(){p.open()}const h=new class{constructor(e){this._baseUrl=e.baseUrl,this._headers=e.headers}_checkResponse(e){return e.ok?(console.log("its working"),e.json()):Promise.reject(`Error: ${e.status}`)}getInitialCards(){return fetch(`${this._baseUrl}/cards`,{headers:this._headers}).then(this._checkResponse)}getUserInfo(){return fetch(`${this._baseUrl}/users/me`,{headers:this._headers}).then(this._checkResponse)}updateUserInfo(e){fetch(`${this._baseUrl}/users/me`,{method:"PATCH",headers:this._headers,body:JSON.stringify({name:e.name,about:e.about})})}addNewCard(e){fetch(`${this._baseUrl}/cards`,{method:"POST",headers:this._headers,body:JSON.stringify({name:e.name,link:e.link})})}}({baseUrl:"https://around.nomoreparties.co/v1/group-12",headers:{authorization:"cd8b3986-f3d6-4da9-8f48-96bc48ae4bb7","Content-Type":"application/json"}});h.getUserInfo().then((e=>{c=new i({title:".profile__title",subtitle:".profile__subtitle"}),c.setUserInfo(e)})),h.getInitialCards().then((e=>{a=new s({data:e,renderer:e=>{_(e)}},t.cardSectionClass),a.renderItems()}));const m=new n("#profile__edit-modal",(e=>{c.setUserInfo(e),h.updateUserInfo(e),m.close()})),p=new class extends r{constructor(e){super({popupSelector:e}),this._submitBtn=this._popupElement.querySelector(".modal__save-button")}setEventListeners(){super.setEventListeners(),this._submitBtn.addEventListener("submit",(()=>{console.log("button is working")}))}}("#card__delete-modal"),E=new class extends r{constructor(e){super({popupSelector:e}),this._image=this._popupElement.querySelector(".modal__image"),this._caption=this._popupElement.querySelector(".modal__image-caption")}open(e,t){super.open(),this._image.src=e,this._image.alt=t,this._caption.textContent=t}}("#card__image-modal"),b=new n("#profile__add-modal",(e=>{h.addNewCard(e),_(e),b.close()})),v={};(e=>{Array.from(document.querySelectorAll(e.formSelector)).forEach((t=>{const s=new class{constructor(e,t){this._inputSelector=e.inputSelector,this._submitButtonSelector=e.submitButtonSelector,this._inactiveButtonClass=e.inactiveButtonClass,this._inputErrorClass=e.inputErrorClass,this._errorClass=e.errorClass,this._formElement=t,this._buttonEl=this._formElement.querySelector(this._submitButtonSelector),this._inputEls=[...this._formElement.querySelectorAll(this._inputSelector)]}_setEventListeners(){this._inputEls.forEach((e=>{e.addEventListener("input",(()=>{this._checkValidity(e),this._toggleSubmitBtn(e)})),this._disableSubmitBtn(),this._formElement.addEventListener("reset",(()=>{setTimeout((()=>{this._toggleSubmitBtn(e)}),0)}))}))}_checkValidity(e){e.validity.valid?this._hideInputError(e):this._showInputError(e)}_showInputError(e){const t=this._formElement.querySelector(`#${e.id}-error`);e.classList.add(this._inputErrorClass),t.textContent=e.validationMessage,t.classList.add(this._errorClass)}_hideInputError(e){const t=this._formElement.querySelector(`#${e.id}-error`);e.classList.remove(this._inputErrorClass),t.textContent="",t.classList.remove(this._errorClass)}_toggleSubmitBtn(){this._hasInvalidInput()?this._disableSubmitBtn():this._enableSubmitBtn()}_hasInvalidInput(){return!this._inputEls.every((e=>e.validity.valid))}_disableSubmitBtn(){this._buttonEl.classList.add(this._inactiveButtonClass),this._buttonEl.disabled=!0}_enableSubmitBtn(){this._buttonEl.classList.remove(this._inactiveButtonClass),this._buttonEl.disabled=!1}enableValidation(){this._formElement.addEventListener("submit",(e=>{e.preventDefault()})),this._setEventListeners()}}(e,t),r=t.getAttribute("name");v[r]=s,s.enableValidation()}))})(t),E.setEventListeners(),b.setEventListeners(),m.setEventListeners(),p.setEventListeners(),o.addEventListener("click",(()=>b.open())),l.addEventListener("click",(()=>{m.open(),m.setInputValues(c.getUserInfo())}))}();
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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YTNILGNBQ3BDLElBQUc2SCxFQUFRVSxZQUVkVixFQUFRakgsVUFBVUUsT0FBT3hCLEtBQUttSSxrQkFDOUJhLEVBQWFwSCxZQUFjLEdBQzNCb0gsRUFBYTFILFVBQVVFLE9BQU94QixLQUFLb0ksWUFDckMsQ0FFQUssbUJBQ016SSxLQUFLbUosbUJBQ1BuSixLQUFLMEksb0JBRUwxSSxLQUFLb0osa0JBRVQsQ0FFQUQsbUJBQ0UsT0FBUW5KLEtBQUtvRSxVQUFVaUYsT0FBT2QsR0FBWUEsRUFBUUssU0FBU0MsT0FDN0QsQ0FFQUgsb0JBQ0UxSSxLQUFLc0ksVUFBVWhILFVBQVVpQyxJQUFJdkQsS0FBS2tJLHNCQUNsQ2xJLEtBQUtzSSxVQUFVZ0IsVUFBVyxDQUM1QixDQUVBRixtQkFDRXBKLEtBQUtzSSxVQUFVaEgsVUFBVUUsT0FBT3hCLEtBQUtrSSxzQkFDckNsSSxLQUFLc0ksVUFBVWdCLFVBQVcsQ0FDNUIsQ0FFQUMsbUJBQ0V2SixLQUFLcUksYUFBYW5ILGlCQUFpQixVQUFXeUMsSUFDNUNBLEVBQUk2RixnQkFBZ0IsSUFFdEJ4SixLQUFLYSxvQkFDUCxHSjRCc0NnQixFQUFRaUcsR0FFdEMyQixFQUFXM0IsRUFBWTRCLGFBQWEsUUFHMUMvQixFQUFlOEIsR0FBWTFCLEVBQzNCQSxFQUFVd0Isa0JBQWtCLEdBQzVCLEVBR0pBLENBQWlCMUgsR0FFakIrRCxFQUFXL0Isb0JBQ1g2RCxFQUFhN0Qsb0JBQ2IwRCxFQUFjMUQsb0JBQ2RnQyxFQUFZaEMsb0JBQ1p3QixFQUFjbkUsaUJBQWlCLFNBQVMsSUFBTXdHLEVBQWFwRSxTQUMzRGdDLEVBQWVwRSxpQkFBaUIsU0FBUyxLQUN2Q3FHLEVBQWNqRSxPQUNkaUUsRUFBY2hELGVBQWVpQixFQUFTTixjQUFjLEciLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9wcmFjdGljdW0vLi9zcmMvY29tcG9uZW50cy9DYXJkLmpzIiwid2VicGFjazovL3ByYWN0aWN1bS8uL3NyYy91dGlscy9jb25zdGFudHMuanMiLCJ3ZWJwYWNrOi8vcHJhY3RpY3VtLy4vc3JjL2NvbXBvbmVudHMvU2VjdGlvbi5qcyIsIndlYnBhY2s6Ly9wcmFjdGljdW0vLi9zcmMvY29tcG9uZW50cy9Qb3B1cC5qcyIsIndlYnBhY2s6Ly9wcmFjdGljdW0vLi9zcmMvY29tcG9uZW50cy9Qb3B1cFdpdGhGb3JtLmpzIiwid2VicGFjazovL3ByYWN0aWN1bS8uL3NyYy9jb21wb25lbnRzL1VzZXJJbmZvLmpzIiwid2VicGFjazovL3ByYWN0aWN1bS8uL3NyYy9wYWdlL2luZGV4LmpzIiwid2VicGFjazovL3ByYWN0aWN1bS8uL3NyYy9jb21wb25lbnRzL0FwaS5qcyIsIndlYnBhY2s6Ly9wcmFjdGljdW0vLi9zcmMvY29tcG9uZW50cy9Qb3B1cERlbGV0ZS5qcyIsIndlYnBhY2s6Ly9wcmFjdGljdW0vLi9zcmMvY29tcG9uZW50cy9Qb3B1cFdpdGhJbWFnZS5qcyIsIndlYnBhY2s6Ly9wcmFjdGljdW0vLi9zcmMvY29tcG9uZW50cy9Gb3JtVmFsaWRhdG9yLmpzIl0sInNvdXJjZXNDb250ZW50IjpbImV4cG9ydCBkZWZhdWx0IGNsYXNzIENhcmQge1xyXG4gIGNvbnN0cnVjdG9yKGRhdGEsIGNhcmRTZWxlY3RvciwgaGFuZGxlSW1hZ2VDbGljaywgaGFuZGxlRGVsZXRlQ2xpY2spIHtcclxuICAgIHRoaXMuX25hbWUgPSBkYXRhLm5hbWU7XHJcbiAgICB0aGlzLl9saW5rID0gZGF0YS5saW5rO1xyXG4gICAgdGhpcy5fY2FyZFNlbGVjdG9yID0gY2FyZFNlbGVjdG9yO1xyXG4gICAgdGhpcy5faGFuZGVJbWFnZUNsaWNrID0gaGFuZGxlSW1hZ2VDbGljaztcclxuICAgIHRoaXMuX2hhbmRsZURlbGV0ZUNsaWNrID0gaGFuZGxlRGVsZXRlQ2xpY2s7XHJcbiAgfVxyXG5cclxuICBfZ2V0VGVtcGxhdGUoKSB7XHJcbiAgICBjb25zdCBjYXJkRWwgPSBkb2N1bWVudFxyXG4gICAgICAucXVlcnlTZWxlY3Rvcih0aGlzLl9jYXJkU2VsZWN0b3IpXHJcbiAgICAgIC5jb250ZW50LnF1ZXJ5U2VsZWN0b3IoXCIuY2FyZFwiKVxyXG4gICAgICAuY2xvbmVOb2RlKHRydWUpO1xyXG4gICAgcmV0dXJuIGNhcmRFbDtcclxuICB9XHJcblxyXG4gIF9zZXRFdmVudExpc3RlbmVycygpIHtcclxuICAgIHRoaXMuX2xpa2VCdG4gPSB0aGlzLl9jYXJkLnF1ZXJ5U2VsZWN0b3IoXCIjY2FyZF9saWtlLWJ1dHRvblwiKTtcclxuICAgIHRoaXMuX2RlbGV0ZUJ0biA9IHRoaXMuX2NhcmQucXVlcnlTZWxlY3RvcihcIi5jYXJkX19kZWxldGUtYnRuXCIpO1xyXG4gICAgdGhpcy5faW1hZ2UgPSB0aGlzLl9jYXJkLnF1ZXJ5U2VsZWN0b3IoXCIuY2FyZF9faW1hZ2VcIik7XHJcbiAgICB0aGlzLl9saWtlQnRuLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCAoKSA9PiB0aGlzLl90b2dnbGVMaWtlQnRuKCkpO1xyXG4gICAgdGhpcy5fZGVsZXRlQnRuLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCAoKSA9PiB7dGhpcy5fcmVtb3ZlQ2FyZCgpOyB0aGlzLl9oYW5kbGVEZWxldGVDbGljaygpfSk7XHJcbiAgICB0aGlzLl9pbWFnZS5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgKCkgPT4gdGhpcy5fb3BlbkltYWdlKCkpO1xyXG4gIH1cclxuXHJcbiAgX29wZW5JbWFnZSgpIHtcclxuICAgIHRoaXMuX2hhbmRlSW1hZ2VDbGljayh0aGlzLl9saW5rLCB0aGlzLl9uYW1lKTtcclxuICB9XHJcblxyXG4gIF90b2dnbGVMaWtlQnRuKCkge1xyXG4gICAgdGhpcy5fbGlrZUJ0bi5jbGFzc0xpc3QudG9nZ2xlKFwiY2FyZF9fbGlrZS1idXR0b25fZW5hYmxlZFwiKTtcclxuICB9XHJcblxyXG4gIF9yZW1vdmVDYXJkKCkge1xyXG4gICAgdGhpcy5fY2FyZC5yZW1vdmUoKTtcclxuICAgIHRoaXMuX2NhcmQgPSBudWxsO1xyXG4gIH1cclxuXHJcbiAgZ2V0VmlldygpIHtcclxuICAgIHRoaXMuX2NhcmQgPSB0aGlzLl9nZXRUZW1wbGF0ZSgpO1xyXG4gICAgdGhpcy5fc2V0RXZlbnRMaXN0ZW5lcnMoKTtcclxuICAgIHRoaXMuX2ltYWdlLnNyYyA9IHRoaXMuX2xpbms7XHJcbiAgICB0aGlzLl9pbWFnZS5hbHQgPSB0aGlzLl9uYW1lO1xyXG4gICAgdGhpcy5fY2FyZC5xdWVyeVNlbGVjdG9yKFwiLmNhcmRfX3RpdGxlXCIpLnRleHRDb250ZW50ID0gdGhpcy5fbmFtZTtcclxuXHJcbiAgICByZXR1cm4gdGhpcy5fY2FyZDtcclxuICB9XHJcbn1cclxuIiwiLy9zZWxlY3RvcnMgZm9yIHZhbGlkYXRpb25cclxuXHJcbmNvbnN0IGNvbmZpZyA9IHtcclxuICBmb3JtU2VsZWN0b3I6IFwiLm1vZGFsX19mb3JtXCIsXHJcbiAgaW5wdXRTZWxlY3RvcjogXCIubW9kYWxfX2lucHV0XCIsXHJcbiAgc3VibWl0QnV0dG9uU2VsZWN0b3I6IFwiLm1vZGFsX19zYXZlLWJ1dHRvblwiLFxyXG4gIGluYWN0aXZlQnV0dG9uQ2xhc3M6IFwibW9kYWxfX3NhdmUtYnV0dG9uLWRpc2FibGVkXCIsXHJcbiAgaW5wdXRFcnJvckNsYXNzOiBcIi5tb2RhbF9faW5wdXQtdHlwZS1lcnJvclwiLFxyXG4gIGVycm9yQ2xhc3M6IFwibW9kYWxfX2Vycm9yX3Zpc2libGVcIixcclxuICBjYXJkU2VjdGlvbkNsYXNzOiBcIi5jYXJkc19fbGlzdFwiLFxyXG4gIGNhcmRUZXBsYXRlOiBcIi5jYXJkX190ZXBsYXRlXCIsXHJcbn07XHJcblxyXG5jb25zdCBpbml0aWFsQ2FyZHMgPSBbXHJcbiAge1xyXG4gICAgbmFtZTogXCJZb3NlbWl0ZSBWYWxsZXlcIixcclxuICAgIGxpbms6IFwiaHR0cHM6Ly9jb2RlLnMzLnlhbmRleC5uZXQvd2ViLWNvZGUveW9zZW1pdGUuanBnXCIsXHJcbiAgfSxcclxuICB7XHJcbiAgICBuYW1lOiBcIkxha2UgTG91aXNlXCIsXHJcbiAgICBsaW5rOiBcImh0dHBzOi8vY29kZS5zMy55YW5kZXgubmV0L3dlYi1jb2RlL2xha2UtbG91aXNlLmpwZ1wiLFxyXG4gIH0sXHJcbiAge1xyXG4gICAgbmFtZTogXCJCYWxkIE1vdW50YWluc1wiLFxyXG4gICAgbGluazogXCJodHRwczovL2NvZGUuczMueWFuZGV4Lm5ldC93ZWItY29kZS9iYWxkLW1vdW50YWlucy5qcGdcIixcclxuICB9LFxyXG4gIHtcclxuICAgIG5hbWU6IFwiTGF0ZW1hclwiLFxyXG4gICAgbGluazogXCJodHRwczovL2NvZGUuczMueWFuZGV4Lm5ldC93ZWItY29kZS9sYXRlbWFyLmpwZ1wiLFxyXG4gIH0sXHJcbiAge1xyXG4gICAgbmFtZTogXCJWYW5vaXNlIE5hdGlvbmFsIFBhcmtcIixcclxuICAgIGxpbms6IFwiaHR0cHM6Ly9jb2RlLnMzLnlhbmRleC5uZXQvd2ViLWNvZGUvdmFub2lzZS5qcGdcIixcclxuICB9LFxyXG4gIHtcclxuICAgIG5hbWU6IFwiTGFnbyBkaSBCcmFpZXNcIixcclxuICAgIGxpbms6IFwiaHR0cHM6Ly9jb2RlLnMzLnlhbmRleC5uZXQvd2ViLWNvZGUvbGFnby5qcGdcIixcclxuICB9LFxyXG5dO1xyXG5cclxuZXhwb3J0IHsgY29uZmlnLCBpbml0aWFsQ2FyZHMgfTtcclxuIiwiZXhwb3J0IGRlZmF1bHQgY2xhc3MgU2VjdGlvbiB7XHJcbiAgY29uc3RydWN0b3IoeyBkYXRhLCByZW5kZXJlciB9LCBjYXJkTGlzdCkge1xyXG4gICAgdGhpcy5fcmVuZGVyZWRJdGVtcyA9IGRhdGE7XHJcbiAgICB0aGlzLl9yZW5kZXJlciA9IHJlbmRlcmVyO1xyXG4gICAgdGhpcy5fY29udGFpbmVyID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihjYXJkTGlzdCk7XHJcbiAgfVxyXG5cclxuICBhZGRJdGVtKGVsZW1lbnQpIHtcclxuICAgIHRoaXMuX2NvbnRhaW5lci5wcmVwZW5kKGVsZW1lbnQpO1xyXG4gIH1cclxuXHJcbiAgcmVuZGVySXRlbXMoKSB7XHJcbiAgICB0aGlzLl9yZW5kZXJlZEl0ZW1zLmZvckVhY2goKGl0ZW0pID0+IHtcclxuICAgICAgdGhpcy5fcmVuZGVyZXIoaXRlbSk7XHJcbiAgICB9KTtcclxuICB9XHJcbn1cclxuIiwiZXhwb3J0IGRlZmF1bHQgY2xhc3MgUG9wdXAge1xyXG4gIGNvbnN0cnVjdG9yKHsgcG9wdXBTZWxlY3RvciB9KSB7XHJcbiAgICB0aGlzLl9wb3B1cEVsZW1lbnQgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKHBvcHVwU2VsZWN0b3IpO1xyXG4gIH1cclxuICBvcGVuKCkge1xyXG4gICAgLy9vcGVuIHBvcHVwXHJcbiAgICB0aGlzLl9wb3B1cEVsZW1lbnQuY2xhc3NMaXN0LmFkZChcIm1vZGFsX29wZW5lZFwiKTtcclxuICAgIGRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoXCJrZXlkb3duXCIsIHRoaXMuX2Nsb3NlQnlFc2MpO1xyXG4gIH1cclxuICBjbG9zZSgpIHtcclxuICAgIC8vY2xvc2UgcG9wdXBcclxuICAgIHRoaXMuX3BvcHVwRWxlbWVudC5jbGFzc0xpc3QucmVtb3ZlKFwibW9kYWxfb3BlbmVkXCIpO1xyXG4gICAgZG9jdW1lbnQucmVtb3ZlRXZlbnRMaXN0ZW5lcihcImtleWRvd25cIiwgdGhpcy5fY2xvc2VCeUVzYyk7XHJcbiAgfVxyXG4gIF9jbG9zZUJ5RXNjID0gKGV2dCkgPT4ge1xyXG4gICAgaWYgKGV2dC5rZXkgPT09IFwiRXNjYXBlXCIpIHtcclxuICAgICAgdGhpcy5jbG9zZSgpO1xyXG4gICAgfVxyXG4gIH07XHJcblxyXG4gIHNldEV2ZW50TGlzdGVuZXJzKCkge1xyXG4gICAgdGhpcy5fcG9wdXBFbGVtZW50LmFkZEV2ZW50TGlzdGVuZXIoXCJtb3VzZWRvd25cIiwgKGV2dCkgPT4ge1xyXG4gICAgICBpZiAoZXZ0LnRhcmdldC5jbGFzc0xpc3QuY29udGFpbnMoXCJtb2RhbFwiKSkge1xyXG4gICAgICAgIHRoaXMuY2xvc2UoKTtcclxuICAgICAgfVxyXG4gICAgICBpZiAoZXZ0LnRhcmdldC5jbGFzc0xpc3QuY29udGFpbnMoXCJtb2RhbF9fY2xvc2UtYnV0dG9uXCIpKSB7XHJcbiAgICAgICAgdGhpcy5jbG9zZSgpO1xyXG4gICAgICB9XHJcbiAgICB9KTtcclxuICB9XHJcbn1cclxuIiwiaW1wb3J0IFBvcHVwIGZyb20gXCIuL1BvcHVwXCI7XHJcbmltcG9ydCB7IGNvbmZpZyB9IGZyb20gXCIuLi91dGlscy9jb25zdGFudHMuanNcIjtcclxuXHJcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFBvcHVwV2l0aEZvcm0gZXh0ZW5kcyBQb3B1cCB7XHJcbiAgY29uc3RydWN0b3IocG9wdXBTZWxlY3RvciwgaGFuZGxlU3VibWl0KSB7XHJcbiAgICBzdXBlcih7IHBvcHVwU2VsZWN0b3IgfSk7ICAgIFxyXG4gICAgdGhpcy5fcG9wdXBGb3JtRWwgPSB0aGlzLl9wb3B1cEVsZW1lbnQucXVlcnlTZWxlY3Rvcihjb25maWcuZm9ybVNlbGVjdG9yKTtcclxuICAgIHRoaXMuX2lucHV0RWxzID0gdGhpcy5fcG9wdXBGb3JtRWwucXVlcnlTZWxlY3RvckFsbChjb25maWcuaW5wdXRTZWxlY3Rvcik7XHJcbiAgICB0aGlzLl9oYW5kbGVTdWJtaXQgPSBoYW5kbGVTdWJtaXQ7ICAgIFxyXG4gIH1cclxuICBzZXRJbnB1dFZhbHVlcyhkYXRhKSB7XHJcbiAgICB0aGlzLl9pbnB1dEVscy5mb3JFYWNoKChpbnB1dCkgPT4ge1xyXG4gICAgICAvLyBoZXJlIHlvdSBpbnNlcnQgdGhlIGB2YWx1ZWAgYnkgdGhlIGBuYW1lYCBvZiB0aGUgaW5wdXRcclxuICAgICAgaW5wdXQudmFsdWUgPSBkYXRhW2lucHV0Lm5hbWVdO1xyXG4gICAgfSk7XHJcbiAgfVxyXG5cclxuICBjbG9zZSgpIHtcclxuICAgIHN1cGVyLmNsb3NlKCk7XHJcbiAgICB0aGlzLl9wb3B1cEZvcm1FbC5yZXNldCgpO1xyXG4gIH0gIFxyXG5cclxuICBfZ2V0SW5wdXRWYWx1ZXMoKSB7XHJcbiAgICBjb25zdCBpbnB1dFZhbHVlcyA9IHt9O1xyXG4gICAgLy9nZXQgYWxsIGlucHV0cyAgICBcclxuICAgIC8vbG9vcCBvdmVyIGFsbCBpbnB1dHNcclxuICAgIHRoaXMuX2lucHV0RWxzLmZvckVhY2goKGlucHV0KSA9PiB7XHJcbiAgICAgIC8vYXNzaWduIGlucHV0cyB0byBlbXB0eSBvYmplY3QgYnkgbmFtZT12YWx1ZVxyXG4gICAgICBpbnB1dFZhbHVlc1tpbnB1dC5uYW1lXSA9IGlucHV0LnZhbHVlO1xyXG4gICAgfSk7XHJcbiAgICByZXR1cm4gaW5wdXRWYWx1ZXM7XHJcbiAgfVxyXG5cclxuICBzZXRFdmVudExpc3RlbmVycygpIHtcclxuICAgIHN1cGVyLnNldEV2ZW50TGlzdGVuZXJzKCk7XHJcbiAgICB0aGlzLl9wb3B1cEZvcm1FbC5hZGRFdmVudExpc3RlbmVyKFwic3VibWl0XCIsICgpID0+IHtcclxuICAgICAgdGhpcy5faGFuZGxlU3VibWl0KHRoaXMuX2dldElucHV0VmFsdWVzKCkpO1xyXG4gICAgfSk7XHJcbiAgfVxyXG59XHJcbiIsImV4cG9ydCBkZWZhdWx0IGNsYXNzIFVzZXJJbmZvIHtcclxuICBjb25zdHJ1Y3Rvcih7IHRpdGxlLCBzdWJ0aXRsZSB9KSB7XHJcbiAgICB0aGlzLl9uYW1lRWwgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKHRpdGxlKTtcclxuICAgIHRoaXMuX2pvYkVsID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihzdWJ0aXRsZSk7XHJcbiAgfVxyXG4gIFxyXG4gIGdldFVzZXJJbmZvKCkge1xyXG4gICAgcmV0dXJuIHtcclxuICAgICAgbmFtZTogdGhpcy5fbmFtZUVsLnRleHRDb250ZW50LFxyXG4gICAgICBhYm91dDogdGhpcy5fam9iRWwudGV4dENvbnRlbnQsXHJcbiAgICB9O1xyXG4gIH1cclxuICBzZXRVc2VySW5mbyh2YWx1ZSkge1xyXG4gICAgXHJcbiAgICAvL3NldCB1c2VyIGluZm8gZnJvbSB2YWx1ZVxyXG4gICAgdGhpcy5fbmFtZUVsLnRleHRDb250ZW50ID0gdmFsdWUubmFtZTtcclxuICAgIHRoaXMuX2pvYkVsLnRleHRDb250ZW50ID0gdmFsdWUuYWJvdXQ7XHJcbiAgfVxyXG59XHJcbiIsIi8vYnV0IHdoeSB3ZSBjYW5ub3QganVzdCB1c2UgVEFCIGluZGVudGF0aW9uIG9uIGNvZGUgZm9ybWF0dGluZz8gd2h5IGl0IHNob3VsZCBiZSBkb3VibGUgc3BhY2U/XHJcbmltcG9ydCBGb3JtVmFsaWRhdG9yIGZyb20gXCIuLi9jb21wb25lbnRzL0Zvcm1WYWxpZGF0b3IuanNcIjtcclxuaW1wb3J0IENhcmQgZnJvbSBcIi4uL2NvbXBvbmVudHMvQ2FyZC5qc1wiO1xyXG5pbXBvcnQgeyBjb25maWcgfSBmcm9tIFwiLi4vdXRpbHMvY29uc3RhbnRzLmpzXCI7XHJcbmltcG9ydCBTZWN0aW9uIGZyb20gXCIuLi9jb21wb25lbnRzL1NlY3Rpb24uanNcIjtcclxuaW1wb3J0IFBvcHVwV2l0aEltYWdlIGZyb20gXCIuLi9jb21wb25lbnRzL1BvcHVwV2l0aEltYWdlLmpzXCI7XHJcbmltcG9ydCBQb3B1cFdpdGhGb3JtIGZyb20gXCIuLi9jb21wb25lbnRzL1BvcHVwV2l0aEZvcm0uanNcIjtcclxuaW1wb3J0IFVzZXJJbmZvIGZyb20gXCIuLi9jb21wb25lbnRzL1VzZXJJbmZvLmpzXCI7XHJcbmltcG9ydCBBcGkgZnJvbSBcIi4uL2NvbXBvbmVudHMvQXBpLmpzXCI7XHJcbmltcG9ydCBQb3BwdXJEZWxldGUgZnJvbSBcIi4uL2NvbXBvbmVudHMvUG9wdXBEZWxldGUuanNcIjtcclxuaW1wb3J0IFwiLi4vcGFnZS9pbmRleC5jc3NcIjtcclxuXHJcbmNvbnN0IHByb2ZpbGVBZGRCdG4gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiI3Byb2ZpbGVfX2FkZC1idXR0b25cIik7XHJcbmNvbnN0IHByb2ZpbGVFZGl0QnRuID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIiNwcm9maWxlX19lZGl0LWJ0blwiKTtcclxuLy9wbGFjZWhvbGRlciBmb3Igc2VjdGlvblxyXG5sZXQgY2FyZFNlY3Rpb247XHJcbi8vcGxhY2Vob2xkZXIgZm9yIHVzZXJJbmZvXHJcbmxldCB1c2VySW5mbztcclxuXHJcbmZ1bmN0aW9uIGNyZWF0ZUNhcmQoaXRlbSkge1xyXG4gIGNvbnN0IGNhcmRFbGVtZW50ID0gbmV3IENhcmQoXHJcbiAgICBpdGVtLFxyXG4gICAgXCIjY2FyZF9fdGVtcGxhdGVcIixcclxuICAgIGhhbmRsZUltYWdlQ2xpY2ssXHJcbiAgICBoYW5kbGVEZWxldGVDbGlja1xyXG4gICkuZ2V0VmlldygpO1xyXG4gIHJldHVybiBjYXJkRWxlbWVudDtcclxufVxyXG5cclxuZnVuY3Rpb24gcmVuZGVyQ2FyZChpdGVtKSB7XHJcbiAgY29uc3QgY2FyZCA9IGNyZWF0ZUNhcmQoaXRlbSk7XHJcbiAgY2FyZFNlY3Rpb24uYWRkSXRlbShjYXJkKTtcclxufVxyXG5cclxuZnVuY3Rpb24gaGFuZGxlSW1hZ2VDbGljayhuYW1lLCBsaW5rKSB7XHJcbiAgcG9wdXBJbWFnZS5vcGVuKG5hbWUsIGxpbmspO1xyXG59XHJcblxyXG5mdW5jdGlvbiBoYW5kbGVEZWxldGVDbGljaygpe1xyXG4gIHBvcHVwRGVsZXRlLm9wZW4oKVxyXG59XHJcblxyXG5cclxuXHJcblxyXG5cclxuLy9uZXcgaW5zdCBvZiBBUEkoc2V0IG9wdGlvbnMpXHJcbmNvbnN0IGFwaSA9IG5ldyBBcGkoe1xyXG4gIGJhc2VVcmw6IFwiaHR0cHM6Ly9hcm91bmQubm9tb3JlcGFydGllcy5jby92MS9ncm91cC0xMlwiLFxyXG4gIGhlYWRlcnM6IHtcclxuICAgIGF1dGhvcml6YXRpb246IFwiY2Q4YjM5ODYtZjNkNi00ZGE5LThmNDgtOTZiYzQ4YWU0YmI3XCIsXHJcbiAgICBcIkNvbnRlbnQtVHlwZVwiOiBcImFwcGxpY2F0aW9uL2pzb25cIixcclxuICB9LFxyXG59KTtcclxuXHJcbmFwaS5nZXRVc2VySW5mbygpLnRoZW4oKHJlcykgPT4ge1xyXG4gIC8vbmV3IFVzZXJJbmZvIFxyXG4gIHVzZXJJbmZvID0gbmV3IFVzZXJJbmZvKHtcclxuICAgIHRpdGxlOiBcIi5wcm9maWxlX190aXRsZVwiLFxyXG4gICAgc3VidGl0bGU6IFwiLnByb2ZpbGVfX3N1YnRpdGxlXCIsXHJcbiAgfSk7XHJcbiAgLy9zZXR0aW5nIHVzZXJJbmZvIGZyb20gc2VydmVyXHJcbiAgdXNlckluZm8uc2V0VXNlckluZm8ocmVzKVxyXG59KVxyXG5cclxuLy8gbG9hZGVkIGNhcmRzIGZyb20gc2VydmVyXHJcbmFwaS5nZXRJbml0aWFsQ2FyZHMoKS50aGVuKChyZXMpID0+IHtcclxuICAvL25ldyBzZWN0aW9uXHJcbiAgY2FyZFNlY3Rpb24gPSBuZXcgU2VjdGlvbihcclxuICAgIHtcclxuICAgICAgLy91c2luZyBkYXRhIGZyb20gc2VydmVyXHJcbiAgICAgIGRhdGE6IHJlcyxcclxuICAgICAgcmVuZGVyZXI6IChpdGVtKSA9PiB7XHJcbiAgICAgICAgcmVuZGVyQ2FyZChpdGVtKTtcclxuICAgICAgfSxcclxuICAgIH0sXHJcbiAgICBjb25maWcuY2FyZFNlY3Rpb25DbGFzc1xyXG4gICk7XHJcbiAgY2FyZFNlY3Rpb24ucmVuZGVySXRlbXMoKTtcclxufSk7XHJcblxyXG5cclxuY29uc3QgcG9wdXBFZGl0Rm9ybSA9IG5ldyBQb3B1cFdpdGhGb3JtKFxyXG4gIFwiI3Byb2ZpbGVfX2VkaXQtbW9kYWxcIixcclxuICAoaW5wdXRWYWx1ZXMpID0+IHtcclxuICAgIHVzZXJJbmZvLnNldFVzZXJJbmZvKGlucHV0VmFsdWVzKTtcclxuICAgIC8vdXBkYXRpbmcgdXNlckluZm8gKG9uP2F0P2luKSBzZXJ2ZXJcclxuICAgIGFwaS51cGRhdGVVc2VySW5mbyhpbnB1dFZhbHVlcylcclxuICAgIHBvcHVwRWRpdEZvcm0uY2xvc2UoKTtcclxuICB9XHJcbik7XHJcblxyXG5cclxuXHJcbmNvbnN0IHBvcHVwRGVsZXRlID0gbmV3IFBvcHB1ckRlbGV0ZShcIiNjYXJkX19kZWxldGUtbW9kYWxcIik7XHJcblxyXG5jb25zdCBwb3B1cEltYWdlID0gbmV3IFBvcHVwV2l0aEltYWdlKFwiI2NhcmRfX2ltYWdlLW1vZGFsXCIpO1xyXG5cclxuY29uc3QgcG9wdXBBZGRGb3JtID0gbmV3IFBvcHVwV2l0aEZvcm0oXCIjcHJvZmlsZV9fYWRkLW1vZGFsXCIsIChpbnB1dFZhbHVlcykgPT4ge1xyXG4gIGFwaS5hZGROZXdDYXJkKGlucHV0VmFsdWVzKVxyXG4gIHJlbmRlckNhcmQoaW5wdXRWYWx1ZXMpO1xyXG4gIHBvcHVwQWRkRm9ybS5jbG9zZSgpO1xyXG59KTtcclxuXHJcblxyXG5cclxuXHJcblxyXG5cclxuY29uc3QgZm9ybVZhbGlkYXRvcnMgPSB7fTtcclxuXHJcbi8vIGVuYWJsZSB2YWxpZGF0aW9uXHJcbmNvbnN0IGVuYWJsZVZhbGlkYXRpb24gPSAoY29uZmlnKSA9PiB7XHJcbiAgY29uc3QgZm9ybUxpc3QgPSBBcnJheS5mcm9tKGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoY29uZmlnLmZvcm1TZWxlY3RvcikpO1xyXG4gIGZvcm1MaXN0LmZvckVhY2goKGZvcm1FbGVtZW50KSA9PiB7XHJcbiAgICBjb25zdCB2YWxpZGF0b3IgPSBuZXcgRm9ybVZhbGlkYXRvcihjb25maWcsIGZvcm1FbGVtZW50KTtcclxuICAgIC8vIGhlcmUgeW91IGdldCB0aGUgbmFtZSBvZiB0aGUgZm9ybVxyXG4gICAgY29uc3QgZm9ybU5hbWUgPSBmb3JtRWxlbWVudC5nZXRBdHRyaWJ1dGUoXCJuYW1lXCIpO1xyXG5cclxuICAgIC8vIGhlcmUgeW91IHN0b3JlIGEgdmFsaWRhdG9yIGJ5IHRoZSBgbmFtZWAgb2YgdGhlIGZvcm1cclxuICAgIGZvcm1WYWxpZGF0b3JzW2Zvcm1OYW1lXSA9IHZhbGlkYXRvcjtcclxuICAgIHZhbGlkYXRvci5lbmFibGVWYWxpZGF0aW9uKCk7XHJcbiAgfSk7XHJcbn07XHJcblxyXG5lbmFibGVWYWxpZGF0aW9uKGNvbmZpZyk7XHJcblxyXG5wb3B1cEltYWdlLnNldEV2ZW50TGlzdGVuZXJzKCk7XHJcbnBvcHVwQWRkRm9ybS5zZXRFdmVudExpc3RlbmVycygpO1xyXG5wb3B1cEVkaXRGb3JtLnNldEV2ZW50TGlzdGVuZXJzKCk7XHJcbnBvcHVwRGVsZXRlLnNldEV2ZW50TGlzdGVuZXJzKCk7XHJcbnByb2ZpbGVBZGRCdG4uYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsICgpID0+IHBvcHVwQWRkRm9ybS5vcGVuKCkpO1xyXG5wcm9maWxlRWRpdEJ0bi5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgKCkgPT4ge1xyXG4gIHBvcHVwRWRpdEZvcm0ub3BlbigpO1xyXG4gIHBvcHVwRWRpdEZvcm0uc2V0SW5wdXRWYWx1ZXModXNlckluZm8uZ2V0VXNlckluZm8oKSk7XHJcbn0pO1xyXG4iLCJleHBvcnQgZGVmYXVsdCBjbGFzcyBBcGkge1xyXG4gICAgY29uc3RydWN0b3Iob3B0aW9ucyl7XHJcbiAgICAgICAgdGhpcy5fYmFzZVVybCA9IG9wdGlvbnMuYmFzZVVybDtcclxuICAgICAgICB0aGlzLl9oZWFkZXJzID0gb3B0aW9ucy5oZWFkZXJzO1xyXG5cclxuICAgIH1cclxuXHJcbiAgICBfY2hlY2tSZXNwb25zZShyZXMpIHtcclxuICAgICAgICBpZiAocmVzLm9rKSB7XHJcbiAgICAgICAgICBjb25zb2xlLmxvZyhcIml0cyB3b3JraW5nXCIpXHJcbiAgICAgICAgICByZXR1cm4gcmVzLmpzb24oKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIFByb21pc2UucmVqZWN0KGBFcnJvcjogJHtyZXMuc3RhdHVzfWApO1xyXG4gICAgfVxyXG4gICAgXHJcblxyXG4gICAgZ2V0SW5pdGlhbENhcmRzKCl7XHJcbiAgICAgIHJldHVybiBmZXRjaChgJHt0aGlzLl9iYXNlVXJsfS9jYXJkc2Ase1xyXG4gICAgICAgIGhlYWRlcnM6IHRoaXMuX2hlYWRlcnNcclxuICAgICAgfSlcclxuICAgICAgLnRoZW4odGhpcy5fY2hlY2tSZXNwb25zZSkgXHJcbiAgICB9XHJcblxyXG4gICAgZ2V0VXNlckluZm8oKXtcclxuICAgICAgcmV0dXJuIGZldGNoKGAke3RoaXMuX2Jhc2VVcmx9L3VzZXJzL21lYCx7XHJcbiAgICAgICAgaGVhZGVyczogdGhpcy5faGVhZGVyc1xyXG4gICAgICB9KVxyXG4gICAgICAudGhlbih0aGlzLl9jaGVja1Jlc3BvbnNlKVxyXG4gICAgfVxyXG5cclxuXHJcbiAgICB1cGRhdGVVc2VySW5mbyhpbnB1dCl7XHJcbiAgICAgIGZldGNoKGAke3RoaXMuX2Jhc2VVcmx9L3VzZXJzL21lYCwge1xyXG4gICAgICAgIG1ldGhvZDogXCJQQVRDSFwiLFxyXG4gICAgICAgIGhlYWRlcnM6IHRoaXMuX2hlYWRlcnMsXHJcbiAgICAgICAgYm9keTogSlNPTi5zdHJpbmdpZnkoe1xyXG4gICAgICAgICAgbmFtZTogaW5wdXQubmFtZSAsXHJcbiAgICAgICAgICBhYm91dDogaW5wdXQuYWJvdXRcclxuICAgICAgICB9KVxyXG4gICAgICB9KTtcclxuICAgIH1cclxuXHJcbiAgICBhZGROZXdDYXJkKGlucHV0KXtcclxuICAgICAgZmV0Y2goYCR7dGhpcy5fYmFzZVVybH0vY2FyZHNgLCB7XHJcbiAgICAgICAgbWV0aG9kOiBcIlBPU1RcIixcclxuICAgICAgICBoZWFkZXJzOiB0aGlzLl9oZWFkZXJzLFxyXG4gICAgICAgIGJvZHk6IEpTT04uc3RyaW5naWZ5KHtcclxuICAgICAgICAgIG5hbWU6IGlucHV0Lm5hbWUsXHJcbiAgICAgICAgICBsaW5rOiBpbnB1dC5saW5rXHJcbiAgICAgICAgfSlcclxuICAgICAgfSlcclxuICAgIH1cclxufVxyXG5cclxuXHJcblxyXG4iLCJpbXBvcnQgUG9wdXAgZnJvbSBcIi4vUG9wdXBcIjtcclxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgUG9wcHVyRGVsZXRlIGV4dGVuZHMgUG9wdXB7XHJcbiAgICBjb25zdHJ1Y3Rvcihwb3B1cFNlbGVjdG9yKXtcclxuICAgICAgICBzdXBlcih7cG9wdXBTZWxlY3Rvcn0pXHJcbiAgICAgICAgdGhpcy5fc3VibWl0QnRuID0gdGhpcy5fcG9wdXBFbGVtZW50LnF1ZXJ5U2VsZWN0b3IoXCIubW9kYWxfX3NhdmUtYnV0dG9uXCIpICAgICBcclxuICAgICAgICBcclxuICAgIH1cclxuXHJcbiAgICBzZXRFdmVudExpc3RlbmVycygpe1xyXG4gICAgICAgIHN1cGVyLnNldEV2ZW50TGlzdGVuZXJzKClcclxuICAgICAgICB0aGlzLl9zdWJtaXRCdG4uYWRkRXZlbnRMaXN0ZW5lcihcInN1Ym1pdFwiLCAoKSA9PiB7XHJcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKCdidXR0b24gaXMgd29ya2luZycpXHJcbiAgICAgICAgfSk7XHJcbiAgICB9XHJcblxyXG4gICAgXHJcbn07IiwiaW1wb3J0IFBvcHVwIGZyb20gXCIuL1BvcHVwXCI7XHJcblxyXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBQb3B1cFdpdGhJbWFnZSBleHRlbmRzIFBvcHVwIHtcclxuICBjb25zdHJ1Y3Rvcihwb3B1cFNlbGVjdG9yKSB7XHJcbiAgICBzdXBlcih7IHBvcHVwU2VsZWN0b3IgfSk7XHJcbiAgICB0aGlzLl9pbWFnZSA9IHRoaXMuX3BvcHVwRWxlbWVudC5xdWVyeVNlbGVjdG9yKFwiLm1vZGFsX19pbWFnZVwiKTtcclxuICAgIHRoaXMuX2NhcHRpb24gPSB0aGlzLl9wb3B1cEVsZW1lbnQucXVlcnlTZWxlY3RvcihcIi5tb2RhbF9faW1hZ2UtY2FwdGlvblwiKTtcclxuICB9XHJcbiAgb3BlbihuYW1lLCBsaW5rKSB7XHJcbiAgICBzdXBlci5vcGVuKCk7ICAgIFxyXG4gICAgdGhpcy5faW1hZ2Uuc3JjID0gbmFtZTtcclxuICAgIHRoaXMuX2ltYWdlLmFsdCA9IGxpbms7XHJcbiAgICB0aGlzLl9jYXB0aW9uLnRleHRDb250ZW50ID0gbGluaztcclxuICB9XHJcbn1cclxuIiwiY2xhc3MgRm9ybVZhbGlkYXRvciB7XHJcbiAgY29uc3RydWN0b3IoY29uZmlnLCBmb3JtRWxlbWVudCkge1xyXG4gICAgdGhpcy5faW5wdXRTZWxlY3RvciA9IGNvbmZpZy5pbnB1dFNlbGVjdG9yO1xyXG4gICAgdGhpcy5fc3VibWl0QnV0dG9uU2VsZWN0b3IgPSBjb25maWcuc3VibWl0QnV0dG9uU2VsZWN0b3I7XHJcbiAgICB0aGlzLl9pbmFjdGl2ZUJ1dHRvbkNsYXNzID0gY29uZmlnLmluYWN0aXZlQnV0dG9uQ2xhc3M7XHJcbiAgICB0aGlzLl9pbnB1dEVycm9yQ2xhc3MgPSBjb25maWcuaW5wdXRFcnJvckNsYXNzO1xyXG4gICAgdGhpcy5fZXJyb3JDbGFzcyA9IGNvbmZpZy5lcnJvckNsYXNzO1xyXG4gICAgdGhpcy5fZm9ybUVsZW1lbnQgPSBmb3JtRWxlbWVudDtcclxuICAgIHRoaXMuX2J1dHRvbkVsID0gdGhpcy5fZm9ybUVsZW1lbnQucXVlcnlTZWxlY3RvcihcclxuICAgICAgdGhpcy5fc3VibWl0QnV0dG9uU2VsZWN0b3JcclxuICAgICk7XHJcbiAgICB0aGlzLl9pbnB1dEVscyA9IFtcclxuICAgICAgLi4udGhpcy5fZm9ybUVsZW1lbnQucXVlcnlTZWxlY3RvckFsbCh0aGlzLl9pbnB1dFNlbGVjdG9yKSxcclxuICAgIF07XHJcbiAgfVxyXG5cclxuICBfc2V0RXZlbnRMaXN0ZW5lcnMoKSB7XHJcbiAgICB0aGlzLl9pbnB1dEVscy5mb3JFYWNoKChpbnB1dEVsKSA9PiB7XHJcbiAgICAgIGlucHV0RWwuYWRkRXZlbnRMaXN0ZW5lcihcImlucHV0XCIsICgpID0+IHtcclxuICAgICAgICB0aGlzLl9jaGVja1ZhbGlkaXR5KGlucHV0RWwpO1xyXG4gICAgICAgIHRoaXMuX3RvZ2dsZVN1Ym1pdEJ0bihpbnB1dEVsKTtcclxuICAgICAgfSk7XHJcbiAgICAgIHRoaXMuX2Rpc2FibGVTdWJtaXRCdG4oKTtcclxuICAgICAgLy9yZXNldCBcImV2ZW50XCJcclxuICAgICAgdGhpcy5fZm9ybUVsZW1lbnQuYWRkRXZlbnRMaXN0ZW5lcihcInJlc2V0XCIsICgpID0+IHtcclxuICAgICAgICAvLyBgc2V0VGltZW91dGAgaXMgbmVlZGVkIHRvIHdhaXQgdGlsbCB0aGUgZm9ybSBpcyBmdWxseSByZXNldCBhbmQgdGhlbiB0byBjYWxsIGB0b2dnbGVCdXR0b25TdGF0ZWBcclxuICAgICAgICBzZXRUaW1lb3V0KCgpID0+IHtcclxuICAgICAgICAgIHRoaXMuX3RvZ2dsZVN1Ym1pdEJ0bihpbnB1dEVsKTtcclxuICAgICAgICB9LCAwKTtcclxuICAgICAgfSk7XHJcbiAgICB9KTtcclxuICB9XHJcblxyXG4gIF9jaGVja1ZhbGlkaXR5KGlucHV0RWwpIHtcclxuICAgIC8vdGFraW5nIGlucHV0RWwgZnJvbSBldmVudCBsaXNlbmVyc1xyXG4gICAgaWYgKCFpbnB1dEVsLnZhbGlkaXR5LnZhbGlkKSB7XHJcbiAgICAgIHRoaXMuX3Nob3dJbnB1dEVycm9yKGlucHV0RWwpO1xyXG4gICAgfSBlbHNlIHtcclxuICAgICAgdGhpcy5faGlkZUlucHV0RXJyb3IoaW5wdXRFbCk7XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICBfc2hvd0lucHV0RXJyb3IoaW5wdXRFbCkge1xyXG4gICAgY29uc3QgZXJyb3JNZXNzYWdlID0gdGhpcy5fZm9ybUVsZW1lbnQucXVlcnlTZWxlY3RvcihcclxuICAgICAgYCMke2lucHV0RWwuaWR9LWVycm9yYFxyXG4gICAgKTtcclxuICAgIGlucHV0RWwuY2xhc3NMaXN0LmFkZCh0aGlzLl9pbnB1dEVycm9yQ2xhc3MpO1xyXG4gICAgZXJyb3JNZXNzYWdlLnRleHRDb250ZW50ID0gaW5wdXRFbC52YWxpZGF0aW9uTWVzc2FnZTtcclxuICAgIGVycm9yTWVzc2FnZS5jbGFzc0xpc3QuYWRkKHRoaXMuX2Vycm9yQ2xhc3MpO1xyXG4gIH1cclxuXHJcbiAgX2hpZGVJbnB1dEVycm9yKGlucHV0RWwpIHtcclxuICAgIGNvbnN0IGVycm9yTWVzc2FnZSA9IHRoaXMuX2Zvcm1FbGVtZW50LnF1ZXJ5U2VsZWN0b3IoXHJcbiAgICAgIGAjJHtpbnB1dEVsLmlkfS1lcnJvcmBcclxuICAgICk7XHJcbiAgICBpbnB1dEVsLmNsYXNzTGlzdC5yZW1vdmUodGhpcy5faW5wdXRFcnJvckNsYXNzKTtcclxuICAgIGVycm9yTWVzc2FnZS50ZXh0Q29udGVudCA9IFwiXCI7XHJcbiAgICBlcnJvck1lc3NhZ2UuY2xhc3NMaXN0LnJlbW92ZSh0aGlzLl9lcnJvckNsYXNzKTtcclxuICB9XHJcblxyXG4gIF90b2dnbGVTdWJtaXRCdG4oKSB7XHJcbiAgICBpZiAodGhpcy5faGFzSW52YWxpZElucHV0KCkpIHtcclxuICAgICAgdGhpcy5fZGlzYWJsZVN1Ym1pdEJ0bigpO1xyXG4gICAgfSBlbHNlIHtcclxuICAgICAgdGhpcy5fZW5hYmxlU3VibWl0QnRuKCk7XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICBfaGFzSW52YWxpZElucHV0KCkge1xyXG4gICAgcmV0dXJuICF0aGlzLl9pbnB1dEVscy5ldmVyeSgoaW5wdXRFbCkgPT4gaW5wdXRFbC52YWxpZGl0eS52YWxpZCk7XHJcbiAgfVxyXG5cclxuICBfZGlzYWJsZVN1Ym1pdEJ0bigpIHtcclxuICAgIHRoaXMuX2J1dHRvbkVsLmNsYXNzTGlzdC5hZGQodGhpcy5faW5hY3RpdmVCdXR0b25DbGFzcyk7XHJcbiAgICB0aGlzLl9idXR0b25FbC5kaXNhYmxlZCA9IHRydWU7XHJcbiAgfVxyXG5cclxuICBfZW5hYmxlU3VibWl0QnRuKCkge1xyXG4gICAgdGhpcy5fYnV0dG9uRWwuY2xhc3NMaXN0LnJlbW92ZSh0aGlzLl9pbmFjdGl2ZUJ1dHRvbkNsYXNzKTtcclxuICAgIHRoaXMuX2J1dHRvbkVsLmRpc2FibGVkID0gZmFsc2U7XHJcbiAgfVxyXG5cclxuICBlbmFibGVWYWxpZGF0aW9uKCkge1xyXG4gICAgdGhpcy5fZm9ybUVsZW1lbnQuYWRkRXZlbnRMaXN0ZW5lcihcInN1Ym1pdFwiLCAoZXZ0KSA9PiB7XHJcbiAgICAgIGV2dC5wcmV2ZW50RGVmYXVsdCgpO1xyXG4gICAgfSk7XHJcbiAgICB0aGlzLl9zZXRFdmVudExpc3RlbmVycygpO1xyXG4gIH1cclxufVxyXG5cclxuZXhwb3J0IGRlZmF1bHQgRm9ybVZhbGlkYXRvcjtcclxuIl0sIm5hbWVzIjpbIkNhcmQiLCJjb25zdHJ1Y3RvciIsImRhdGEiLCJjYXJkU2VsZWN0b3IiLCJoYW5kbGVJbWFnZUNsaWNrIiwiaGFuZGxlRGVsZXRlQ2xpY2siLCJ0aGlzIiwiX25hbWUiLCJuYW1lIiwiX2xpbmsiLCJsaW5rIiwiX2NhcmRTZWxlY3RvciIsIl9oYW5kZUltYWdlQ2xpY2siLCJfaGFuZGxlRGVsZXRlQ2xpY2siLCJfZ2V0VGVtcGxhdGUiLCJkb2N1bWVudCIsInF1ZXJ5U2VsZWN0b3IiLCJjb250ZW50IiwiY2xvbmVOb2RlIiwiX3NldEV2ZW50TGlzdGVuZXJzIiwiX2xpa2VCdG4iLCJfY2FyZCIsIl9kZWxldGVCdG4iLCJfaW1hZ2UiLCJhZGRFdmVudExpc3RlbmVyIiwiX3RvZ2dsZUxpa2VCdG4iLCJfcmVtb3ZlQ2FyZCIsIl9vcGVuSW1hZ2UiLCJjbGFzc0xpc3QiLCJ0b2dnbGUiLCJyZW1vdmUiLCJnZXRWaWV3Iiwic3JjIiwiYWx0IiwidGV4dENvbnRlbnQiLCJjb25maWciLCJmb3JtU2VsZWN0b3IiLCJpbnB1dFNlbGVjdG9yIiwic3VibWl0QnV0dG9uU2VsZWN0b3IiLCJpbmFjdGl2ZUJ1dHRvbkNsYXNzIiwiaW5wdXRFcnJvckNsYXNzIiwiZXJyb3JDbGFzcyIsImNhcmRTZWN0aW9uQ2xhc3MiLCJjYXJkVGVwbGF0ZSIsIlNlY3Rpb24iLCJfcmVmIiwiY2FyZExpc3QiLCJyZW5kZXJlciIsIl9yZW5kZXJlZEl0ZW1zIiwiX3JlbmRlcmVyIiwiX2NvbnRhaW5lciIsImFkZEl0ZW0iLCJlbGVtZW50IiwicHJlcGVuZCIsInJlbmRlckl0ZW1zIiwiZm9yRWFjaCIsIml0ZW0iLCJQb3B1cCIsInBvcHVwU2VsZWN0b3IiLCJfcG9wdXBFbGVtZW50Iiwib3BlbiIsImFkZCIsIl9jbG9zZUJ5RXNjIiwiY2xvc2UiLCJyZW1vdmVFdmVudExpc3RlbmVyIiwiZXZ0Iiwia2V5Iiwic2V0RXZlbnRMaXN0ZW5lcnMiLCJ0YXJnZXQiLCJjb250YWlucyIsIlBvcHVwV2l0aEZvcm0iLCJoYW5kbGVTdWJtaXQiLCJzdXBlciIsIl9wb3B1cEZvcm1FbCIsIl9pbnB1dEVscyIsInF1ZXJ5U2VsZWN0b3JBbGwiLCJfaGFuZGxlU3VibWl0Iiwic2V0SW5wdXRWYWx1ZXMiLCJpbnB1dCIsInZhbHVlIiwicmVzZXQiLCJfZ2V0SW5wdXRWYWx1ZXMiLCJpbnB1dFZhbHVlcyIsIlVzZXJJbmZvIiwidGl0bGUiLCJzdWJ0aXRsZSIsIl9uYW1lRWwiLCJfam9iRWwiLCJnZXRVc2VySW5mbyIsImFib3V0Iiwic2V0VXNlckluZm8iLCJwcm9maWxlQWRkQnRuIiwicHJvZmlsZUVkaXRCdG4iLCJjYXJkU2VjdGlvbiIsInVzZXJJbmZvIiwicmVuZGVyQ2FyZCIsImNhcmQiLCJjcmVhdGVDYXJkIiwicG9wdXBJbWFnZSIsInBvcHVwRGVsZXRlIiwiYXBpIiwib3B0aW9ucyIsIl9iYXNlVXJsIiwiYmFzZVVybCIsIl9oZWFkZXJzIiwiaGVhZGVycyIsIl9jaGVja1Jlc3BvbnNlIiwicmVzIiwib2siLCJjb25zb2xlIiwibG9nIiwianNvbiIsIlByb21pc2UiLCJyZWplY3QiLCJzdGF0dXMiLCJnZXRJbml0aWFsQ2FyZHMiLCJmZXRjaCIsInRoZW4iLCJ1cGRhdGVVc2VySW5mbyIsIm1ldGhvZCIsImJvZHkiLCJKU09OIiwic3RyaW5naWZ5IiwiYWRkTmV3Q2FyZCIsImF1dGhvcml6YXRpb24iLCJwb3B1cEVkaXRGb3JtIiwiX3N1Ym1pdEJ0biIsIl9jYXB0aW9uIiwicG9wdXBBZGRGb3JtIiwiZm9ybVZhbGlkYXRvcnMiLCJBcnJheSIsImZyb20iLCJmb3JtRWxlbWVudCIsInZhbGlkYXRvciIsIl9pbnB1dFNlbGVjdG9yIiwiX3N1Ym1pdEJ1dHRvblNlbGVjdG9yIiwiX2luYWN0aXZlQnV0dG9uQ2xhc3MiLCJfaW5wdXRFcnJvckNsYXNzIiwiX2Vycm9yQ2xhc3MiLCJfZm9ybUVsZW1lbnQiLCJfYnV0dG9uRWwiLCJpbnB1dEVsIiwiX2NoZWNrVmFsaWRpdHkiLCJfdG9nZ2xlU3VibWl0QnRuIiwiX2Rpc2FibGVTdWJtaXRCdG4iLCJzZXRUaW1lb3V0IiwidmFsaWRpdHkiLCJ2YWxpZCIsIl9oaWRlSW5wdXRFcnJvciIsIl9zaG93SW5wdXRFcnJvciIsImVycm9yTWVzc2FnZSIsImlkIiwidmFsaWRhdGlvbk1lc3NhZ2UiLCJfaGFzSW52YWxpZElucHV0IiwiX2VuYWJsZVN1Ym1pdEJ0biIsImV2ZXJ5IiwiZGlzYWJsZWQiLCJlbmFibGVWYWxpZGF0aW9uIiwicHJldmVudERlZmF1bHQiLCJmb3JtTmFtZSIsImdldEF0dHJpYnV0ZSJdLCJzb3VyY2VSb290IjoiIn0=