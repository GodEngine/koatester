/**
 * Spin Modal
 * 0.1.0
 */

import React from 'react'

import Modal from '../../Modal/0.2.0'
import Spin from '../../Spin/0.1.1'

const SpinModal = (props) => (
  <Modal {...props}>
    <Spin {...props} />
  </Modal>
)

export default SpinModal
