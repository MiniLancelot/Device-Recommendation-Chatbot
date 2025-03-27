// // import axios from "axios";
// // import { useEffect, useState } from "react";
// import { useLoaderData, useNavigation, useParams } from "react-router-dom";
// import { baseUrl } from "../constants/baseUrl";

// type CharacterProps = {
//     name: string;
//     vision: string;
//     weapon: string;
// }

// const CharacterDetail = () => {

//     const { characterName } = useParams<{ characterName: string }>();

//     const character = useLoaderData() as CharacterProps; // Fetch character details using loader

//     const navigation = useNavigation();

//     if (navigation.state === "loading") {
//         return <div>Loading...</div>; // 
//       }


    
//     // const [character, setCharacter] = useState<CharacterProps | null>(null);
//     // useEffect(() => {
//     //     if (!characterName) return;
    
//     //     const fetchCharacterDetails = async () => {
//     //       try {
//     //         const response = await axios.get(`${baseUrl}/${characterName}`);
    
//     //         if (response.status === 200) {
//     //           setCharacter(response.data);
//     //         }
//     //       } catch (error) {
//     //         console.error("Error fetching character details:", error);
//     //       }
//     //     };
    
//     //     fetchCharacterDetails();
//     //   }, [characterName]);

//     //   if (!character) return <p>Loading character details...</p>;
//   return (
//     <div>
//       <h1>{character.name}</h1>
//       <p>Vision: {character.vision}</p>
//       <p>Weapon: {character.weapon}</p>
//       <img src={`${baseUrl}/${characterName}/card`} alt={character.name} />
//     </div>
//   )
// }

// export default CharacterDetail


import { useLoaderData, useNavigation, useParams, useOutletContext, Link } from "react-router-dom";
import { baseUrl } from "../constants/baseUrl";
import { OutletContextProps } from "../types/OutletContext";

type CharacterProps = {
  name: string;
  vision: string;
  weapon: string;
  description?: string;
}

const CharacterDetail = () => {
  const { isDarkMode } = useOutletContext<OutletContextProps>();
  const { characterName } = useParams<{ characterName: string }>();
  const character = useLoaderData() as CharacterProps;
  const navigation = useNavigation();

  if (navigation.state === "loading") {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#ff7b75]"></div>
      </div>
    );
  }

  const getVisionGradient = (vision: string) => {
    const visionColors: Record<string, string> = {
      Pyro: "from-red-500 to-orange-500",
      Hydro: "from-blue-500 to-cyan-400",
      Anemo: "from-teal-400 to-emerald-500",
      Electro: "from-purple-600 to-indigo-400",
      Cryo: "from-blue-300 to-sky-200",
      Geo: "from-yellow-500 to-amber-400",
      Dendro: "from-green-500 to-lime-400",
      Unknown: "from-gray-500 to-slate-400"
    };
    
    return visionColors[vision] || visionColors.Unknown;
  };

  const getWeaponIcon = (weapon: string) => {
    switch (weapon.toLowerCase()) {
      case 'sword': return '⚔️';
      case 'claymore': return '🗡️';
      case 'polearm': return '🔱';
      case 'catalyst': return '📘';
      case 'bow': return '🏹';
      default: return '🔪';
    }
  };

  return (
    <div className={`min-h-screen pt-20 ${isDarkMode ? 'bg-slate-900 text-white' : 'bg-[#fff8fa] text-slate-800'}`}>
      <div className="container mx-auto px-4 py-8">
        {/* Character Banner/Header */}
        <div className={`mb-8 rounded-xl overflow-hidden shadow-lg relative bg-gradient-to-r ${getVisionGradient(character.vision)}`}>
          <div className="absolute inset-0 bg-black bg-opacity-40"></div>
          <div className="relative z-10 flex flex-col md:flex-row items-center p-6 md:p-8">
            <div className="flex-shrink-0 mb-6 md:mb-0 md:mr-8">
              <div className="w-32 h-32 md:w-40 md:h-40 rounded-full border-4 border-white overflow-hidden shadow-md">
                <img 
                  src={`${baseUrl}/${characterName}/icon`} 
                  alt={character.name}
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    e.currentTarget.src = "https://via.placeholder.com/150?text=Character";
                  }}
                />
              </div>
            </div>
            <div className="text-center md:text-left">
              <h1 className="text-4xl md:text-5xl font-bold text-white mb-2">{character.name}</h1>
              <div className="flex flex-wrap justify-center md:justify-start gap-4 text-white">
                <div className="flex items-center gap-2 bg-black bg-opacity-30 rounded-full px-4 py-2">
                  <span className="text-xl">{getWeaponIcon(character.weapon)}</span>
                  <span>{character.weapon}</span>
                </div>
                <div className="flex items-center gap-2 bg-black bg-opacity-30 rounded-full px-4 py-2">
                  <span className="text-xl">✨</span>
                  <span>{character.vision}</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
          <div className="lg:col-span-2 flex justify-center">
            <div className={`rounded-lg overflow-hidden shadow-md transition-transform hover:scale-105 ${isDarkMode ? 'bg-slate-800' : 'bg-white'}`}>
              <img 
                src={`${baseUrl}/${characterName}/card`} 
                alt={character.name} 
                className="w-full h-auto object-cover"
                onError={(e) => {
                  e.currentTarget.src = "https://via.placeholder.com/300x500?text=Character+Card";
                }}
              />
            </div>
          </div>

          <div className="lg:col-span-3">
            <div className={`rounded-lg shadow-md p-6 ${isDarkMode ? 'bg-slate-800' : 'bg-white'}`}>
              <h2 className="text-2xl font-bold mb-4 bg-gradient-to-r from-[#ff7b75] to-[#e46167] bg-clip-text text-transparent">
                Character Details
              </h2>

              <div className="space-y-4">
                <div>
                  <h3 className={`text-lg font-semibold mb-1 ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>Vision</h3>
                  <p>{character.vision}</p>
                </div>
                
                <div>
                  <h3 className={`text-lg font-semibold mb-1 ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>Weapon</h3>
                  <p>{character.weapon}</p>
                </div>
                
                {character.description && (
                  <div>
                    <h3 className={`text-lg font-semibold mb-1 ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>Description</h3>
                    <p className="text-justify">{character.description}</p>
                  </div>
                )}

                {/* {!character.description && (
                  <div>
                    <h3 className={`text-lg font-semibold mb-1 ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>Description</h3>
                    <p className="text-justify italic">
                      A mysterious character from the world of Teyvat. Their background and abilities are shrouded in mystery, waiting to be discovered.
                    </p>
                  </div>
                )} */}
              </div>

              {/* Back Button */}
              <div className="mt-8">
                <Link 
                  to={`/characters`}
                  className={`px-4 py-2 rounded-lg flex items-center gap-2 transition-colors ${
                    isDarkMode 
                      ? 'bg-slate-700 hover:bg-slate-600 text-white' 
                      : 'bg-gray-200 hover:bg-gray-300 text-slate-800'
                  }`}
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                  </svg>
                  Back to Characters
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CharacterDetail;