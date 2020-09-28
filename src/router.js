import { createRouter, createWebHistory } from 'vue-router';

import TeamsList from './components/teams/TeamsList.vue';
import UsersList from './components/users/UsersList.vue';
import TeamMembers from './components/teams/TeamMembers.vue';
import NotFound from './components/nav/NotFound.vue';
import TeamsFooter from './components/teams/TeamsFooter';
import UsersFooter from './components/users/UsersFooter';

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: '/',
      redirect: '/teams'
    },
    {
      name: 'teams',
      path: '/teams',
      components: { default: TeamsList, footer: TeamsFooter },
      children: [
        {
          name: 'team-members',
          path: '/teams/:teamID',
          component: TeamMembers,
          props: true
        }
      ]
    },
    {
      path: '/users',
      components: { default: UsersList, footer: UsersFooter },
      beforeEnter(to, from, next) {
        console.log('Users beforeEnter');
        console.log(to, from);
        next();
      }
    },
    {
      path: '/:notFound(.*)',
      component: NotFound
    }
  ],
  linkActiveClass: 'active',
  scrollBehavior(_, _2, savedPosition) {
    if (savedPosition) {
      return savedPosition;
    }
    return {
      left: 0,
      top: 0
    };
  }
});

router.beforeEach(function(to, from, next) {
  console.log('Global beforeEach');
  console.log(to, from);
  // if (to.name === 'team-members') {
  //   next();
  // } else {
  //   next({ name: 'team-members', params: { teamID: 't2' } });
  // }
  next();
});

router.afterEach(function(to, from) {
  console.log('Global afterEach');
  console.log(to, from);
});

export default router;
