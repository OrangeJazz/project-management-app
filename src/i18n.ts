import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
const storageLang = localStorage.getItem('lang')?.toLocaleLowerCase() || 'en';

i18n.use(initReactI18next).init({
  debug: false,
  fallbackLng: storageLang,
  interpolation: {
    escapeValue: false,
  },
  resources: {
    en: {
      translation: {
        header: {
          signin: 'Sign In',
          signoup: 'Sign Up',
          signout: 'Sign Out',
          boards: 'Boards',
          create: '+ Create new board',
          edit: 'Edit Profile',
        },
        hero: {
          title: 'Best helper for organize your work',
          desc1:
            'RS Task is a simple application gives teams everything they need to stay in sync, hit deadlines, and reach their goals. It is adaptable, flexible tool for planning and tracking work.',
          desc2: 'Organize your work in different wonderful projects with RS Task!',
          btn1: 'Start',
          btn2: 'Learn more >',
        },
        features: {
          title: 'Save your time with RS Task',
        },
        team: {
          title: 'Our team',
        },
        sign: {
          title1: 'Sign In',
          title2: 'Sign Up',
          name: 'Name',
          login: 'Login',
          pass: 'Password',
          btn: 'Submit',
          already: 'If you already have an account, you can sign in here',
          noacc: 'If you don not have an account, you can sign up here',
          edit: 'Save changes',
          delete: 'Delete account',
        },
        footer: {
          alex: 'Alexander Omelchuk',
          maria: 'Mariya Vasileva',
          aleksei: 'Aleksei Pepeliaev',
        },
        errors: {
          pagebtn: 'To Main Page',
          empty: 'Should not be empty',
          login: 'Should contain at least 4 characters',
          pass: 'Should contain at least 6 characters',
        },
      },
    },
    ru: {
      translation: {
        header: {
          signin: 'Войти',
          signoup: 'Регистрация',
          signout: 'Выйти',
          boards: 'Доски',
          create: '+ Создать новую доску',
          edit: 'Профиль',
        },
        hero: {
          title: 'Лучший помощник для организации вашей работы',
          desc1:
            'RS Task это простое приложение, которое дает командам все необходимое для синхронизации, соблюдения сроков и достижения целей. Это адаптируемый, гибкий инструмент для планирования и отслеживания работы.',
          desc2: 'Организуйте свою работу в разных замечательных проектах с RS Task!',
          btn1: 'Старт',
          btn2: 'Узнай больше >',
        },
        features: {
          title: 'Экономьте свое время с RS Task',
        },
        sign: {
          title1: 'Войти',
          title2: 'Регистрация',
          name: 'Имя',
          login: 'Логин',
          pass: 'Пароль',
          btn: 'Отправить',
          already: 'Если у вас уже есть аккаунт, вы можеть войту тут',
          noacc: 'Если у вас нет аккаунт, вы можеть зарегистрироваться тут',
          edit: 'Сохранить изменения',
          delete: 'Удалить аккаунт',
        },
        team: {
          title: 'Наша команда',
        },
        errors: {
          pagebtn: 'На Главную Страницу',
          empty: 'Не должно быть пусто',
          login: 'Дожно быть как минимум 4 символа',
          pass: 'Дожно быть как минимум 6 символов',
        },
        footer: {
          alex: 'Александр Омельчук',
          maria: 'Мария Васильева',
          aleksei: 'Алексей Пепеляев',
        },
      },
    },
  },
});

export default i18n;
