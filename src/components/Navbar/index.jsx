import React, { useRef } from "react"
import { Link, NavLink } from "react-router-dom"
import evoXLogo from "../../assets/evoXLogo.svg"
import menu from "../../assets/menu.svg"
import menuClose from "../../assets/menuClose.svg"
import silhouette from "../../assets/silhouette.jpg"

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
        <div className="absolute bottom-[10px] left-1/2 transform -translate-x-1/2 bg-gray-800 rounded-lg w-[225px] grid grid-cols-2 grid-rows-2 gap-0 items-center">
          <NavLink to={"account"} className="text-sm col-span-2 border-b border-gray-700 p-2 flex"><img src={silhouette} alt="Profile" height="24" width="24" className="mr-2"/>Username / Display Name</NavLink>
          <NavLink to={"account/settings"} className="text-sm row-start-2 border-r border-gray-700 p-2"><span className="material-symbols-outlined">settings</span></NavLink>
          <NavLink to={"logout"} className="text-sm row-start-2 p-2 text-right"><span className="material-symbols-outlined">logout</span></NavLink>
        </div>
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
