import { UserAuth } from "../context/AuthContext";

const Navbar = () => {
  const { currentUser, logout } = UserAuth();

  const handleLogout = async () => {
    try {
      await logout();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="navbar fixed z-10 bg-gray-400 text-neutral-content">
      <div className="containerWrap flex justify-between">
        <div className="flex items-center space-x-[10px]">
          <img className="h-[60px] w-[60px] rounded-full object-cover" src="/logo.webp" alt="logo" />
          <a className="font-bold normal-case text-2xl text-green-600">OnlineCHAT</a>
        </div>
        {currentUser ? (
          <button onClick={handleLogout} className="btn btn-ghost normal-case text-xl text-green-600">Logout</button>
        ) : ""}
      </div>
    </div>
  );
};

export default Navbar;
