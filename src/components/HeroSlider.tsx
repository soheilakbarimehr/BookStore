// src/components/HeroSlider.tsx
import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Autoplay } from 'swiper/modules';
import { Link } from 'react-router-dom';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

interface Slide {
  id: number;
  title: { fa: string; en: string };
  description: { fa: string; en: string };
  image: string;
  buttonLink: string;
}

interface HeroSliderProps {
  slides: Slide[];
  lang: 'fa' | 'en';
}

const HeroSlider: React.FC<HeroSliderProps> = ({ slides, lang }) => {
  return (
    <section className="relative">
      <Swiper
        modules={[Navigation, Pagination, Autoplay]}
        navigation={{ enabled: true }}
        pagination={{ clickable: true }}
        autoplay={{ delay: 5000 }}
        className="h-[500px]"
      >
        {slides.map((slide) => (
          <SwiperSlide key={slide.id}>
            <div className="flex items-center h-full bg-gradient-to-r from-primary-700 to-primary-900">
              <div className="px-4 mx-auto max-w-7xl text-center text-white sm:px-6 lg:px-8">
                {/* اضافه کردن loading="lazy" برای Lazy Loading */}
                <img
                  src={`/public/images/${slide.image}`}
                  alt={lang === 'fa' ? slide.title.fa : slide.title.en}
                  className="object-cover absolute inset-0 w-full h-full opacity-50"
                  loading="lazy"
                />
                <div className="relative z-10">
                  <h1 className="mb-6 text-4xl font-bold md:text-6xl">
                    {lang === 'fa' ? slide.title.fa : slide.title.en}
                  </h1>
                  <p className="mb-8 text-xl md:text-2xl">
                    {lang === 'fa' ? slide.description.fa : slide.description.en}
                  </p>
                  <Link
                    to={slide.buttonLink}
                    className="px-8 py-3 text-lg font-semibold bg-white rounded-full transition-all text-primary-700 hover:bg-opacity-90"
                  >
                    {lang === 'fa' ? 'شروع به خرید' : 'Start Shopping'}
                  </Link>
                </div>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </section>
  );
};

export default HeroSlider;