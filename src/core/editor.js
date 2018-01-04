
class Editor {

  costructor() {
    this.views = []
  }

  init() {
    // create view for sidepanel (objects)
    // create view for object params (panel)
    // add canvas link to controller
    // create model for sidepanel view
  }

  /**
  * Show object in object view
  **/ 
  showObject() {
    // get model for object
    // rerender view
  }

  /**
  * Change object param
  **/ 
  changeObjectParam(param, value) {
    // todo implement
  }

  /** 
  * Selects object in object list
  **/ 
  selectObject() {
    // todo implement
  }

  placeObject(position) {
    // todo canvas drawRect (position, color)
    // todo add object to canvas view reference
  }

  removeObject() {
    // todo objects collection.remove(object)
    // todo update canvas view
  }

  loadScene(name) {
    // todo make request to sverer
  }

}

export default Editor
