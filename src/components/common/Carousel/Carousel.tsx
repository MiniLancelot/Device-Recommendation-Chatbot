interface CarouselProps {
    isDarkMode: boolean;
  }
  
  const Carousel = ({ isDarkMode }: CarouselProps) => {
    return (
      <div className="w-full relative">
        <img
          className="w-full h-full object-cover cover-img"
          src={isDarkMode ? "src/assets/images/dark-1.png" : "src/assets/images/light-1.png"}
          alt="background"
        />
      </div>
    );
  };
  
  export default Carousel;