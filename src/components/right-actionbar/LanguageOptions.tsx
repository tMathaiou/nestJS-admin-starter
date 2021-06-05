import { useTranslation } from 'react-i18next';
import React, { FC } from 'react';
import { Language } from '../../interfaces/language';
import styles from './rightActionBar.module.css';
import { useAppContext } from '../../lib/context/app/appContext';
import { useRouter } from 'next/router';

type Props = {
  data: Language;
};

const LanguageOptions: FC<Props> = ({ data }) => {
  const { t } = useTranslation();
  const { setLangId } = useAppContext();
  const router = useRouter();

  const changeLanguage = (selectedOption: Language) => {
    setLangId(selectedOption.id);
    return router.push(router.pathname, router.asPath, {
      locale: selectedOption.path
    });
  };

  return (
    <div>
      <span className={styles.optionList} onClick={() => changeLanguage(data)}>
        <img src={data.imageSrc} alt="img" className={styles.optionImage} />
        <span className={styles.optionDesc}>
          <span>{t(data.text)}</span>
        </span>
      </span>
    </div>
  );
};

export default LanguageOptions;
