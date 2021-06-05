import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { FC } from 'react';
import { User } from '../../interfaces/user';
import { useTranslation } from 'next-i18next';
import Link from 'next/link';
import { mutateMany } from '../../lib/utils/cache';
import { deleter } from '../../lib/utils/fetcher';
import { API_URL } from '../../lib/utils/constant';
import withReactContent, { ReactSweetAlert } from 'sweetalert2-react-content';
import Swal from 'sweetalert2';
import swal from 'sweetalert2';
import { removeEmpty } from '../../lib/utils/apiUtils';
import { useRouter } from 'next/router';

type TableBodyProps = {
  users: User[];
};

type SweetAlert2 = typeof swal;

const TableBody: FC<TableBodyProps> = ({ users }) => {
  const { t } = useTranslation();
  const swalInstance: SweetAlert2 & ReactSweetAlert = withReactContent(Swal);
  const router = useRouter();
  const { page, userId, userFirstName, userLastName, userEmail } = router.query;

  const deleteUserFn = async (id: number) => {
    const { value } = await swalInstance.fire({
      title: t('commons.delete_title'),
      text: t('commons.cant_revert'),
      confirmButtonText: t('commons.accept_delete'),
      cancelButtonText: t('commons.cancel'),
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      reverseButtons: true
    });

    if (value) {
      await deleter(`${API_URL}/api/users/${id}`, 'delete');
      await mutateMany(
        (key) => key.includes('/api/users'),
        () => undefined
      );
    }
  };

  return (
    <>
      {users.map((user: User, index: any) => (
        <tr key={'users_' + index}>
          <td>{user.id}</td>
          <td>{user.firstName}</td>
          <td>{user.lastName}</td>
          <td>{user.email}</td>
          <td className="text-center actions-td">
            <Link
              href={{
                pathname: '/users/' + user.id,
                query: removeEmpty({
                  page,
                  userId,
                  userFirstName,
                  userLastName,
                  userEmail
                })
              }}
            >
              <a className="btn btn-sm btn-primary">
                <FontAwesomeIcon icon="edit" />
              </a>
            </Link>
            <button
              onClick={() => deleteUserFn(user.id)}
              className="btn btn-sm btn-danger"
            >
              <FontAwesomeIcon icon="trash-alt" />
            </button>
          </td>
        </tr>
      ))}
    </>
  );
};

export default TableBody;
