import { IHeaderButton } from './modules/shared';
import { ICardTeam } from './modules/welcome/components';

export const CARD_TEAM: ICardTeam[] = [
  {
    hrefPerson: 'https://github.com/rydvone',
    srcPerson: '../../../assets/images/photo-alexander.jpg',
    namePerson: 'Alexander Verbitsky',
    subTitlePerson: 'Team lead',
    donePerson:
      'Lorem ipsum dolor sit amet consectetur adipisicing elit. Id assumenda voluptatum pariatur accusamus consectetur. Error tenetur, velit vero corporis ex cum sed molestias fuga quidem libero temporibus voluptate dolore est?',
  },
  {
    hrefPerson: 'https://github.com/OksanaSeregina',
    srcPerson: '../../../assets/images/photo-oksana.jpg',
    namePerson: 'Oksana Seregina',
    subTitlePerson: '',
    donePerson:
      'Lorem ipsum dolor sit amet consectetur adipisicing elit. Id assumenda voluptatum pariatur accusamus consectetur. Error tenetur, velit vero corporis ex cum sed molestias fuga quidem libero temporibus voluptate dolore est?',
  },
  {
    hrefPerson: 'https://github.com/lelek337',
    srcPerson: '../../../assets/images/photo-ivan.jpg',
    subTitlePerson: '',
    namePerson: 'Ivan Hubarau',
    donePerson:
      'Lorem ipsum dolor sit amet consectetur adipisicing elit. Id assumenda voluptatum pariatur accusamus consectetur. Error tenetur, velit vero corporis ex cum sed molestias fuga quidem libero temporibus voluptate dolore est?',
  },
];

// TODO: Updates routes
export const HEADER_BUTTONS: IHeaderButton[] = [
  {
    isVisibleForUser: false,
    icon: 'exit_to_app',
    value: 'login',
    route: 'auth',
  },
  {
    isVisibleForUser: true,
    icon: 'add',
    value: 'newboard',
    route: '',
  },
  {
    isVisibleForUser: true,
    icon: 'edit',
    value: 'editprofile',
    route: 'user',
  },
  {
    isVisibleForUser: false,
    icon: 'person_add',
    value: 'signup',
    route: 'auth',
  },
  {
    isVisibleForUser: true,
    icon: 'exit_to_app',
    value: 'logout',
    route: 'welcome',
  },
];
