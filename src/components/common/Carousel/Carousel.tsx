// const Carousel = () => {
//   return (
//     <div className="w-full relative">
//       <img
//         className="w-full h-full object-cover cover-img"
//         src={"src/assets/images/light-1.png"}
//         alt="background"
//       />
//     </div>
//   );
// };

// export default Carousel;

import { useState, useEffect, useRef } from "react"
import { useNavigate } from "react-router-dom"
import { getCarouselData, CarouselItem } from "../../../constants/carouselData"
import CarouselCustomButton from "../Button/CarouselCustomButton";

const SLIDE_DURATION = 5000

interface HeroCarouselProps {
  category?: string | null;
}

export default function HeroCarousel({ category }: HeroCarouselProps) {
  const [activeIndex, setActiveIndex] = useState(0)
  const [progress, setProgress] = useState(0)
  const progressInterval = useRef<number | null>(null)
  const navigate = useNavigate()
  
  const carouselItems: CarouselItem[] = getCarouselData(category)

  const goToSlide = (index: number) => {
    setActiveIndex(index)
    setProgress(0)
    if (progressInterval.current) clearInterval(progressInterval.current)
    startProgressTimer()
  }

  const startProgressTimer = () => {
    if (progressInterval.current) clearInterval(progressInterval.current)

    const startTime = Date.now()
    progressInterval.current = setInterval(() => {
      const elapsed = Date.now() - startTime
      const newProgress = (elapsed / SLIDE_DURATION) * 100

      if (newProgress >= 100) {
        setProgress(0)
        setActiveIndex((prev) => (prev + 1) % carouselItems.length)
        startProgressTimer()
      } else {
        setProgress(newProgress)
      }
    }, 16)
  }

  useEffect(() => {
    startProgressTimer()
    return () => {
      if (progressInterval.current) clearInterval(progressInterval.current)
    }
  }, [carouselItems.length])

  // Reset carousel when category changes
  useEffect(() => {
    setActiveIndex(0)
    setProgress(0)
    if (progressInterval.current) clearInterval(progressInterval.current)
    startProgressTimer()
  }, [category])

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="relative w-full h-[400px] rounded-xl overflow-hidden">
        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/50 to-transparent z-10" />

        {/* Slides */}
        {carouselItems.map((item, index) => (
          <div
            key={item.id}
            className={`absolute inset-0 transition-opacity duration-1000 ${
              index === activeIndex ? "opacity-100" : "opacity-0"
            }`}
          >
            <img
              src={item.image}
              alt={item.title}
              className="w-full h-full object-cover"
            />
          </div>
        ))}

        {/* Content Overlay */}
        <div className="relative z-20 h-full flex flex-col justify-center px-8 text-white">
          <div className="max-w-2xl">
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6 leading-tight">
              {carouselItems[activeIndex].title}
            </h1>
            <CarouselCustomButton 
              onClick={() => {
                const link = carouselItems[activeIndex].buttonLink;
                if (link) {
                  navigate(`/devices/${link}`);
                }
              }}
              bgColor="rgba(64, 64, 64, 0.6)"
              textColor="#ffffff"
              borderColor="#ffffff"
            >
              Khám phá ngay
            </CarouselCustomButton>
          </div>
        </div>

        {/* Thumbnails */}
        <div className="absolute bottom-6 right-6 z-30 flex items-center space-x-2">
          {carouselItems.map((item, index) => (
            <div key={item.id} className="flex flex-col items-center">
              <button
                onClick={() => goToSlide(index)}
                className={`relative h-14 w-24 overflow-hidden rounded border-2 transition-all ${
                  index === activeIndex
                    ? "border-white"
                    : "border-transparent opacity-70 hover:opacity-100"
                }`}
              >
                <img
                  src={item.thumbnail}
                  alt={`Thumbnail ${index + 1}`}
                  className="object-cover w-full h-full"
                />
              </button>

              {/* Progress Bar */}
              <div className="h-1 mt-1 rounded-full overflow-hidden w-full bg-white/30">
                {index === activeIndex && (
                  <div
                    className="h-full bg-white transition-all duration-300 ease-linear"
                    style={{ width: `${progress}%` }}
                  />
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
