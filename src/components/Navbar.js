import React from "react";
import { Link } from "gatsby";
import logo from "../img/logo.svg";
const Navbar = class extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      active: false,
      navBarActiveClass: "",
    };
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
              navBarActiveClass: "is-active",
            })
          : this.setState({
              navBarActiveClass: "",
            });
      }
    );
  };

  render() {
    return (
      <nav
        className="navbar is-transparent"
        role="navigation"
        aria-label="main-navigation"
      >
        <div className="flex max-w-6xl mx-auto">
          <div className="flex items-center justify-center">
            <Link to="/" className="flex items-center " title="Logo">
              <img src={logo} alt="Kaldi" style={{ width: "50px" }} />
              <span className="ml-2 text-2xl font-bold tracking-wide text-green-600">
                Germinación
              </span>
            </Link>
            {/* Hamburger menu */}
            <div
              className={`navbar-burger burger ${this.state.navBarActiveClass}`}
              data-target="navMenu"
              aria-hidden="true"
              tabIndex="0"
              role="button"
              onClick={() => this.toggleHamburger()}
            >
              <span />
              <span />
              <span />
            </div>
          </div>
          <div
            id="navMenu"
            className={`hidden md:flex w-full py-5 ${this.state.navBarActiveClass}`}
          >
            <div className="flex justify-end flex-1 w-full">
              <Link className="mr-4 text-xl" to="/search">
                Buscador
              </Link>

              <Link className="mr-4 text-xl" to="/tags">
                Virtudes
              </Link>
              <Link className="mr-4 text-xl" to="/blog">
                Plantas
              </Link>
              <Link className="mr-4 text-xl" to="/about">
                Sobre nosotres
              </Link>
            </div>
          </div>
        </div>
      </nav>
    );
  }
};

export default Navbar;
