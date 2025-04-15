import { Link } from "react-router-dom";

// type LogoProps = {
//   logoName: string;
// };

// const Logo = ({ logoName }: LogoProps) => (
//   <Link
//     to="/"
//     className="desc text-2xl lg:text-3xl font-bold text-primary-white-color"
//   >
//     {logoName}
//   </Link>
// );

const Logo = () => (
  <Link
    to="/"
    className="desc text-2xl lg:text-3xl font-bold text-primary-grey-color"
  >
    <img src="/logo.svg" alt="logo" className="w-20 h-auto" />
  </Link>
);

export default Logo;
