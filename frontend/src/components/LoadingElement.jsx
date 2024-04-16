import img from '../Loading.png';
//components.scss
const LoadingElement = () => {
  return (
    <div className="loading">
      <img src={img} alt="Loading..." />
    </div>
  );
};

export default LoadingElement;
