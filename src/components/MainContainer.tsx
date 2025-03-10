import React, { useState, useEffect } from 'react';
import axios from 'axios';

const MainContainer: React.FC = () => {
  const [data, setData] = useState<any[]>([]);  // Данные о машинах
  const [filteredData, setFilteredData] = useState<any[]>([]);  // Данные после фильтрации
  const [filters, setFilters] = useState({
    year: '',
    price: '',
    engineType: '',
    transmission: '',
    country: '',
    color: ''
  });

  // Обработчик изменения фильтров
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFilters((prev) => ({
      ...prev,
      [name]: value
    }));
  };

  // Функция для фильтрации данных
  const filterData = () => {
    const { year, price, engineType, transmission, country, color } = filters;

    const filtered = data.filter((car) => {
      return (
        (year ? car.year.includes(year) : true) &&
        (price ? car.price.includes(price) : true) &&
        (engineType ? car.engine_type.toLowerCase().includes(engineType.toLowerCase()) : true) &&
        (transmission ? car.transmission.toLowerCase().includes(transmission.toLowerCase()) : true) &&
        (country ? car.country.toLowerCase().includes(country.toLowerCase()) : true) &&
        (color ? car.color.toLowerCase().includes(color.toLowerCase()) : true)  // Фильтрация по цвету
      );
    });

    setFilteredData(filtered);
  };

  // Эффект для обновления фильтрованных данных при изменении фильтров
  useEffect(() => {
    filterData();
  }, [filters, data]);

  // Сброс фильтров
  const handleResetFilters = () => {
    setFilters({
      year: '',
      price: '',
      engineType: '',
      transmission: '',
      country: '',
      color: ''
    });
  };

  // Получение данных о машинах из базы данных
  const handleFetchFromDB = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/cars');
      console.log('Cars from DB:', response.data);  // Логируем полученные данные
      setData(response.data);     // Сохраняем данные в состояние
      setFilteredData(response.data);  // Применяем фильтрацию сразу после получения данных
    } catch (error) {
      console.error('Ошибка при получении данных:', error);
    }
  };

  // Парсинг данных с других сайтов
  const handleParseData = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/scrape-cars');
      console.log('Парсинг завершен, данные:', response.data);  // Логируем данные, полученные от сервера
      setData(response.data);  // Сохраняем данные
      setFilteredData(response.data);  // Применяем фильтрацию сразу после получения данных
    } catch (error) {
      console.error('Ошибка при парсинге данных:', error);
    }
  };

  return (
    <div className="container mt-4">
      <div className="d-flex justify-content-between mb-4">
        <button className="btn btn-primary" onClick={handleFetchFromDB}>Показать машины из базы</button>
        <button className="btn btn-secondary" onClick={handleParseData}>Парсинг машин</button>  {/* Добавлена кнопка для парсинга */}
      </div>

      {/* Фильтры */}
      <div className="row mb-3">
        <div className="col-md-2 mb-3">
          <input 
            type="text" 
            name="year" 
            placeholder="Год выпуска" 
            className="form-control"
            value={filters.year}
            onChange={handleChange} 
          />
        </div>
        <div className="col-md-2 mb-3">
          <input 
            type="text" 
            name="price" 
            placeholder="Цена" 
            className="form-control"
            value={filters.price}
            onChange={handleChange} 
          />
        </div>
        <div className="col-md-2 mb-3">
          <input 
            type="text" 
            name="engineType" 
            placeholder="Тип двигателя" 
            className="form-control"
            value={filters.engineType}
            onChange={handleChange} 
          />
        </div>
        <div className="col-md-2 mb-3">
          <input 
            type="text" 
            name="transmission" 
            placeholder="Коробка передач" 
            className="form-control"
            value={filters.transmission}
            onChange={handleChange} 
          />
        </div>
        <div className="col-md-2 mb-3">
          <input 
            type="text" 
            name="country" 
            placeholder="Страна" 
            className="form-control"
            value={filters.country}
            onChange={handleChange} 
          />
        </div>
        <div className="col-md-2 mb-3">
          <input 
            type="text" 
            name="color" 
            placeholder="Цвет" 
            className="form-control"
            value={filters.color}
            onChange={handleChange} 
          />
        </div>
      </div>

      {/* Кнопка сброса фильтров */}
      <div className="mb-4">
        <button className="btn btn-primary" onClick={handleResetFilters}>Сбросить фильтры</button>
      </div>

      {/* Количество машин, соответствующих фильтрам */}
      <div className="mb-4">
        <p>Найдено {filteredData.length} автомобилей</p>
      </div>

      {/* Отображение автомобилей */}
      <div className="row">
        {filteredData.map((car, index) => (
          <div key={index} className="col-md-4 mb-3">
            <div className="card shadow-sm border-light" style={{ borderRadius: '8px' }}>
              <img src={car.image_url || 'https://via.placeholder.com/150'} className="card-img-top" alt={car.model} />
              <div className="card-body">
                <h5 className="card-title">{car.brand} {car.model}</h5>
                <p className="card-text">
                  <strong>Год выпуска:</strong> {car.year}<br />
                  <strong>Цена:</strong> {car.price} руб.<br />
                  <strong>Тип двигателя:</strong> {car.engine_type}<br />
                  <strong>Коробка передач:</strong> {car.transmission}<br />
                  <strong>Страна:</strong> {car.country}<br />
                  <strong>Цвет:</strong> {car.color}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MainContainer;
