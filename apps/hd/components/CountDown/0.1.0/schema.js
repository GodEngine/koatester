import {PropTypes as types} from 'react'
export default {
  types: {
    stop: types.instanceOf(Date),
    onStart: types.func,
    onStop: types.func
  },
  defaults: {
    stop: new Date('2019/07/07 01:00:00')
  }
}
