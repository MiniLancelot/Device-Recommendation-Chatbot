import { Link } from "react-router-dom";

type LogoProps = {
  logoName: string;
};

const Logo = ({ logoName }: LogoProps) => (
  <Link
    to="/"
    className="desc text-2xl lg:text-3xl font-bold text-primary-white-color"
  >
    {logoName}
  </Link>
);

export default Logo;
