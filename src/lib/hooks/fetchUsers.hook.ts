import { UserFilters } from '../../interfaces/userFilters';
import useSWR, { cache } from 'swr';
import { API_URL } from '../utils/constant';
import { constructQueryParams } from '../utils/constructQueryParams';
import fetcher from '../utils/fetcher';
import { User } from '../../interfaces/user';
import { SWRConfiguration } from 'swr/dist/types';

let oldData = { rows: [], count: 0 };
export function useFetchUsers(
  {
    page,
    limit,
    filters
  }: {
    page: number;
    limit: number;
    filters: UserFilters;
  },
  {
    dataUsers,
    dataTotalElements
  }: { dataUsers: User[]; dataTotalElements: number },
  firstRender: boolean
) {
  const url = `${API_URL}/api/users${constructQueryParams({
    page,
    limit,
    ...filters
  })}`;

  const options: SWRConfiguration = { revalidateOnFocus: false };

  if (firstRender) {
    options.initialData = { rows: dataUsers, count: dataTotalElements };
    cache.set(url, options.initialData);
  }

  const { data, error } = useSWR(url, fetcher, options);

  if (data?.rows) {
    oldData.rows = data.rows;
    oldData.count = data.count;
  }

  return {
    users: data?.rows || oldData.rows,
    totalElements: data?.count || oldData.count,
    isLoading: !error && !data,
    isError: error
  };
}

export function useFetchUser(id, user: User) {
  const url = `${API_URL}/api/users/${id}`;

  const { data, error } = useSWR(url, fetcher, { initialData: user });

  return {
    user: data,
    isLoading: !error && !data,
    isError: error
  };
}
