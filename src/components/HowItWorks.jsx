import { useState, useEffect } from "react"

// 👉 Add your images (8 total)
import img1 from "../assets/carousel/banner_1.jpg"
import img2 from "../assets/carousel/banner_2.jpg"
import img3 from "../assets/carousel/banner_3.jpg"
import img4 from "../assets/carousel/banner_4.jpg"
import img5 from "../assets/carousel/banner_5.jpg"
import img6 from "../assets/carousel/banner_6.jpg"
import img7 from "../assets/carousel/banner_7.jpg"
import img8 from "../assets/carousel/banner_8.jpg"

const images = [
  img1,
  img2,
  img3,
  img4,
  img5,
  img6,
  img7,
  img8,
]

export default function HowItWorks() {
  const [index, setIndex] = useState(0)

  // 🔁 Auto slide (unchanged)
  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % images.length)
    }, 1500) // 3 seconds

    return () => clearInterval(interval)
  }, [])

  return (
    <section className="mt-28 overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 text-center">

        {/* Heading */}
        <h2 className="text-3xl md:text-4xl font-bold mb-10">
          Schemes That Change Lives
        </h2>

        {/* Carousel container */}
        <div className="relative w-full overflow-hidden">
          <div
            className="flex transition-transform duration-700 ease-in-out"
            style={{
              transform: `translateX(-${index * 33.333}%)`,
            }}
          >
            {images.map((img, i) => (
              <div
                key={i}
                className="w-1/3 px-4 flex-shrink-0"
              >
                <img
                  src={img}
                  alt={`banner-${i}`}
                  className={`
                    w-full h-[300px] object-cover rounded-xl
                    transition-all duration-700
                    ${
                      i === index + 1
                        ? "scale-100 opacity-100"
                        : "scale-90 opacity-60"
                    }
                  `}
                />
              </div>
            ))}
          </div>
        </div>

      </div>
    </section>
  )
}
