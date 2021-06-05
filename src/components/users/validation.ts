import { User } from '../../interfaces/user';
import { TFunction } from 'i18next';

export const validate = (values: User, t: TFunction, id?: any) => {
  const errors = {} as User;
  const emailRegex =
    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  const requiredTranslation = t('validations.required');
  const emailInvalidTranslation = t('validations.email');
  const minLengthTranslation = t('validations.minLength');
  const confirmPasswordTranslation = t('validations.confirmPassword');

  if (!values.firstName) {
    errors.firstName = requiredTranslation;
  }

  if (!values.lastName) {
    errors.lastName = requiredTranslation;
  }

  if (!values.email) {
    errors.email = requiredTranslation;
  } else if (!values.email.match(emailRegex)) {
    errors.email = emailInvalidTranslation;
  }

  if (!values.password && !id) {
    errors.password = requiredTranslation;
  } else if (values.password?.length < 6) {
    errors.password = minLengthTranslation;
  }

  if (!values.confirmPassword && !id) {
    errors.confirmPassword = requiredTranslation;
  } else if (values.confirmPassword !== values.password) {
    errors.confirmPassword = confirmPasswordTranslation;
  }

  return errors;
};
