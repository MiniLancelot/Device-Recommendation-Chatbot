import { useOutletContext } from "react-router-dom";
import Carousel from "../components/common/Carousel/Carousel";
import { OutletContextProps } from "../types/OutletContext";

const Home = () => {
  const { isDarkMode } = useOutletContext<OutletContextProps>();

  return (
    <>
      <Carousel isDarkMode={isDarkMode} />
      <div className="container mx-auto pb-10 px-3">
        <h1
          className={`title text-5xl lg:text-7xl font-bold leading-normal bg-gradient-to-r ${
            isDarkMode
              ? "dark:from-[#7366e1] dark:to-[#fff075]"
              : "from-[#ff7b75] to-[#e46167]"
          } bg-clip-text text-transparent`}
        >
          Electron Chatbot
        </h1>
        <p
          className={`desc text-justify text-lg lg:text-2xl ${
            isDarkMode ? "dark:text-[#fff8fa]" : ""
          }`}
        >
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Culpa velit
          ad quae vel, veniam quibusdam voluptatem dolore hic voluptatibus ipsa
          quam repellendus natus reiciendis nulla sunt soluta iure saepe animi,
          accusantium mollitia, accusamus tempora eaque. Perspiciatis accusamus
          recusandae officia placeat quisquam vitae, fugit nostrum consectetur
          corrupti neque architecto harum dolorum? Repellat quod sint eaque
          aperiam provident reprehenderit quo necessitatibus impedit neque
          voluptatem saepe officia eveniet beatae voluptatibus quos voluptates
          fugit, autem obcaecati ut, voluptate delectus ex eius unde. Maiores
          unde excepturi eveniet corporis quam, optio magni alias culpa
          blanditiis rerum vel quisquam, ipsam velit recusandae corrupti aperiam
          labore. Aspernatur, dolor.
        </p>
        <p
          className={`desc text-justify text-lg lg:text-2xl  mt-3 lg:mt-4 ${
            isDarkMode ? "dark:text-[#fff8fa]" : ""
          }`}
        >
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Illum officia
          nisi esse nihil itaque quis repellat. Aliquam est provident deserunt
          dolore rerum, ex quod ipsum delectus obcaecati facilis unde animi
          architecto quos adipisci reiciendis officia, rem eaque. Asperiores
          dolorum ad deserunt corporis vel repudiandae unde, praesentium sed,
          molestiae esse enim quisquam nihil quibusdam incidunt. Molestias quis
          excepturi cupiditate eos officiis ipsa odit perferendis aliquid
          inventore, obcaecati dolorum repellat perspiciatis rem id temporibus
          ea assumenda doloribus libero totam ex. Aliquid, sequi. Odit officiis
          illo, vel totam incidunt culpa voluptatum ad cupiditate vero
          praesentium eligendi, nemo rerum velit nisi cumque magnam? Expedita,
          rerum nostrum cumque nesciunt architecto in adipisci dolorum
          accusantium suscipit quod consequatur vitae. Ab provident quo facilis
          quod dolores, rerum inventore explicabo exercitationem voluptatum
          reiciendis nesciunt corrupti commodi libero tempore, neque mollitia
          ipsum quos! Totam, sapiente ut. Impedit quia provident distinctio
          assumenda temporibus corporis fugiat sint, sed qui doloremque,
          architecto iste sit, itaque eveniet velit aut nulla porro? Libero
          velit ipsa nisi at rerum odio similique temporibus assumenda sequi
          alias labore quas ipsum nihil sed, odit ratione eius explicabo?
          Delectus impedit, deserunt praesentium officiis sunt aperiam quasi
          doloribus laborum repellat sint nam rerum ullam. A autem nulla veniam
          corrupti officiis!
        </p>
      </div>
    </>
  );
};

export default Home;
