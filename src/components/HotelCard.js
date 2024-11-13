import React from 'react';

const HotelCard = ({ hotel }) => {
  return (
    <div className="hotel-card">
      <div className="hotel-header">
        <h2 className="hotel-name">{hotel.name}</h2>
        <p className="hotel-stars">{'⭐'.repeat(hotel.stars)}</p>
      </div>
      <div className="hotel-info">
        <div className="hotel-reviews">Отзывы: <b>{hotel.reviews}</b></div>
        <div className="hotel-country">Страна: <b>{hotel.country}</b></div>
        <div className="hotel-type">Тип: <b>{hotel.type}</b></div>
        <div className="hotel-price">Цена: <b>{hotel.price}₽</b></div>
      </div>
      <p className="hotel-description">{hotel.description}</p>
    </div>
  );
};

export default HotelCard;
