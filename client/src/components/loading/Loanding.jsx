import style from '../loading/loading.module.css';

export default function Loading () {
    return (
        <div className={style.loadingContainer}>
          <div className={style.loadingSpinner}>
          </div>
          <h2>Cargando...</h2>
        </div>
      );
}