import React from 'react';

const Header: React.FC = () => {
  return (
    <header className="bg-primary text-white py-3">
      <div className="container d-flex justify-content-between align-items-center">
        <h1>Автомобили из-за рубежа</h1>
        <button className="btn btn-light">Оставить заявку</button>
      </div>
    </header>
  );
};

export default Header;
