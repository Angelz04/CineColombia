import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import CardEndpoint from '../services/CardEndPoint';

const CardCarousel = () => {
  const carouselData = CardEndpoint();

  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 5,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
    vertical: false,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
          infinite: true,
          dots: false,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          initialSlide: 1,
          dots: false,
        },
      },
    ],
  };

  return (
    <div className="w-full mt-28"> {/* Ajusta el margen superior aquí */}
      <Slider {...settings} className="w-full">
        {carouselData.map((movie, index) => (
          <div key={index} className="w-full h-auto relative">
            <img className="w-full h-full object-cover opacity-100" src={movie.img} alt={movie.name} />
            <div className="absolute inset-0 flex flex-col justify-end items-center text-white bg-black bg-opacity-75 p-6">
              <h3 className="text-xl font-bold mb-2 text-center">{movie.name}</h3>
              <p className="text-base text-center mb-1">Titulo en español: {movie.titleSpanish}</p>
              <p className="text-base text-center mb-1">Estreno: {movie.premiere}</p>
              <p className="text-base text-center mb-1">Género: {movie.Genre}</p>
            </div>
          </div>
        ))}
      </Slider>
    </div>
  );
};

export default CardCarousel;
