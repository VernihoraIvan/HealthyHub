import { useState, useEffect } from 'react';

import styles from '../RecommendedFoodMain.module.scss';

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
    <ul className={styles.item__list}>
      {foodData.slice(0, 4).map(foodItem => {
        return (
          <li className={styles.item} key={foodItem.name}>
            <img
              src={foodItem.img}
              alt={foodItem.name}
              className={styles.product__image}
              loading="lazy"
            />
            <div className={styles.product__info}>
              <h3 className={styles.product__name}>{foodItem.name}</h3>
              <p className={styles.product__calories}>
                {foodItem.amount}{' '}
                <span className={styles.calories__quantity}>
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
