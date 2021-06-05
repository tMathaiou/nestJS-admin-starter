import React, { FC } from 'react';
import { Language } from '../../interfaces/language';
import { useTranslation } from 'react-i18next';
import styles from './rightActionBar.module.css';

type Props = {
  data: Language;
};

const CustomSingleValue: FC<Props> = ({ data }) => {
  const { t } = useTranslation();

  return (
    <div>
      <img src={data.imageSrc} alt="img" className={styles.optionImage} />
      <span className={styles.optionDesc}>
        <span>{t(data.text)}</span>
      </span>
    </div>
  );
};

export default CustomSingleValue;
