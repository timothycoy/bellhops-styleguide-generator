import React, { Component, PropTypes } from 'react'
import contents from '../../utils/contents'

export default class Nav extends Component {
  static displayName = 'SG.Nav'

  static propTypes = {
    ctx: PropTypes.object.isRequired
  }

  render () {
    let home = '/'

    if (window.config.base && window.config.base !== '') {
      home = window.config.base
    }

    return (
      <nav>
        <ul className='sg sg-nav'>
          <li className='sg' key={'home'}>
            <a className={`sg sg-nav-link`} href={home}>Show All</a>
          </li>

          {
            contents.navList.areas.map((area, i) => {
              let isSelectedArea = this.props.ctx.params.area === area

              return (
                <li className='sg' key={i}>
                  <a className={`sg area sg-nav-link ${isSelectedArea ? 'is-selected' : ''}`} href={area}>{area}</a>

                  <ul className='sg sg-sub-nav'>
                    {
                      contents.navList.components[area].map((category, j) => {
                        let isSelectedCategory = this.props.ctx.params.category === category

                        if (!isSelectedArea) {
                          return false;
                        }

                        return (
                          <li key={j}>
                            <a className={`sg category sg-nav-link ${isSelectedCategory ? 'is-selected' : ''}`} href={area + '/' + category}>{category}</a>

                            <ul className='sg sg-sub-nav'>
                              {
                                contents.navList.components[area][category].map((component, k) => {
                                  let isSelectedComponent = this.props.ctx.params.title === component

                                  if (!isSelectedCategory) {
                                    return false;
                                  }

                                  return (
                                    <li key={k}>
                                      <a className={`sg sg-nav-link ${isSelectedComponent ? 'is-selected' : ''}`} href={area + '/' + category + '/' + component}>{component}</a>
                                    </li>
                                  )
                                })
                              }
                            </ul>
                          </li>
                        )
                      })
                    }
                  </ul>
                </li>
              )
            })
          }
        </ul>
      </nav>
    )
  }
}
