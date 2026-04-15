<style scoped>

/* gemini deixei de usar */
.curso {
  background-color: var(--darkmode-bg-color-box);
  padding: 20px;
  margin-top: 40px;
  margin-right: 20px;
  margin-left:  20px;
  width: 300px;
  height: 400px;
  cursor: pointer;
  transition-duration: 200ms;
}
/* gemini deixei de usar */
.curso:hover {
  background-color: var(--darkmode-bg-color-box-hover);
  width: 320px;
  /* height: 420px; */
  margin-right: 10px;
  margin-left:  10px;
  padding-right:  40px;
  padding-left:  40px;
}
/* gemini deixei de usar */
.cursoNome{
  margin-bottom: 20px;
  text-align: center;
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

.gemini-cursos-container {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(320px, 1fr));
  gap: 32px;
  padding: 40px 24px;
  max-width: 1300px;
  margin: 0 auto;
}

.gemini-curso-card {
  background: #262631;
  border-radius: 12px;
  transition: all 0.3s ease;
  border: 1px solid rgba(255, 255, 255, 0.05);
  display: flex;
  flex-direction: column;
  height: 280px; /* Altura fixa para cursos para manter grid limpo */
  position: relative;
  overflow: hidden;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);
  cursor: pointer;
}

.gemini-curso-card:hover {
  border-color: rgba(68, 77, 175, 0.4);
  box-shadow: 0 8px 20px rgba(0, 0, 0, 0.3);
  background: #2c2c39;
}

.gemini-curso-card::before {
  content: "";
  position: absolute;
  left: 0;
  top: 0;
  bottom: 0;
  width: 4px;
  background: #444daf;
  opacity: 0.6;
}

.gemini-curso-header {
  padding: 32px 24px;
  flex-grow: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;
  background: rgba(255, 255, 255, 0.01);
}

.gemini-curso-title {
  font-size: 1.5rem;
  font-weight: 700;
  color: #fff;
  line-height: 1.2;
}

.gemini-curso-footer {
  padding: 16px 24px;
  background: rgba(0, 0, 0, 0.1);
  display: flex;
  justify-content: flex-end;
  color: #444daf;
  font-weight: 600;
  font-size: 0.85rem;
  text-transform: uppercase;
  letter-spacing: 1px;
}

/* CLASSES QUE ERAM INLINE */

/* gemini classe era inline */
.inline-style-btn-create-curso {
  line-height: 0; 
  display: inline-flex;
}

.gemini-btn-create-curso {
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
  text-decoration: none;
}

.gemini-btn-create-curso:hover {
  background: #535bc9;
  box-shadow: 0 4px 15px rgba(68, 77, 175, 0.4);
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
              <h1 style="font-weight: 800; letter-spacing: -0.5px; font-size: 2.2rem;">Bem-vindo de volta, patrão!</h1>
              <div>
                <router-link to='/cursos/criar' v-if="isAdmin"
                  class="ml-15 flex-center-combo gemini-btn-create-curso">
                  <i class="fi fi-rr-plus"></i>
                  <span class="ml-5">Criar Curso</span>
                </router-link>
              </div>
            </div>
            <div>
              <!-- lateral -->
            </div>
          </section>
        </div>
      </div>

      <div class="gemini-cursos-container">
        <section v-if="cursos != [] && !busyCursosLoad" style="display: contents;">

          <div v-for="curso in cursos" :key="curso.id">
            <div class="gemini-curso-card" @click="goToCurso(curso)">
              <div class="gemini-curso-header">
                <span class="gemini-curso-title"> {{ curso.nome }} </span>
              </div>
              <div class="gemini-curso-footer">
                <span>Acessar Curso</span>
                <i class="fi fi-rr-arrow-right ml-5"></i>
              </div>
            </div>
          </div>
        </section>

        <div class="my-5 py-5" v-if="busyCursosLoad" style="grid-column: 1 / -1;">
          <InlineLoader
            :textoAguarde="true"
            :busy="busyCursosLoad"
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
import { CursosStorage } from '@/core/storage/CursosStorage.js'
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

      busyCursosLoad: false,

      cursos: [],
    }
  },
  computed: {
    isSmallScreen() {
      return this.windowWidth < 800
    },
    isAdmin() {
      return AuthManager.isAdmin()
    }
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

    getCursoUrl(curso) {
      let url = '/cursos/curso/' + curso.id;
      return url;
      // UrlBuilder.getCursoUrl(projeto);
    },

    goToCurso(curso) {
      this.$router.push({ path: this.getCursoUrl(curso) });
    },

    buscaCursos () {
      this.busyCursosLoad = true;
      CursosStorage.index()
      .then(([response, data]) => {
        data.forEach(curso => {
          // processamentos
        });
        this.cursos = data
        this.busyCursosLoad = false;
      })
      .catch((error) => {
        this.busyCursosLoad = false;
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
    this.buscaCursos(true);
    // this.buscaTags();
  },
}
</script>
