import BBCollection from 'backbone-collection'
import SubjectModel from 'models/subject'

export default SubjectCollection = BBCollection.extend({
  model: SubjectModel,

  comparator: 'name'
})