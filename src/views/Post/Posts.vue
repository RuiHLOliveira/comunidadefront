<style scoped>

/* gemini deixei de usar */
.post {
  background-color: var(--darkmode-bg-color-box);
  padding: 20px;
  max-width: 400px;
  margin: 0 auto;
  margin-bottom: 40px;
}
/* gemini deixei de usar */
.postNomeBox {
  text-align: center;
  border-bottom: 1px solid var(--darkmode-border-gray);
}
/* gemini deixei de usar */
.postNome{
  font-size: 1.1rem;
}
/* gemini deixei de usar */
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
/* gemini deixei de usar */
.verMaisBox {
  border-top: 1px solid var(--darkmode-border-gray);
  margin-top: 10px;
  padding-top: 10px;
}

/* NOVAS CLASSES GEMINI - IDENTIDADE MODERN SCHOLAR */

.gemini-page-header {
  background: linear-gradient(135deg, #18181e 0%, #21212e 100%);
  border-bottom: 1px solid rgba(255, 255, 255, 0.03);
  width: 100%;
}

.gemini-header-content {
  max-width: 1300px;
  margin: 0 auto;
  padding: 0 24px;
}

.gemini-posts-container {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(320px, 1fr));
  gap: 32px;
  padding: 40px 24px;
  max-width: 1300px;
  margin: 0 auto;
}

.gemini-post-card {
  background: #262631;
  border-radius: 12px;
  transition: all 0.3s ease;
  border: 1px solid rgba(255, 255, 255, 0.05);
  display: flex;
  flex-direction: column;
  height: 100%;
  position: relative;
  overflow: hidden;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);
}

.gemini-post-card:hover {
  border-color: rgba(68, 77, 175, 0.4);
  box-shadow: 0 8px 20px rgba(0, 0, 0, 0.3);
  background: #2c2c39;
}

.gemini-post-card::before {
  content: "";
  position: absolute;
  left: 0;
  top: 0;
  bottom: 0;
  width: 4px;
  background: #444daf;
  opacity: 0.6;
}

.gemini-post-header {
  padding: 24px 24px 12px 24px;
  background: rgba(255, 255, 255, 0.02);
}

.gemini-post-title {
  font-size: 1.3rem;
  font-weight: 700;
  color: #fff;
  line-height: 1.3;
}

.gemini-post-body {
  padding: 12px 24px 24px 24px;
  flex-grow: 1;
  font-size: 0.95rem;
  line-height: 1.7;
  color: var(--darkmode-font-color-secondary);
  overflow: hidden;
  display: -webkit-box;
  -webkit-line-clamp: 4;
  -webkit-box-orient: vertical;
}

.gemini-post-footer {
  padding: 0 24px 24px 24px;
  display: flex;
  justify-content: flex-end;
}

/* CLASSES QUE ERAM INLINE */

/* gemini classe era inline */
.inline-style-btn-create-post {
  line-height: 0; 
  display: inline-flex;
}

/* gemini deixei de usar */
.gemini-btn-create-post {
  background: #444daf;
  color: white;
  padding: 12px 24px;
  border-radius: 8px;
  font-weight: 600;
  transition: all 0.2s ease;
  border: none;
  display: inline-flex;
  align-items: center;
  gap: 10px;
  font-size: 0.95rem;
}

.gemini-btn-create-post:hover {
  background: #535bc9;
  box-shadow: 0 4px 15px rgba(68, 77, 175, 0.4);
}

/* gemini classe era inline */
.inline-style-btn-ver-mais {
  line-height: 0; 
  display: inline-flex;
}

/* gemini deixei de usar */
.gemini-btn-view-more {
  background: rgba(255, 255, 255, 0.05);
  color: #e0e0ff;
  padding: 10px 20px;
  border-radius: 8px;
  font-weight: 600;
  transition: all 0.2s ease;
  border: 1px solid rgba(255, 255, 255, 0.1);
  display: inline-flex;
  align-items: center;
  gap: 8px;
  font-size: 0.9rem;
  text-decoration: none;
  cursor: pointer;
}

.gemini-btn-view-more i {
  background: transparent !important;
  display: flex;
  align-items: center;
  justify-content: center;
}

.gemini-btn-view-more:hover {
  background: rgba(68, 77, 175, 0.2);
  border-color: rgba(68, 77, 175, 0.5);
  color: #fff;
}

</style>

<template>
  <div>
    <div>

      <div class="py-10 gemini-page-header">
        <div class="gemini-header-content">
          <!-- HEADER -->
          <section class="my-5 py-5 flex justify-spacebetween alignitens-center">
            <div class="flex alignitens-center">
              <h1 style="font-weight: 800; letter-spacing: -0.5px; font-size: 2.2rem;">Bem-vindo de volta, mentorado!</h1>
              <div>
                <router-link v-if="isAdmin" to='/posts/criar' class="btn ml-15 flex-center-combo gemini-btn-create-post">
                  <i class="fi fi-rr-plus"></i>
                  <span>Criar Post</span>
                </router-link>
              </div>
            </div>
            <div>
              <!-- ??? -->
            </div>
          </section>
        </div>
      </div>

      <div class="gemini-posts-container">
        <section v-if="posts != [] && !busyPostsLoad" style="display: contents;">

          <div v-for="post in posts" :key="post.id">
            <div class="gemini-post-card">
              <div class="gemini-post-header">
                <span class="gemini-post-title"> {{ post.nome }} </span>
              </div>
              <div class="gemini-post-body whitespace-pre" v-html="post.introducaoHtml">
              </div>
              <div class="gemini-post-footer">
                <router-link :to='getPostUrl(post)' class="flex-center-combo gemini-btn-view-more">
                  <span>Ver Mais</span>
                  <i class="fi fi-rr-arrow-right"></i>
                </router-link>
              </div>
            </div>
          </div>
        </section>

        <div class="my-5 py-5" v-if="busyPostsLoad" style="grid-column: 1 / -1;">
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
import UrlBuilder from '@/core/urlBuilder.js';
import AuthManager from '@/core/AuthManager.js';

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
