import { i18n, Resource } from 'i18next';
import { Payload } from 'payload';

import { Locale } from '@shared/i18n';

export enum Namespace {
  Common = 'common',
  Account = 'account',
  Cart = 'cart',
  Profile = 'profile',
  Orders = 'orders',
  LoyaltyProgram = 'loyaltyProgram',
  Validation = 'validation',
  Footer = 'footer',
  SignIn = 'signIn',
  SignUp = 'signUp',
  ForgotPassword = 'forgotPassword',
  ResetPassword = 'resetPassword',
  ArticlesGroup = 'articlesGroup',
  Blog = 'blog',
  Recipes = 'recipes',
  NotFound = 'notFound',
  SubscribeForm = 'subscribeForm',
  Checkout = 'checkout',
  Product = 'product',
  Home = 'home',
  Shop = 'shop',
  NewIn = 'newIn',
}

export type BaseI18nProps = {
  locale: Locale;
  ns?: Namespace | Namespace[];
  resources?: Resource;
};

export type GetI18nProps = BaseI18nProps & {
  ns: Required<BaseI18nProps>['ns'];
  i18n?: i18n;
  localApi?: Payload;
};

export type I18nReturn = {
  i18n: i18n;
  ns: Namespace | Namespace[];
  resources: Resource;
  t: i18n['t'];
};

export type GetI18n = (props: GetI18nProps) => Promise<I18nReturn>;
export type UseI18n = (props: BaseI18nProps) => I18nReturn;
