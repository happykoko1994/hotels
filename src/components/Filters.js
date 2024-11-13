import React, { useEffect } from "react";
import Select from "react-select";
import { Slider } from "@mui/material";

const Filters = ({
  countries,
  types,
  stars,
  onCountryChange,
  onTypeChange,
  onStarsChange,
  onReviewsChange,
  onPriceChange,
  onApplyFilters,
  onClearFilters,
  priceRange,
  minPrice,
  maxPrice,
  filters,
}) => {
  const getStarLabel = (count) => {
    if (count === 1) {
      return "звезда";
    } else if (count >= 2 && count <= 4) {
      return "звезды";
    } else {
      return "звезд";
    }
  };
  useEffect(() => {
    onPriceChange([minPrice, maxPrice]);
  }, []);
  return (
    <div className="filters">
      {/* Фильтр по стране */}
      <div className="country">
        <b>Страна</b>
        <Select
          isMulti
          options={countries}
          value={(filters.country || []).map((country) => ({
            value: country,
            label: country,
          }))}
          onChange={(selectedOptions) =>
            onCountryChange(
              selectedOptions
                ? selectedOptions.map((option) => option.value)
                : []
            )
          }
          placeholder="Поиск по стране"
        />
        <button onClick={() => onCountryChange([])}>Сбросить</button>
      </div>

      {/* Фильтр по типу */}
      <div className="type">
        <b>Тип</b>

        <Select
          options={types.map((type) => ({ value: type, label: type }))}
          isMulti
          value={filters.types.map((type) => ({ value: type, label: type }))}
          onChange={onTypeChange}
          placeholder="Тип отеля"
        />
        <button onClick={() => onTypeChange([])}>Сбросить</button>
      </div>

      {/* Фильтр по звездами */}
      <div className="stars-filter">
        <b>Количество звезд</b>
        {stars.map((star) => (
          <label key={star}>
            <input
              type="checkbox"
              value={star}
              checked={filters.stars.includes(star)}
              onChange={onStarsChange}
            />
            {star} {getStarLabel(star)}
          </label>
        ))}
      </div>

      {/* Фильтр по количеству отзывов */}
      <div className="reviews">
        <b>Количество отзывов, от</b>

        <input
          type="number"
          min="0"
          value={filters.reviews || ""}
          onChange={onReviewsChange}
          placeholder="Количество отзывов"
        />
        <button onClick={() => onReviewsChange({ target: { value: "" } })}>
          Сбросить
        </button>
      </div>

      {/* Фильтр по цене */}
      <div className="price">
        <p>Цена:</p>
        <Slider
          value={priceRange}
          onChange={(_, newValue) => onPriceChange(newValue)}
          valueLabelDisplay="auto"
          valueLabelFormat={(value) => `${value}₽`}
          min={minPrice}
          max={maxPrice}
          step={100}
        />
        <div className="price-range">
          <span>От: {priceRange[0]}₽</span> - <span>До: {priceRange[1]}₽</span>
        </div>
        <button onClick={() => onPriceChange([minPrice, maxPrice])}>
          Сбросить
        </button>
      </div>

      <button onClick={onApplyFilters}>Применить фильтры</button>
      <button onClick={onClearFilters}>Сбросить все фильтры</button>
    </div>
  );
};

export default Filters;
