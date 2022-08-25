import BlankLayout from './BlankLayout';
import MainLayout from './MainLayout';

export type LayoutType = 'BlankLayout' | 'MainLayout';

export const LayoutOptions = {
  BLANK: 'BlankLayout',
  MAIN: 'MainLayout',
};

export const Layouts: { [key: string]: (_props: any) => JSX.Element } = {
  BlankLayout,
  MainLayout,
};
