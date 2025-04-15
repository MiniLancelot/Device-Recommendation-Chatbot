import { useState } from "react";
import { UserProfileProps } from "../types/UserProfile";
import HoverButton from "../components/common/Button/CustomButon";

const Test = () => {
  const [profile, setProfile] = useState<UserProfileProps>({
    username: "",
    email: "",
  });

  const { username, email } = profile;

  const handleChangeProfileState = <K extends keyof UserProfileProps>(
    field: K,
    value: UserProfileProps[K]
  ) => {
    setProfile((prev: UserProfileProps) => ({
      ...prev,
      [field]: value,
    }));
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <input
        type="text"
        placeholder="Username"
        value={username}
        onChange={(e) => handleChangeProfileState("username", e.target.value)}
      />

      <input
        type="text"
        placeholder="Email"
        value={email}
        onChange={(e) => handleChangeProfileState("email", e.target.value)}
      />
      <div
      >
        <HoverButton onClick={() => console.log("Button clicked!")}>
          Click Me
        </HoverButton>
      </div>
    </div>
  );
};

export default Test;
