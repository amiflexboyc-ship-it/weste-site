
import {
FaRecycle,
  FaHome,
  FaInfoCircle,
  FaTools,
  FaTruck,
  FaPhone,
  FaUser,
} from "react-icons/fa";

function Nav() {
  return (
    <nav className="bg-slate-900 text-white shadow-lg border-b-1 border-blue-800">
      <div className="max-w-7xl mx-auto px-4 py-2 flex items-center justify-between">

        <div className="flex items-center gap-">

          <h2 className="text-2xl font-bold">
            <FaRecycle className="inline-block mr-2 text-blue-500" />
            ANIMAL<span className="text-blue-500">S</span>
          </h2>
        </div>

        <div className="hidden md:flex items-center gap-6">

          <a href="#" className="flex items-center gap-2 hover:text-blue-200">
           
            Home
          </a>

          <a href="#" className="flex items-center gap-2 hover:text-blue-200">
            About
          </a>

          <a href="#" className="flex items-center gap-2 hover:text-blue-200">
            Services
          </a>

          <a href="#" className="flex items-center gap-2 hover:text-blue-200">
            Pickup
          </a>

          <a href="#" className="flex items-center gap-2 hover:text-blue-200">
            Contact
          </a>

        </div>

        <div className="flex items-center gap-3">

          <button className="flex items-center gap-2 border border-white px-4 py-2 rounded-[0_30px_0_70px] hover:bg-white hover:text-blue-700 transition">
            Login
          </button >

          <button className="bg-white text-blue-700 px-3 py-2 rounded-[0_30px_0_70px] font-semibold hover:bg-blue-300 transition">
            Sign Up
          </button>

        </div>

      </div>
    </nav>
  );
}

export default Nav;

