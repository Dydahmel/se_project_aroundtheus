export default class Section {
    constructor({ data,  renderer }, cardList){
        this._renderedItems = data;
        this._renderer = renderer;
        this._container = document.querySelector(cardList);
        
    }

    renderItems(){
        this._renderedItems.forEach(item => {
            this._renderer(item)
            this.setItem(cardEl);
        });
        
        
    }

    setItem(element){
       this._container.append(element);
    }
}