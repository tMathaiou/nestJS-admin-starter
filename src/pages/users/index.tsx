import React, { FC, useEffect, useReducer, useState } from 'react';
import { parseCookies, removeEmpty } from '../../lib/utils/apiUtils';
import { isAuthorized } from '../../lib/utils/serverUtils';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { User } from '../../interfaces/user';
import { List } from '../../interfaces/list';
import useAppDefaults from '../../lib/hooks/appDefaults.hook';
import styles from './users.module.css';
import TableActionHeader from '../../components/users/TableActionHeader';
import TableHeader from '../../components/users/TableHeader';
import TableBody from '../../components/users/TableBody';
import ReactPaginate from 'react-paginate';
import { useTranslation } from 'next-i18next';
import { useFetchUsers } from '../../lib/hooks/fetchUsers.hook';
import { UserFilters } from '../../interfaces/userFilters';
import { useRouter } from 'next/router';
import fetcher from '../../lib/utils/fetcher';
import { API_URL } from '../../lib/utils/constant';
import { constructQueryParams } from '../../lib/utils/constructQueryParams';

type UserProps = {
  cookieData: any;
  dataUsers: User[];
  dataFilters: UserFilters;
  dataTotalElements: number;
  dataPage: number;
};

const UserPage: FC<UserProps> = ({
  dataUsers,
  cookieData,
  dataPage,
  dataTotalElements,
  dataFilters
}) => {
  const { t } = useTranslation();
  const { push, pathname, query } = useRouter();
  const [firstRender, setFirstRender] = useState(true);
  const setAppDefaults = useAppDefaults();
  const limit = 20;
  const [{ filters, page }, setState] = useReducer(
    (state, newState) => {
      if (!firstRender) {
        const {
          page,
          filters: { userId, userFirstName, userLastName, userEmail }
        }: { page: number; filters: UserFilters } = { ...state, ...newState };
        const newQuery = {
          userId,
          userFirstName,
          userLastName,
          userEmail,
          page
        };

        push({
          pathname,
          query: removeEmpty({
            ...query,
            ...newQuery
          })
        });
      }

      return { ...state, ...newState };
    },
    {
      filters: dataFilters,
      page: dataPage
    }
  );

  const { totalElements, users } = useFetchUsers(
    {
      page,
      limit,
      filters
    },
    { dataUsers, dataTotalElements },
    firstRender
  );

  const onPageChange = ({ selected }: { selected: number }) =>
    setState({ page: selected + 1 });

  useEffect(() => {
    setAppDefaults(cookieData);
  }, [cookieData]);

  useEffect(() => {
    setFirstRender(false);
  }, []);

  return (
    <div className="users">
      <div className="row">
        <div className="col-md-12">
          <div className={styles.portlet}>
            <div className={styles.portletBody}>
              <TableActionHeader />
              <div className="table-responsive">
                <table className={`${styles.table} table`}>
                  <thead>
                    <TableHeader filters={filters} setState={setState} />
                  </thead>
                  <tbody>
                    <TableBody users={users} />
                  </tbody>
                </table>
                <div className="text-right">
                  <ReactPaginate
                    previousLabel={t('commons.prev')}
                    nextLabel={t('commons.next')}
                    marginPagesDisplayed={2}
                    pageRangeDisplayed={5}
                    forcePage={page - 1}
                    pageCount={Math.ceil(totalElements / limit)}
                    containerClassName={'pagination'}
                    onPageChange={onPageChange}
                    activeClassName={'active'}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export const getServerSideProps = async ({ locale, req, query }) => {
  let dataUsers = [];
  let dataTotalElements = 0;
  const cookies = parseCookies(req);

  if (!isAuthorized(req)) {
    return {
      redirect: {
        destination: '/login',
        permanent: false
      }
    };
  }
  const dataPage = query.page || 1;
  const filters = {
    userId: query.userId || '',
    userFirstName: query.userFirstName || '',
    userLastName: query.userLastName || '',
    userEmail: query.userEmail || ''
  };

  const list: List<User> = await fetcher(
    `${API_URL}/api/users${constructQueryParams({
      page: dataPage,
      limit: 20,
      ...filters
    })}`,
    cookies.token
  );

  if (list) {
    dataUsers = list.rows;
    dataTotalElements = list.count;
  }

  return {
    props: {
      dataFilters: filters,
      dataUsers,
      dataTotalElements,
      dataPage,
      cookieData: cookies && cookies,
      ...(await serverSideTranslations(locale, ['common']))
    }
  };
};

export default UserPage;
