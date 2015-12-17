import React, { Component, PropTypes } from 'react'
import Nav from '../Nav'
import Search from '../Search'

export default class Header extends Component {
  static displayName = 'SG.Header'

  static propTypes = {
    ctx: PropTypes.object.isRequired
  }

  title = document.title

  state = {
    visibleMenu: false
  }

  toggleMenu () {
    this.setState({ visibleMenu: !this.state.visibleMenu })
  }

  render () {
    return (
      <header className='sg sg-header'>
        <div className='sg sg-header-inner'>
          <h1 className='sg sg-header-title'>
            <a className='sg sg-header-title-link' href='.'>{this.title}</a>
          </h1>
          <button
            className='sg sg-header-toggle-menu'
            type='button'
            onClick={this.toggleMenu.bind(this)}
          >
            <i className='fa fa-bars' />
          </button>
          <div className={`sg sg-header-menu${this.state.visibleMenu ? ' is-visible' : ''}`}>
            <Search ctx={this.props.ctx} />
            <Nav ctx={this.props.ctx} />
          </div>
        </div>
      </header>
    )
  }
}
