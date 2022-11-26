import { INavigateButton } from '../core';
import { ICardTeam } from '../modules/welcome';

export const CARD_TEAM: ICardTeam[] = [
  {
    hrefPerson: 'https://github.com/rydvone',
    srcPerson: '../../../assets/images/photo-alexander.jpg',
    namePerson: 'Alexander Verbitsky',
    subTitlePerson: 'Team lead',
    donePerson: 'card-team.alexander',
  },
  {
    hrefPerson: 'https://github.com/OksanaSeregina',
    srcPerson: '../../../assets/images/photo-oksana.jpg',
    namePerson: 'Oksana Seregina',
    subTitlePerson: 'Developer',
    donePerson: 'card-team.oksana',
  },
  {
    hrefPerson: 'https://github.com/lelek337',
    srcPerson: '../../../assets/images/photo-ivan.png',
    subTitlePerson: 'Developer',
    namePerson: 'Ivan Hubarau',
    donePerson: 'card-team.ivan',
  },
];

// TODO: Updates routes
export const HEADER_BUTTONS: INavigateButton[] = [
  {
    isVisibleForUser: false,
    icon: 'exit_to_app',
    value: 'header.login',
    route: 'auth/login',
  },
  {
    isVisibleForUser: true,
    icon: 'add',
    value: 'header.newboard',
    route: '',
  },
  {
    isVisibleForUser: true,
    icon: 'edit',
    value: 'header.editprofile',
    route: 'user',
  },
  {
    isVisibleForUser: false,
    icon: 'person_add',
    value: 'header.signup',
    route: 'auth/signup',
  },
  {
    isVisibleForUser: true,
    icon: 'exit_to_app',
    value: 'header.logout',
    route: '',
  },
];
