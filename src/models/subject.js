import BaseModel from 'models/base-model'

let SubjectModel = BaseModel.extend({
  defaults: {
    name: ''
  }
})

export default SubjectModel