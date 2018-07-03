/**
 * Tip Modal
 * 0.2.0
 *
 * @param {Boolean} visible
 * @param {Function} onClick
 * @param {Any} children
 *
 * @Author: Liu Qian <qianliu>
 * @Email:  112486391@qq.com
 */

import React from 'react'

import Modal from '../../Modal/0.2.0'

import './index.scss'

const TipModal = ({
  visible = false,
  onClick = () => {},
  children
}) => {
  const modalProps = { visible, onClick, cls: 'tip-modal' }

  return (
    <Modal {...modalProps}>
      <section className="tip-modal__body">
        <img src={require('./img/arrow.png')} alt="arrow" />
        {children && (
          <section className="tip-modal__body__content">
            {children}
          </section>
        )}
      </section>
    </Modal>
  )
}

export default TipModal
