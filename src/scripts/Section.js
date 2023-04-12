export default class Section {
    constructor({ renderer, selector }){
        this._renderer = renderer;
        this._element = document.querySelector(selector);
        
    }

    renderItems(data){
        //use this._renderer to create the elements for rendering
        
    }

    addItems(){
        //take the item and render it into this._element

    }
}