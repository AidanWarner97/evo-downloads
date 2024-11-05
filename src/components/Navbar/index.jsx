import React, { useRef } from "react"
import { Link, NavLink } from "react-router-dom"
import evoXLogo from "../../assets/evoXLogo.svg"
import menu from "../../assets/menu.svg"
import menuClose from "../../assets/menuClose.svg"

export default function Sidebar() {
  const navRef = useRef(null)

  const openMenu = () => {
    navRef.current.style.left = "0"
  }

  const closeMenu = () => {
    navRef.current.style.left = "-250px"
  }

  return (
    <div className="flex">
      {/* Sidebar */}
      <div
        ref={navRef}
        className="fixed top-0 left-0 z-50 w-64 h-full bg-[#1a1a1a] p-6 text-[#A9A9A9] transition-all duration-300 ease-in-out md:fixed md:left-0"
      >
        <div className="flex items-center justify-between mb-6 md:mb-10">
          <NavLink to={"/"}>
            <img
              className="h-10 w-10"
              src={evoXLogo}
              alt="evoXLogo"
            />
          </NavLink>
          <img
            src={menuClose}
            alt="close menu"
            className="h-6 w-6 cursor-pointer md:hidden"
            onClick={closeMenu}
          />
        </div>
        <ul className="flex flex-col gap-6 text-lg">
          <li>
            <NavLink to={"/"} >
              Home
            </NavLink>
          </li>
          <li>
            <NavLink to={"/files"} >
              Files
            </NavLink>
          </li>
          <li>
            <NavLink to={"/users"} >
              Users
            </NavLink>
          </li>
          <li>
            <Link to={"/admin"} >
              Admin
            </Link>
          </li>
        </ul>
      </div>

      {/* Menu Icon - Only visible on small screens */}
      <div className="p-4 md:hidden z-50">
        <img
          src={menu}
          alt="menu"
          className="h-6 w-6 cursor-pointer"
          onClick={openMenu}
        />
      </div>
    </div>
  )
}
