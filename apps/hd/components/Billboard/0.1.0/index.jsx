/**
 * Billboard
 *
 * @param {array[object]} list - Data list
 *   {string} avatar - User avatar
 *   {string} name - User name
 *   {string} nameStyle - User name style obj
 *   {string} userLink
 *   {array[object]} counters - Any counters
 *     {jsx} icon - Icon JSX
 *     {number} count - Count
 *     {object} countStyle - Count style obj
 *
 * @param {string} dividerColor - Divider border color
 */

import React from 'react'

import './scss/index.scss'

const Billboard = ({ list = [], dividerColor = '#000' }) => {
  return (
    <ol className="billboard">
    {list.map(({ avatar, name, userLink = 'javascript:;', nameStyle = {}, counters = [] }, idx) => (
      <li key={idx}>
        <section className="billboard__wrapper" style={{ borderTopColor: dividerColor }}>
          <a className="billboard__wrapper__avatar" href={userLink}>
            <img src={avatar} alt="avatar" />
          </a>
          <section className="billboard__wrapper__body">
            <h6 style={nameStyle}>{name}</h6>
            <ul className="billboard__wrapper__body__counters">
            {counters.map(({ icon, count, countStyle = {} }, idx) => (
              <li key={idx}>
                {icon}
                <span
                  className="billboard__wrapper__body__counters__counter"
                  style={countStyle}
                >
                  {`x ${count}`}
                </span>
              </li>
            ))}
            </ul>
          </section>
        </section>
      </li>
    ))}
    </ol>
  )
}

export default Billboard
