import BBModel from 'backbone-model'

export default BaseModel = BBModel.extend({
  save () {
    console.log('save model')
    return this
  }
})