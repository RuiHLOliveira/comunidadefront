<style scoped>

.post {
  background-color: var(--darkmode-bg-color-box);
  padding: 20px;
  max-width: 400px;
  margin: 0 auto;
  margin-bottom: 40px;
}
.postNomeBox {
  text-align: center;
  border-bottom: 1px solid var(--darkmode-border-gray);
}
.postNome{
  font-size: 1.1rem;
}
.postConteudo{
  height:     100px;
  max-height: 100px;
  overflow-y: hidden;
}
.comentariosBox {
  border-top: 1px solid var(--darkmode-border-gray);
  margin-top: 20px;
  padding-top: 20px;
}
.verMaisBox {
  border-top: 1px solid var(--darkmode-border-gray);
  margin-top: 10px;
  padding-top: 10px;
}

</style>

<template>
  <div>
    <div class="container">

      <div class="py-10 darkmodeBgBlack">
        <!-- HEADER -->
        <section class="my-5 py-5 px-10 flex justify-spacebetween alignitens-center">
          <div class="flex alignitens-center">
            <h1>Bem-vindo de volta, mentorado!</h1>
            <div>
              <router-link v-if="isAdmin" to='/posts/criar' class="btn ml-15 flex-center-combo" style="line-height: 0; display: inline-flex;">
                <i class="fi fi-rr-plus"></i>
                <span class="ml-5">Criar Post</span>
              </router-link>
            </div>
          </div>
          <div>
            <!-- ??? -->
          </div>
        </section>

      </div>

      <div>
        <section>

          <div v-if="posts != [] && !busyPostsLoad">

            <div v-for="post in posts" :key="post.id">
              <div class="post flex-column">
                <div class="postNomeBox pb-5 mb-20 ">
                  <span class="postNome"> {{ post.nome }} </span>
                </div>
                <div class="postConteudo whitespace-pre" v-html="post.introducaoHtml">
                </div>
                <div class="verMaisBox flex justify-end">
                  <router-link :to='getPostUrl(post)' class="btn btn-sm flex-center-combo" style="line-height: 0; display: inline-flex;">
                    <span class="mr-5">Ver Mais</span>
                    <i class="fi fi-rr-arrow-right"></i>
                  </router-link>
                </div>
              </div>
            </div>
          </div>
        </section>

        <div class="my-5 py-5" v-if="busyPostsLoad">
          <InlineLoader
            :textoAguarde="true"
            :busy="busyPostsLoad"
            :center="true">
          </InlineLoader>
        </div>
      </div>
  </div>

    <Notifier ref="notifier"></Notifier>

  </div>
</template>

<script>
import DateTime from '@/core/DateTime.js'
import Loader from '@/components/Loader.vue';
import InlineLoader from '@/components/InlineLoader.vue';
import Notifier from '@/components/Notifier.vue';
import { PostsStorage } from '@/core/storage/PostsStorage.js'
import { MdHtmlConverter } from '@/core/MdHtmlConverter.js'
import UrlBuilder from '@/core/UrlBuilder';
import AuthManager from '@/core/AuthManager';

export default {
  name: 'HabitTracker',
  components: {
    Loader,
    InlineLoader,
    Notifier,
  },
  inject: ['configuracoes'],
  data: () => {
    return {
      windowWidth: 0,
      windowHeight: 0,

      busyPostsLoad: false,

      posts: [],
    }
  },
  computed: {
    isSmallScreen() {
      return this.windowWidth < 800
    },
    isAdmin(){
      return AuthManager.isAdmin();
    },
  },
  methods: {
    
    /** 
     * FUNCOES HELPER IMPORTADAS
    */
    formatDevDate(dateObject){return DateTime.formatDevDate(dateObject);},
    formatBrDate(dateObject){return DateTime.formatBrDate(dateObject);},
    getWeekDay(dateObject){return DateTime.getWeekDay(dateObject);},
    getWeekDayFirstLetter(dateObject){return DateTime.getWeekDayFirstLetter(dateObject);},
    getYear(dateObject){return DateTime.getYear(dateObject);},
    getMonth(dateObject){return DateTime.getMonth(dateObject);},
    getDate(dateObject){return DateTime.getDate(dateObject);},
    getWeekDayNumber(dateObject){return DateTime.getWeekDayNumber(dateObject);},
    newDatetimeTz(dateString){return DateTime.newDatetimeTz(dateString);},
    isSameYMD(date1, date2){return DateTime.isSameYMD(date1, date2);},

    getPostUrl(projeto) {
      return UrlBuilder.getPostUrl(projeto);
    },
    // listar posts
    // link para post

    buscaPosts () {
      this.busyPostsLoad = true;
      PostsStorage.index()
      .then(([response, data]) => {
        console.log({data});
        data.forEach(post => {
          post.introducaoHtml = MdHtmlConverter.convert(post.introducao);
          post.conteudoHtml = MdHtmlConverter.convert(post.conteudo);
        });
        this.posts = data
        this.busyPostsLoad = false;
      })
      .catch((error) => {
        this.busyPostsLoad = false;
        this.$refs.notifier.notify(`Ocorreu um erro: ${error}`, true)
        console.error(error);
      });
    },
    
    getDimensions() {
      this.windowWidth = document.documentElement.clientWidth;
      this.windowHeight = document.documentElement.clientHeight;
    },

  },
  watch: {
    configuracoes(a, b) {
      // do something
    },
    $route (to, from){
    }
  },
  mounted() {
    window.addEventListener('resize', this.getDimensions);
    this.getDimensions()
  },
  unmounted() {
    window.removeEventListener('resize', this.getDimensions);
  },
  created () {
    this.buscaPosts(true);
    // this.buscaTags();
  },
}
</script>
