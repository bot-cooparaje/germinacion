import { Link } from "gatsby"
import React from "react"

const routes = [
  {
    title: "Inicio",
    slug: "/",
    ariaLabel: "Santuan - Volver al inicio",
  },
  {
    title: "Buscar",
    slug: "/search/",
    ariaLabel: "usar buscador",
  },
  {
    title: "Virtudes",
    slug: "/tags/",
    ariaLabel: "Ver todas las Virtudes",
  },
  {
    title: "Plantas",
    slug: "/blog/",
    ariaLabel: "Ver todas las Plantas",
  },
  {
    title: "Sobre nosotres",
    slug: "/about/",
    ariaLabel: "Ver Sobre nosotres",
  },
]


const Navigation = ({ closeMenu }) => (
  <nav className="flex flex-col w-full">
    {routes.map((route, i) => {
      return (
        <Link
          key={i}
          onClick={closeMenu}
          activeClassName="font-bold"
          alt={route.ariaLabel}
          title={route.ariaLabel}
          aria-label={route.ariaLabel}
          to={route.slug}
          className="my-2 font-mono text-white cursor-pointer hover:text-blue-300"
        >
          {route.title}
        </Link>
      )
    })}

  </nav>
)

export default Navigation
