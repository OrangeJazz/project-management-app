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
        team: {
          title: 'Our team',
        },
        footer: {
          alex: 'Alexander Omelchuk',
          maria: 'Mariya Vasileva',
          aleksei: 'Aleksei Pepeliaev',
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
          create2: '+ Создать',
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
        team: {
          title: 'Наша команда',
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
