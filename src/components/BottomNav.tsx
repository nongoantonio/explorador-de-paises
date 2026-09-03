// Barra de navegação fixa no fundo do ecrã, inspirada em apps móveis
// nativas. Usamos <NavLink> do react-router em vez de <Link> porque o
// NavLink sabe automaticamente qual é a rota "ativa" e permite-nos
// aplicar-lhe uma classe diferente (é assim que pintamos o ícone/texto
// da secção onde o utilizador está).
import { NavLink } from "react-router-dom";
import { motion } from "framer-motion";
import { Compass, Heart, Info } from "lucide-react";

const TABS = [
  { to: "/", label: "Explorar", icon: Compass, end: true },
  { to: "/favoritos", label: "Favoritos", icon: Heart, end: false },
  { to: "/sobre", label: "Sobre", icon: Info, end: false },
];

export function BottomNav() {
  return (
    <nav className="bottom-nav" aria-label="Navegação principal">
      {TABS.map(({ to, label, icon: Icon, end }) => (
        <NavLink
          key={to}
          to={to}
          end={end}
          className={({ isActive }) =>
            "bottom-nav__item" + (isActive ? " is-active" : "")
          }
        >
          {({ isActive }) => (
            <>
              <motion.span
                className="bottom-nav__icon"
                animate={{ scale: isActive ? 1.15 : 1, y: isActive ? -2 : 0 }}
                transition={{ type: "spring", stiffness: 400, damping: 20 }}
              >
                <Icon size={22} strokeWidth={2} aria-hidden="true" />
              </motion.span>
              <span>{label}</span>
            </>
          )}
        </NavLink>
      ))}
    </nav>
  );
}
