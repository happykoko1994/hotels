import React, { useState } from 'react';
import hotelsData from '../data/hotelsData';
import HotelCard from './HotelCard';
import Filters from './Filters';
import Sort from './Sort';
import Pagination from './Pagination';

const HotelList = () => {
  const [filteredHotels, setFilteredHotels] = useState(hotelsData);
  const [filters, setFilters] = useState({
    country: null,
    types: [],
    stars: [],
    reviews: null,
    priceRange: [0, 10000],
  });
  const [sortOrder, setSortOrder] = useState('asc');
  const [currentPage, setCurrentPage] = useState(1);
  const hotelsPerPage = 3;

  const minPrice = Math.min(...hotelsData.map(hotel => hotel.price));
  const maxPrice = Math.max(...hotelsData.map(hotel => hotel.price));

  const countries = [
    ...new Set(hotelsData.map(hotel => hotel.country))
  ].map(country => ({ value: country, label: country }));

  const types = [...new Set(hotelsData.map(hotel => hotel.type))];
  const stars = [1, 2, 3, 4, 5];

  const handleCountryChange = (selectedCountries) => {
    setFilters({ ...filters, country: selectedCountries });
  };
  

  const handleTypeChange = (selectedOptions) => {
    setFilters({ ...filters, types: selectedOptions ? selectedOptions.map(option => option.value) : [] });
  };

  const handleStarsChange = (event) => {
    const star = parseInt(event.target.value);
    const newStars = filters.stars.includes(star)
      ? filters.stars.filter(s => s !== star)
      : [...filters.stars, star];
    setFilters({ ...filters, stars: newStars });
  };

  const handleReviewsChange = (event) => {
    setFilters({ ...filters, reviews: event.target.value ? parseInt(event.target.value) : null });
  };

  const handlePriceChange = (newValue) => {
    setFilters({ ...filters, priceRange: newValue });
  };

  const applyFilters = () => {
    let results = hotelsData;

    if (filters.country.length > 0) {
        results = results.filter(hotel => filters.country.includes(hotel.country));
      }
    if (filters.types.length > 0) {
      results = results.filter(hotel => filters.types.includes(hotel.type));
    }
    if (filters.stars.length > 0) {
      results = results.filter(hotel => filters.stars.includes(hotel.stars));
    }
    if (filters.reviews !== null) {
      results = results.filter(hotel => hotel.reviews >= filters.reviews);
    }
    if (filters.priceRange) {
      results = results.filter(hotel => hotel.price >= filters.priceRange[0] && hotel.price <= filters.priceRange[1]);
    }

    if (sortOrder === 'asc') {
      results = results.sort((a, b) => a.price - b.price);
    } else if (sortOrder === 'desc') {
      results = results.sort((a, b) => b.price - a.price);
    }

    setFilteredHotels(results);
    setCurrentPage(1);
  };

  const clearFilters = () => {
    setFilters({
      country: null,
      types: [],
      stars: [],
      reviews: null,
      priceRange: [minPrice, maxPrice],
    });
    setSortOrder('asc');
    setCurrentPage(1);
    setFilteredHotels(hotelsData);
  };

  const handleSortChange = (event) => {
    setSortOrder(event.target.value);
  };

  const indexOfLastHotel = currentPage * hotelsPerPage;
  const indexOfFirstHotel = indexOfLastHotel - hotelsPerPage;
  const currentHotels = filteredHotels.slice(indexOfFirstHotel, indexOfLastHotel);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const pageNumbers = [];
  for (let i = 1; i <= Math.ceil(filteredHotels.length / hotelsPerPage); i++) {
    pageNumbers.push(i);
  }

  return (
    <div className="hotel-list">
      <div className="filters-container">
        <Filters
          countries={countries}
          types={types}
          stars={stars}
          onCountryChange={handleCountryChange}
          onTypeChange={handleTypeChange}
          onStarsChange={handleStarsChange}
          onReviewsChange={handleReviewsChange}
          onPriceChange={handlePriceChange}
          onApplyFilters={applyFilters}
          onClearFilters={clearFilters}
          priceRange={filters.priceRange}
          minPrice={minPrice}
          maxPrice={maxPrice}
          filters={filters}
        />
        <Sort sortOrder={sortOrder} onSortChange={handleSortChange} />

      </div>

      <div className="hotel-cards-container">
        <div className="hotel-cards">
          {currentHotels.length > 0
            ? currentHotels.map(hotel => (
                <HotelCard key={hotel.id} hotel={hotel} />
              ))
            : <p>Отелей не найдено</p>}
        </div>
        <Pagination 
          pageNumbers={pageNumbers} 
          currentPage={currentPage} 
          onPaginate={paginate} 
        />
      </div>
    </div>
  );
};

export default HotelList;
