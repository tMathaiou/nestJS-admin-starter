import React, { ChangeEvent, FC, useState } from 'react';
import { useTranslation } from 'next-i18next';
import { UserFilters } from '../../interfaces/userFilters';
import { DEBOUNCE_TIME } from '../../lib/utils/constant';
import { useDebouncedEffect } from '../../lib/hooks/debounce.hook';

type TableHeaderProps = {
  filters: UserFilters;
  setState: ({ filters, page }: { filters: UserFilters; page: number }) => void;
};
const TableHeader: FC<TableHeaderProps> = ({ setState, filters }) => {
  const { t } = useTranslation();
  const [stateFilters, setStateFilters] = useState(filters);
  const [initialRender, setInitialRender] = useState(true);

  useDebouncedEffect(
    () => {
      if (initialRender) {
        setInitialRender(false);
        return;
      }
      setState({ filters: stateFilters, page: 1 });
    },
    [stateFilters],
    DEBOUNCE_TIME
  );

  const onChange = (e: ChangeEvent<HTMLInputElement>, key: string) => {
    setStateFilters({ ...stateFilters, [key]: e.target.value });
  };

  const clearFilters = () => {
    if (
      !filters.userId &&
      !filters.userEmail &&
      !filters.userFirstName &&
      !filters.userLastName
    ) {
      return;
    }

    setStateFilters({
      userId: '',
      userFirstName: '',
      userLastName: '',
      userEmail: ''
    });

    setState({
      filters: {
        userId: '',
        userFirstName: '',
        userLastName: '',
        userEmail: ''
      },
      page: 1
    });
  };

  return (
    <>
      <tr>
        <th>{t('commons.id')}</th>
        <th>{t('commons.firstName')}</th>
        <th>{t('commons.lastName')}</th>
        <th>{t('commons.email')}</th>
        <th className="text-center">{t('commons.actions')}</th>
      </tr>
      <tr>
        {Object.keys(stateFilters).map((key, index) => (
          <td key={'key_' + index}>
            <input
              className="form-control"
              type="text"
              onChange={(e) => onChange(e, key)}
              value={stateFilters[key]}
            />
          </td>
        ))}
        <td className="text-center">
          <button onClick={clearFilters} className="btn btn-sm btn-primary">
            {t('commons.clear_filters')}
          </button>
        </td>
      </tr>
    </>
  );
};

export default TableHeader;
