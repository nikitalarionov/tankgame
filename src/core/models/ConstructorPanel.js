import BaseModel from 'core/model'

export default class ObjectList extends BaseModel {

  attrs = {
    len: 0,
    selected: null
  }

  getItems() {
    const items = this.getAttr('items')
  }

  setItems(items) {
    this.setAttr('len', items.length)
    this.setAttr('items', items)
  }

  getItemByIdx(idx) {
    const items = this.getItems()
    return items[idx]
  }

  selectItemByIdx(idx) {
    const item = this.getItemByIdx(idx)
    item.select = true
    this.setAttr('selected', item)
    return item
  }

}
