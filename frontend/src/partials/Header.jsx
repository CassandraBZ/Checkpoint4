import RightNav from "../components/RightNav";
import Logo from "../components/Logo";

function Header() {
  return (
    <header className="flex flex-row justify-between items-center">
      <div className="mx-4">
        <Logo />
      </div>
      <div>
        <RightNav />
      </div>
    </header>
  );
}

export default Header;
