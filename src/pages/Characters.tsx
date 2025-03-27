import Carousel from "../components/common/Carousel/Carousel";
import {
  Link,
  useLoaderData,
  useNavigation,
  useOutletContext,
} from "react-router-dom";
import { OutletContextProps } from "../types/OutletContext";

// Update this type to match your loader data
type CharacterBasicInfo = {
  name: string;
  characterName: string;
  weapon: string;
  vision?: string;
  // icon?: string;
};

const Characters = () => {
  const { isDarkMode } = useOutletContext<OutletContextProps>();
  // Update the type here to reflect what your loader actually returns
  const chars = useLoaderData() as CharacterBasicInfo[];
  const navigation = useNavigation();

  if (navigation.state === "loading") {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#ff7b75]"></div>
      </div>
    );
  }

  return (
    <>
      <Carousel isDarkMode={isDarkMode} />
      <div
        className={`container mx-auto py-10 px-4 ${
          isDarkMode ? "text-white" : "text-slate-800"
        }`}
      >
        <h1 className="text-5xl font-bold mb-8 text-center bg-gradient-to-r from-[#ff7b75] to-[#e46167] bg-clip-text text-transparent">
          Characters
        </h1>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {chars.map((char) => (
            <Link
              key={char.name}
              to={`/characters/${char.name}`}
              className={`block rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-all ${
                isDarkMode ? "bg-slate-800" : "bg-white"
              }`}
            >
              <div className="p-5">
                <h2 className="text-xl font-bold mb-2">{char.characterName}</h2>
                <div
                  className={`flex items-center gap-2 ${
                    isDarkMode ? "text-gray-300" : "text-gray-600"
                  }`}
                >
                  <svg
                    className="w-5 h-5"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M18 12H6"
                    />
                  </svg>
                  <span>Weapon: {char.weapon}</span>
                </div>
                {char.vision && (
                  <div
                    className={`mt-2 flex items-center gap-2 ${
                      isDarkMode ? "text-gray-300" : "text-gray-600"
                    }`}
                  >
                    <svg
                      className="w-5 h-5"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M13 10V3L4 14h7v7l9-11h-7z"
                      />
                    </svg>
                    <span>Vision: {char.vision}</span>
                  </div>
                )}
              </div>
            </Link>
          ))}
        </div>
      </div>
    </>
  );
};

export default Characters;


// import { useEffect, useState } from "react";
// import { CharProps } from "../types/Char";
// import axios from "axios";
// import Carousel from "../components/common/Carousel/Carousel";
// import { Link, useLoaderData, useNavigation, useOutletContext } from "react-router-dom";
// import { OutletContextProps } from "../types/OutletContext";

// const Characters = () => {
//   const { isDarkMode } = useOutletContext<OutletContextProps>();
//   const chars = useLoaderData() as string[];

//     const navigation = useNavigation();
  
//     if (navigation.state === "loading") {
//       return <div>Loading...</div>; //
//     }

//   // const [chars, setChars] = useState([]);
//   // const fetchChars = async () => {
//   //   try {
//   //     const response = await axios.get("https://genshin.jmp.blue/characters");

//   //     if (response.status === 200) {
//   //       setChars(response.data);
//   //     }
//   //   } catch (error) {
//   //     console.error("Error fetching characters:", error);
//   //   }
//   // };
//   // useEffect(() => {
//   //   fetchChars();
//   // }, []);

//   return (
//     <>
//       <Carousel isDarkMode={isDarkMode} />
//       <ul>
//         {chars.map((char) => (
//           <li key={char}>
//             <Link to={`/characters/${char}`}>{char}</Link>
//           </li>
//         ))}
//       </ul>
//     </>
//   );
// };

// export default Characters;
