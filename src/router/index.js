import { createRouter, createWebHistory, createWebHashHistory } from 'vue-router'

import Login from '../views/Auth/Login.vue'
import Register from '../views/Auth/Register.vue'
import Inbox from '../views/inbox/Inbox.vue'
import PrimeiraPagina from '../views/PrimeiraPagina.vue'
import ProjetosListV2 from '../views/projetos/ProjetosListV2.vue'
import Inspiracao from '../views/projetos/Inspiracao.vue'
import Tarefas from '../views/tarefas/Tarefas.vue'
import HabitosAntigo from '../views/habitos/HabitosAntigo.vue'
import HabitosMensal from '../views/habitos/HabitosMensal.vue'
import Habitos from '../views/habitos/Habitos.vue'
import Invitations from '../views/Invitations.vue'
import Configuracoes from '../views/Configuracoes.vue'
import Backup from '../views/Backup.vue'
import Historicos from '../views/Historicos/Historicos.vue'

import Posts from '../views/Post/Posts.vue'
import Post from '../views/Post/Post.vue'
import Criar from '../views/Post/Criar.vue'

const router = createRouter({
  history: createWebHashHistory(import.meta.env.BASE_URL),
  routes: [
    // {
    //   path: '/about',
    //   name: 'about',
    //   // route level code-splitting
    //   // this generates a separate chunk (About.[hash].js) for this route
    //   // which is lazy-loaded when the route is visited.
    //   component: () => import('../views/AboutView.vue')
    // },
    {
      path: '/posts',
      name: 'Posts',
      component: Posts,
      props: true
    },
    {
      path: '/posts/criar',
      name: 'Criar',
      component: Criar,
      props: true
    },
    {
      path: '/posts/post/:idPost',
      name: 'Post',
      component: Post,
      props: true
    },
    {
      path: '/inbox',
      name: 'Inbox',
      component: Inbox,
      props: true
    },
    {
      path: '/primeiraPagina',
      name: 'PrimeiraPagina',
      component: PrimeiraPagina,
      props: true
    },
    {
      path: '/projetosListV2',
      name: 'ProjetosListV2',
      component: ProjetosListV2,
      props: true
    },
    {
      path: '/projetosListV2/projeto/:idProjeto',
      name: 'Projeto',
      component: ProjetosListV2,
      props: true
    },
    {
      path: '/inspiracao',
      name: 'Inspiracao',
      component: Inspiracao,
      props: true
    },
    {
      path: '/tarefas',
      name: 'Tarefas',
      component: Tarefas,
      props: true
    },
    {
      path: '/historicos',
      name: 'Historicos',
      component: Historicos,
      props: true
    },
    {
      path: '/habitTracker',
      name: 'HabitTracker',
      component: Habitos,
      props: true
    },
    {
      path: '/habitTrackerMensal',
      name: 'HabitTrackerMensal',
      component: HabitosMensal,
      props: true
    },
    {
      path: '/editarHabitos',
      name: 'HabitTrackerAntigo',
      component: HabitosAntigo,
      props: true
    },
    {
      path: '/',
      name: 'Login',
      component: Login
    },
    {
      path: '/register',
      name: 'Register',
      component: Register
    },
    {
      path: '/invitations',
      name: 'Invitations',
      component: Invitations
    },
    {
      path: '/configuracoes',
      name: 'Configuracoes',
      component: Configuracoes
    },
    {
      path: '/backup',
      name: 'backup',
      component: Backup
    },
    // {
    //   path: '/listaContas',
    //   name: 'listaContas',
    //   component: ListaContas
    // },
    // {
    //   path: '/listaMovimentos/:idConta',
    //   name: 'listaMovimentos',
    //   component: ListaMovimentos,
    //   props: true
    // }
  ]
})

export default router
