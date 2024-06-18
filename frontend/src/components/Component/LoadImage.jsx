import { useState } from 'react';

const LoadImage = ({ imageurl, defaultImage, altDefault, nameOfClass }) => {
  const [error, setError] = useState(false);
  const onError = () => {
    setError(true);
  };

  return error ? (
    <img src={defaultImage} alt={altDefault} className={nameOfClass} />
  ) : (
    <img src={imageurl} alt={imageurl} onError={onError} className={nameOfClass} />
  );
};

export default LoadImage;
