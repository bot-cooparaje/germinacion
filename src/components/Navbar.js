import React from 'react'
import { Link } from 'gatsby'

const Navbar = class extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      active: false,
      navBarActiveClass: '',
    }
  }

  toggleHamburger = () => {
    // toggle the active boolean in the state
    this.setState(
      {
        active: !this.state.active,
      },
      // after state has been updated,
      () => {
        // set the class in state for the navbar accordingly
        this.state.active
          ? this.setState({
              navBarActiveClass: 'is-active',
            })
          : this.setState({
              navBarActiveClass: '',
            })
      }
    )
  }

  render() {
    return (
      <nav
        className="navbar is-transparent"
        role="navigation"
        aria-label="main-navigation"
      >
        <div className="flex max-w-6xl mx-auto">
          <div className="flex items-center justify-center">
            <Link to="/" className="text-3xl" title="Logo">
              Germinación
            </Link>
            {/* Hamburger menu */}
            <div
              className={`navbar-burger burger ${this.state.navBarActiveClass}`}
              data-target="navMenu"
              onClick={() => this.toggleHamburger()}
            >
              <span />
              <span />
              <span />
            </div>
          </div>
          <div
            id="navMenu"
            className={`flex w-full py-5 ${this.state.navBarActiveClass}`}
          >
            <div className="flex justify-end flex-1 w-full">
              <Link className="mr-4 text-xl" to="/about">
                About
              </Link>
              <Link className="mr-4 text-xl" to="/products">
                Products
              </Link>
              <Link className="mr-4 text-xl" to="/blog">
                Blog
              </Link>
              <Link className="mr-4 text-xl" to="/contact">
                Contact
              </Link>
              <Link className="mr-4 text-xl" to="/contact/examples">
                Form Examples
              </Link>
            </div>
            
          </div>
        </div>
      </nav>
    )
  }
}

export default Navbar
