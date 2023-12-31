import { useState, useEffect } from 'react';

import styles from '../RecommendedFoodPage.module.scss';

import { fetchFoodData } from '@/utils/fetchFoodData';

export default function FoodList() {
  const [foodData, setFoodData] = useState([]);

  useEffect(() => {
    fetchFoodData()
      .then(response => {
        setFoodData(response);
      })
      .catch(err => console.error(err));
  }, []);

  return (
    <ul className={styles.item__list__page}>
      {foodData.map(foodItem => {
        return (
          <li className={styles.item__page} key={foodItem.name}>
            <img
              src={foodItem.img}
              alt={foodItem.name}
              className={styles.product__image__page}
            />
            <div className={styles.product__info__page}>
              <h3 className={styles.product__name__page}>{foodItem.name}</h3>
              <p className={styles.product__calories__page}>
                {foodItem.amount}{' '}
                <span className={styles.calories__quantity__page}>
                  {foodItem.calories} calories
                </span>
              </p>
            </div>
          </li>
        );
      })}
    </ul>
  );
}
