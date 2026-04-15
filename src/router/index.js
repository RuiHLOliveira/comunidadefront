import { createRouter, createWebHistory, createWebHashHistory } from 'vue-router'

import Login from '../views/Auth/Login.vue'
import Register from '../views/Auth/Register.vue'
import Perfil from '../views/Perfil.vue'
import Invitations from '../views/Invitations.vue'
import Configuracoes from '../views/Configuracoes.vue'
import Backup from '../views/Backup.vue'
import Posts from '../views/Post/Posts.vue'
import Post from '../views/Post/Post.vue'
import Criar from '../views/Post/Criar.vue'
import Cursos from '../views/Curso/Cursos.vue'
import Curso from '../views/Curso/Curso.vue'
import CursoCriar from '../views/Curso/CursoCriar.vue'
import Modulo from '../views/Curso/Modulo.vue'
import Aula from '../views/Curso/Aula.vue'

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

    // POSTS
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

    // CURSOS
    {
      path: '/cursos',
      name: 'Cursos',
      component: Cursos,
      props: true
    },
    {
      path: '/cursos/criar',
      name: 'CursoCriar',
      component: CursoCriar,
      props: true
    },
    {
      path: '/cursos/curso/:idCurso',
      name: 'Curso',
      component: Curso,
      props: true
    },

    // MODULO
    {
      path: '/modulos/modulo/:idModulo',
      name: 'Modulo',
      component: Modulo,
      props: true
    },

    // AULA
    {
      path: '/aulas/aula/:idAula',
      name: 'Aula',
      component: Aula,
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
      path: '/perfil',
      name: 'Perfil',
      component: Perfil
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
