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
        popapBtn: {
          Ok: 'Ok',
          Cancel: 'Cancel',
        },
        errors: {
          pagebtn: 'To Main Page',
          empty: 'Should not be empty',
          login: 'Should contain at least 4 characters',
          pass: 'Should contain at least 6 characters',
          taskTitEmpty: 'Please, input task title',
          taskDescEmpty: 'Please, input task description',
          longtext: 'Be more concise',
        },
        boardPage: {
          title: 'Your Projects',
        },
        taskPage: {
          title: 'Project',
        },
        tasks: {
          description: 'Description',
          autor: 'Autor',
          responsibles: 'Responsible users',
          complite: 'Complite',
        },
        boards: {
          addbtn: ' Add New Project',
        },
        search: {
          search: 'Search',
          placeHolder: 'Enter Project Name...',
        },
        boardPopap: {
          createTitle: 'Add New Project',
          editTitle: 'Edit Project',
          projectTitle: 'Project Title',
          projectDesc: 'Project description',
        },
        columnPopap: {
          createTitle: 'Create column',
          editTitle: 'Edit column',
          columnTitle: 'Column title',
          columnTitlePlaceHolder: 'input column title',
        },
        taskPopap: {
          createTitle: 'Create task',
          editTitle: 'Edit task',
          taskTitle: 'Task title',
          taskDesc: 'Task description',
          responsibles: 'Responsible users',
          taskTitlePlaceHolder: 'input task title',
          taskDescPlaceHolder: 'input task description',
        },
        confirmPopap: {
          confirmMessage: 'A you sure?',
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
          taskTitEmpty: 'Введите назавание задачи',
          taskDescEmpty: 'Введите описание задачи',
          longtext: 'Будте лаконичнее',
        },
        footer: {
          alex: 'Александр Омельчук',
          maria: 'Мария Васильева',
          aleksei: 'Алексей Пепеляев',
        },
        popapBtn: {
          Ok: 'Ок',
          Cancel: 'Отмена',
        },
        boardPage: {
          title: 'Ваши проекты',
        },
        taskPage: {
          title: 'Проект',
        },
        tasks: {
          description: 'Описание',
          autor: 'Создатель',
          responsibles: 'Ответственные лица',
          complite: 'Завершить',
        },
        boards: {
          addbtn: 'Добавить проект',
        },
        search: {
          search: 'Поиск',
          placeHolder: 'Введите название проекта...',
        },
        boardPopap: {
          createTitle: 'Создать новый проект',
          editTitle: 'Изменить проект',
          projectTitle: 'Название',
          projectDesc: 'Описание',
        },
        columnPopap: {
          createTitle: 'Создать колонку',
          editTitle: 'Изменить колонку',
          columnTitle: 'Название',
          columnTitlePlaceHolder: 'Введите название колонки',
        },
        taskPopap: {
          createTitle: 'Создать задачу',
          editTitle: 'Изменить задачу',
          taskTitle: 'Название',
          taskDesc: 'Описание',
          responsibles: 'Ответственные лица',
          taskTitlePlaceHolder: 'Введите название задачи',
          taskDescPlaceHolder: 'Введите описание задачи',
        },
        confirmPopap: {
          confirmMessage: 'Вы уверены?',
        },
      },
    },
  },
});

export default i18n;
