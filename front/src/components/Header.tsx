import { NavLink } from 'react-router-dom'
import React from 'react'

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);

  return (
    <header className="bg-white shadow-sm">
      <div className="flex justify-between items-center px-4 py-4 md:px-8 md:py-6">
        {/* Logo */}
        <h1 className="text-xl font-semibold text-blue-800">Face Register</h1>

        {/* Mobile menu button */}
        <button
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          className="md:hidden flex flex-col justify-center items-center w-8 h-8"
          aria-label="Toggle menu"
        >
          <span className={`bg-blue-800 block transition-all duration-300 ease-out h-0.5 w-6 rounded-sm ${isMenuOpen ? 'rotate-45 translate-y-1' : '-translate-y-0.5'}`}></span>
          <span className={`bg-blue-800 block transition-all duration-300 ease-out h-0.5 w-6 rounded-sm my-0.5 ${isMenuOpen ? 'opacity-0' : 'opacity-100'}`}></span>
          <span className={`bg-blue-800 block transition-all duration-300 ease-out h-0.5 w-6 rounded-sm ${isMenuOpen ? '-rotate-45 -translate-y-1' : 'translate-y-0.5'}`}></span>
        </button>

        {/* Desktop Navigation */}
        <nav className="hidden md:block">
          <ul className="flex gap-5">
            <li>
              <NavLink
                to="/usuarios"
                className={({ isActive }) =>
                  isActive
                    ? "text-blue-700 border-b-2 border-blue-700 pb-1"
                    : "text-gray-600 hover:text-blue-700 transition-colors"
                }
              >
                Gerenciar Usuários
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/cadastro"
                className={({ isActive }) =>
                  isActive
                    ? "text-blue-700 border-b-2 border-blue-700 pb-1"
                    : "text-gray-600 hover:text-blue-700 transition-colors"
                }
              >
                Cadastro
              </NavLink>
            </li>
          </ul>
        </nav>
      </div>

      {/* Mobile Navigation */}
      <nav className={`md:hidden transition-all duration-300 ease-in-out ${isMenuOpen ? 'max-h-48 opacity-100' : 'max-h-0 opacity-0'} overflow-hidden bg-slate-50 border-t border-slate-200`}>
        <ul className="flex flex-col py-4 px-4 space-y-2">
          <li>
            <NavLink
              to="/usuarios"
              onClick={() => setIsMenuOpen(false)}
              className={({ isActive }) =>
                isActive
                  ? "block py-3 px-4 text-blue-700 bg-blue-50 rounded-lg font-medium"
                  : "block py-3 px-4 text-gray-600 hover:text-blue-700 hover:bg-blue-50 rounded-lg transition-all duration-200"
              }
            >
              👥 Gerenciar Usuários
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/cadastro"
              onClick={() => setIsMenuOpen(false)}
              className={({ isActive }) =>
                isActive
                  ? "block py-3 px-4 text-blue-700 bg-blue-50 rounded-lg font-medium"
                  : "block py-3 px-4 text-gray-600 hover:text-blue-700 hover:bg-blue-50 rounded-lg transition-all duration-200"
              }
            >
              ➕ Cadastro
            </NavLink>
          </li>
        </ul>
      </nav>
    </header>
  );
}

