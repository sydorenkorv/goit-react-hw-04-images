import { GiShipWheel } from 'react-icons/gi';
import css from './Loader.module.css';

function Loader() {
  return (
    <div className={css.wrapper}>
      <GiShipWheel className={css.loader} />
    </div>
  );
}

export default Loader;
