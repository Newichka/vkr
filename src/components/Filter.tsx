import React from 'react';

interface FilterProps {
  filters: {
    year: string;
    price: string;
    engineType: string;
    transmission: string;
    country: string;
  };
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const Filter: React.FC<FilterProps> = ({ filters, onChange }) => {
  return (
    <div className="container mt-4">
      <div className="row">
        <div className="col-md-2 mb-3">
          <input 
            type="text" 
            name="year" 
            placeholder="Год выпуска" 
            className="form-control"
            value={filters.year}
            onChange={onChange} 
          />
        </div>
        <div className="col-md-2 mb-3">
          <input 
            type="text" 
            name="price" 
            placeholder="Цена" 
            className="form-control"
            value={filters.price}
            onChange={onChange} 
          />
        </div>
        <div className="col-md-2 mb-3">
          <input 
            type="text" 
            name="engineType" 
            placeholder="Тип двигателя" 
            className="form-control"
            value={filters.engineType}
            onChange={onChange} 
          />
        </div>
        <div className="col-md-2 mb-3">
          <input 
            type="text" 
            name="transmission" 
            placeholder="Коробка передач" 
            className="form-control"
            value={filters.transmission}
            onChange={onChange} 
          />
        </div>
        <div className="col-md-2 mb-3">
          <input 
            type="text" 
            name="country" 
            placeholder="Страна" 
            className="form-control"
            value={filters.country}
            onChange={onChange} 
          />
        </div>
      </div>
    </div>
  );
};

export default Filter;
