<style scoped>

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
.curso:hover {
  background-color: var(--darkmode-bg-color-box-hover);
  width: 320px;
  /* height: 420px; */
  margin-right: 10px;
  margin-left:  10px;
  padding-right:  40px;
  padding-left:  40px;
}
.cursoNome{
  margin-bottom: 20px;
  text-align: center;
}

</style>

<template>
  <div>
    <div class="container">

      <div class="position_sticky py-10 div_border_bottom_gray darkmodeBgBlack">
        <!-- HEADER -->
        <section class="my-5 py-5 px-10 flex justify-spacebetween alignitens-center">
          <div class="flex alignitens-center">
            <h1>Bem-vindo de volta, patrão!</h1>
            <div>
              <router-link to='/cursos/criar' class="btn ml-15 flex-center-combo" style="line-height: 0; display: inline-flex;">
                <i class="fi fi-rr-plus"></i>
                <span class="ml-5">Criar Curso</span>
              </router-link>
            </div>
          </div>
          <div>
            ???
          </div>
        </section>

      </div>

      <div>
        <section>

          <div v-if="cursos != [] && !busyCursosLoad" class="flex-wrap">

            <div v-for="curso in cursos" :key="curso.id">
              <div class="curso flex-column" @click="goToCurso(curso)">
                <div class="cursoNome">
                  <h1> {{ curso.nome }} </h1>
                </div>
              </div>
            </div>
          </div>
        </section>

        <div class="my-5 py-5" v-if="busyCursosLoad">
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
import UrlBuilder from '../../core/urlBuilder';

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
        console.log({data});
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
