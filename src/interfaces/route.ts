import { IconProp } from '@fortawesome/fontawesome-svg-core';

export interface RouteObject {
  path: string;
  name: string;
  icon?: IconProp;
  exact: boolean;
  menu: boolean;
}
