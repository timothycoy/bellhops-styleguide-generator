import React, { Component, PropTypes } from 'react'
import Section from '../Section'
import contents from '../../utils/contents'

export default class Sections extends Component {
  static displayName = 'SG.Sections'

  static propTypes = {
    ctx: PropTypes.object.isRequired
  }

  getContents () {
    let params = this.props.ctx.params
    let data = {}

    if (params.query) {
      data = {
        query: params.query,
        keys: ['area', 'category', 'title', 'description', 'code']
      }
    } else if (params.category) {
      data = {
        query: params.title || params.category,
        keys: params.title ? ['title'] : ['category'],
        exact: true
      }
    } else if (params.area) {
      data = {
        query: params.title || params.area,
        keys: params.title ? ['title'] : ['area'],
        exact: true
      }
    }

    return contents.search(data)
  }

  render () {
    return (
      <div>
        {this.getContents()
          .filter((Content, i) => {
            if (Content.styleguide.area === undefined || Content.styleguide.category === undefined || Content.styleguide.title === undefined) {
              return false;
            }
            return true;
          })
          .map((Content, i) => {
          // This exists so we can pull out the displayName for props documentation
          Content.styleguide._self = <Content />

          Content.styleguide._id = i

          return (
            <Section {...Content.styleguide} key={i}>
              {Content.prototype.render && <Content {...this.props} />}
            </Section>
          )
        })}
      </div>
    )
  }
}
