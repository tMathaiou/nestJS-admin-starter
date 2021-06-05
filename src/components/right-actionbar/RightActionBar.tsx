import React, { useMemo } from 'react';
import styles from './rightActionBar.module.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Select from 'react-select';
import CustomSingleValue from './CustomSingleValue';
import LanguageOptions from './LanguageOptions';
import { languages } from '../../lib/constants/languages';
import { useAppContext } from '../../lib/context/app/appContext';
import { Language } from '../../interfaces/language';

const RightActionBar = () => {
  const { logout, langID } = useAppContext();
  const selectedLanguage: Language = useMemo(
    () => languages.find((lang: Language) => lang.id === langID),
    [langID]
  );

  return (
    <div className={styles.rightSidebar}>
      <div className={styles.languageSelector}>
        <Select
          instanceId="select-id"
          isSearchable={false}
          value={selectedLanguage}
          options={languages}
          components={{
            SingleValue: CustomSingleValue,
            Option: LanguageOptions
          }}
        />
      </div>
      <div className={styles.logoutWrapper}>
        <button onClick={logout} className={styles.btnLogout}>
          <FontAwesomeIcon icon="sign-out-alt" />
        </button>
      </div>
    </div>
  );
};

export default RightActionBar;
