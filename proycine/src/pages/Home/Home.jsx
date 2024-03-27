import Header from '../../components/Header';
import Carousel from '../../components/Carousel'; 
import CardList from '../../components/CardList';

const Home = () => {

  return (
    <div>
      <Header showFilters={true} />
        <Carousel/>
        <CardList/>
    </div>
  );
};

export default Home;
