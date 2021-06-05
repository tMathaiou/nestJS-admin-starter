import React, { FC, useMemo } from 'react';
import { Field } from 'react-final-form';
import { useTranslation } from 'next-i18next';

type Props = {
  onSubmit: () => any;
};

const UserForm: FC<Props> = ({ onSubmit }) => {
  const { t } = useTranslation();
  const fields = useMemo(
    () => [
      {
        id: 'firstName',
        title: t('commons.firstName')
      },
      {
        id: 'lastName',
        title: t('commons.lastName')
      },
      {
        id: 'email',
        title: t('commons.email')
      },
      {
        id: 'password',
        title: t('commons.password'),
        type: 'password'
      },
      {
        id: 'confirmPassword',
        title: t('commons.confirmPassword'),
        type: 'password'
      }
    ],
    [t]
  );
  return (
    <form id="userForm" onSubmit={onSubmit}>
      <div className="form-group row">
        {fields.map((field) => (
          <Field name={field.id} key={field.id}>
            {({ input, meta }) => (
              <div className="col-lg-6 col-xl-6">
                <label htmlFor={field.id} className="col-form-label">
                  {field.title}
                </label>
                <input
                  {...input}
                  id={field.id}
                  type={field.type || 'text'}
                  name={field.id}
                  placeholder={field.title}
                  className={
                    meta.error && meta.touched
                      ? 'form-control has-error'
                      : 'form-control'
                  }
                />
                {meta.error && meta.touched && (
                  <span className="error-feed">{meta.error}</span>
                )}
              </div>
            )}
          </Field>
        ))}
      </div>
    </form>
  );
};

export default UserForm;
