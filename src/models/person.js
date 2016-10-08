import BaseModel from 'base-model'

export default PersonModel = BaseModel.extend({
  defaults () {// is function so 'subjects' array is not shared
    return {
      name: '',
      subjects: []
    }
  }
})