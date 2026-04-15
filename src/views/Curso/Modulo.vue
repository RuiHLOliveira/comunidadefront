<style scoped>

/* gemini deixei de usar */
.breadcrumbs{
  background-color: var(--darkmode-bg-color);
  padding: 5px 5px;
  border-radius: 5px;
}
/* gemini deixei de usar */
.modulo {
  background-color: var(--darkmode-bg-color-box);
  padding: 20px;
}
/* gemini deixei de usar */
.moduloNome{
  margin-bottom: 20px;
}
.moduloConteudo{
  /* height:     100px;
  max-height: 100px;
  overflow-y: hidden; */
}
.comentariosTitle {
  margin-top: 20px;
  margin-bottom: 20px;
  border-bottom: 2px solid var(--darkmode-border-gray);
}
.textarea-oneline{
  width: 100%;
  max-width: 100%;
  min-width: 10%;
}

/* gemini deixei de usar */
.aula{
  background-color: rgb(14, 14, 14);
  padding: 20px 20px;
  border-radius: 5px;
  .nomeAula{
    font-size: 1.3rem;
  }
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

.gemini-module-container {
  max-width: 1000px;
  margin: 40px auto;
  padding: 0 24px;
}

.gemini-module-card {
  background: #262631;
  border-radius: 12px;
  padding: 32px;
  border: 1px solid rgba(255, 255, 255, 0.05);
  box-shadow: 0 8px 30px rgba(0, 0, 0, 0.3);
  position: relative;
  overflow: hidden;
  margin-bottom: 32px;
}

.gemini-module-card::before {
  content: "";
  position: absolute;
  left: 0;
  top: 0;
  bottom: 0;
  width: 4px;
  background: #444daf;
  opacity: 0.6;
}

.gemini-breadcrumb {
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 0.85rem;
  color: #888;
  margin-bottom: 24px;
  font-weight: 500;
}

.gemini-breadcrumb a {
  color: #444daf;
  text-decoration: none;
  transition: color 0.2s;
}

.gemini-breadcrumb a:hover {
  color: #535bc9;
}

.gemini-module-title-section {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 32px;
}

.gemini-module-title {
  font-size: 2rem;
  font-weight: 800;
  color: #fff;
  letter-spacing: -0.5px;
}

.gemini-lesson-list {
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.gemini-lesson-item {
  background: rgba(255, 255, 255, 0.03);
  border: 1px solid rgba(255, 255, 255, 0.05);
  padding: 20px 24px;
  border-radius: 10px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  transition: all 0.2s ease;
}

.gemini-lesson-item:hover {
  background: rgba(255, 255, 255, 0.06);
  border-color: rgba(68, 77, 175, 0.3);
  transform: translateX(4px);
}

.gemini-lesson-name {
  font-size: 1.1rem;
  font-weight: 600;
  color: #e0e0ff;
}

/* BOTÕES E FORMULÁRIOS */

.gemini-btn-primary {
  background: #444daf;
  color: white;
  padding: 10px 20px;
  border-radius: 8px;
  font-weight: 600;
  transition: all 0.2s ease;
  border: none;
  display: inline-flex;
  align-items: center;
  gap: 8px;
  font-size: 0.9rem;
  cursor: pointer;
}

.gemini-btn-primary:hover {
  background: #535bc9;
  box-shadow: 0 4px 15px rgba(68, 77, 175, 0.4);
}

.gemini-btn-secondary {
  background: rgba(255, 255, 255, 0.05);
  color: #e0e0ff;
  padding: 8px 16px;
  border-radius: 8px;
  font-weight: 600;
  transition: all 0.2s ease;
  border: 1px solid rgba(255, 255, 255, 0.1);
  display: inline-flex;
  align-items: center;
  gap: 8px;
  font-size: 0.85rem;
  text-decoration: none;
  cursor: pointer;
}

.gemini-btn-secondary i {
  background: transparent !important;
}

.gemini-btn-secondary:hover {
  background: rgba(255, 255, 255, 0.1);
  border-color: rgba(255, 255, 255, 0.2);
  color: #fff;
}

.gemini-btn-icon-only {
  background: rgba(68, 77, 175, 0.1);
  color: #444daf;
  width: 40px;
  height: 40px;
  border-radius: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.2s ease;
  border: 1px solid rgba(68, 77, 175, 0.2);
  text-decoration: none;
}

.gemini-btn-icon-only:hover {
  background: #444daf;
  color: #fff;
}

.gemini-input-edit {
  background: rgba(0, 0, 0, 0.3);
  border: 1px solid rgba(68, 77, 175, 0.3);
  color: #fff;
  padding: 10px 16px;
  border-radius: 8px;
  font-size: 1rem;
  width: 100%;
  margin: 12px 0;
}

.gemini-input-edit:focus {
  outline: none;
  border-color: #444daf;
  box-shadow: 0 0 0 3px rgba(68, 77, 175, 0.2);
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
              <h1 style="font-weight: 800; letter-spacing: -0.5px; font-size: 2.2rem;">Bem vindo de volta, mentorado!</h1>
            </div>
            <div>
              <!-- lateral -->
            </div>
          </section>
        </div>
      </div>

      <div class="gemini-module-container">

          <div class="my-5 py-5" v-if="busyModulosLoad">
            <InlineLoader
              :textoAguarde="true"
              :busy="busyModulosLoad"
              :center="true">
            </InlineLoader>
          </div>

          <div v-if="modulo != [] && !busyModulosLoad">
            <section>
              <div class="gemini-module-card">
                <div class="gemini-breadcrumb">
                  <router-link to='/cursos'>Cursos</router-link>
                  <i class="fi fi-rr-angle-small-right" style="font-size: 12px; margin-top: 2px;"></i>
                  <router-link :to='getCursoUrl()'>
                    {{ modulo.curso.nome }}
                  </router-link>
                  <i class="fi fi-rr-angle-small-right" style="font-size: 12px; margin-top: 2px;"></i>
                  <span>{{ modulo.nome }}</span>
                </div>

                <div class="gemini-module-title-section" v-if="!editarNomeModulo">
                  <h1 class="gemini-module-title"> {{ modulo.nome }} </h1>
                  <div class="flex">
                    <button type="button" class="gemini-btn-secondary mr-10" v-if="isAdmin" @click="toggleEditarNome()">
                      <i class="fi fi-rr-edit"></i> Editar
                    </button>
                    <button type="button" class="gemini-btn-primary" v-if="isAdmin" @click="toggleCriarAula()">
                      <i class="fi fi-rr-plus"></i> Criar Aula
                    </button>
                  </div>
                </div>

                <!-- EDIÇÃO DO NOME DO MÓDULO -->
                <div class="moduloNomeEdicao mb-32" v-if="editarNomeModulo">
                  <span style="font-weight: 600; color: #888;">Editar nome do Módulo:</span>
                  <input type="text" class="gemini-input-edit" v-model="modulo.nome" :disabled="busyModuloEditar">
                  <div class="flex mt-10">
                    <button type="button" :disabled="busyModuloEditar" class="gemini-btn-secondary mr-10" @click="toggleEditarNome()">
                      <i class="fi fi-rr-cross-small"></i> Cancelar
                    </button>
                    <button type="button" :disabled="busyModuloEditar" class="gemini-btn-primary" v-if="isAdmin" @click="salvarEdicaoNomeModulo()">
                      <i class="fi fi-rr-disk"></i> Salvar
                    </button>
                  </div>
                </div>

                <!-- CRIAR AULA -->
                <div v-if="criarAula" class="mb-32 p-24" style="background: rgba(68, 77, 175, 0.05); border-radius: 12px; border: 1px dashed rgba(68, 77, 175, 0.3);">
                  <div class="mb-15">
                    <span style="font-weight: 600; color: #888;">Título da Aula:</span>
                    <input type="text" class="gemini-input-edit" placeholder="Ex: Introdução ao Módulo" v-model="nomeNovoAula" :disabled="busyAulaCriar">
                  </div>
                  <div class="mb-15">
                    <span style="font-weight: 600; color: #888;">URL da Aula:</span>
                    <input type="text" class="gemini-input-edit" placeholder="Ex: link-do-video-ou-recurso" v-model="urlNovoAula" :disabled="busyAulaCriar">
                  </div>
                  <div class="flex mt-10">
                    <button type="button" :disabled="busyAulaCriar" class="gemini-btn-secondary mr-10" @click="toggleCriarAula()">
                      <i class="fi fi-rr-cross-small"></i> Cancelar
                    </button>
                    <button type="button" :disabled="busyAulaCriar" class="gemini-btn-primary" v-if="isAdmin" @click="salvarNovoAula()">
                      <i class="fi fi-rr-disk"></i> Criar Aula
                    </button>
                  </div>
                </div>

                <div class="my-5" v-if="busyAulaCriar || busyAulasLoad || busyModuloEditar">
                  <InlineLoader
                    :textoAguarde="true"
                    :busy="true"
                    :center="true">
                  </InlineLoader>
                </div>

                <div class="gemini-lesson-list" v-if="aulas != []">
                  <div v-for="aula in aulas" class="gemini-lesson-item">
                    <div class="gemini-lesson-name">
                      {{ aula.nome }}
                    </div>
                    <router-link :to='getAulaUrl(aula)' class="gemini-btn-icon-only">
                      <i class="fi fi-rr-play"></i>
                    </router-link>
                  </div>
                </div>
              </div>
            </section>
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
import { ModulosStorage } from '@/core/storage/ModulosStorage.js'
import { AulasStorage } from '@/core/storage/AulasStorage.js'
import { ComentariosStorage } from '@/core/storage/ComentariosStorage.js'
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

      busyModulosLoad: false,
      busyModuloEditar: false,

      busyAulasLoad: false,
      busyAulaCriar: false,

      editarNomeModulo: false,
      criarAula: false,
      nomeNovoAula: '',
      urlNovoAula: '',

      aulas: [],
      modulo: [],
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

    getCursoUrl() { return UrlBuilder.getCursoUrl({'id':this.getIdCurso()}); },
    getModuloUrl(modulo) { return UrlBuilder.getModuloUrl(modulo); },
    getAulaUrl(aula) {
      console.log('aula get aula url', aula);
      return UrlBuilder.getAulaUrl(aula);
    },

    toggleEditarNome() { this.editarNomeModulo = !this.editarNomeModulo },
    toggleCriarAula() { this.criarAula = !this.criarAula },

    salvarEdicaoNomeModulo(){
      this.busyModuloEditar = true;
      ModulosStorage.editar(this.getIdCurso(), this.modulo.id, this.modulo.nome)
      .then(([response, data]) => {
        this.busyModuloEditar = false;
        this.$refs.notifier.notify(`Nome do modulo atualizado.`)
        this.toggleEditarNome();
        this.buscarModulo()
      })
      .catch((error) => {
        this.busyModuloEditar = false;
        this.$refs.notifier.notify(`Ocorreu um erro: ${error}`, true)
        console.error(error);
      });
    },

    salvarNovoAula(){
      this.busyAulaCriar = true;
      AulasStorage.criar(this.modulo.id, this.nomeNovoAula, this.urlNovoAula)
      .then(([response, data]) => {
        this.busyAulaCriar = false;
        this.$refs.notifier.notify(`Aula criado.`);
        this.nomeNovoAula = '';
        this.urlNovoAula = '';
        this.toggleCriarAula();
        this.buscarModulo();
      })
      .catch((error) => {
        this.busyAulaCriar = false;
        this.$refs.notifier.notify(`Ocorreu um erro: ${error}`, true)
        console.error(error);
      });
    },

    getIdCurso () {
      if(this.idCurso == null) {
        this.idCurso = this.$route.query.idCurso
      }
      return this.idCurso;
    },

    buscarModulo () {
      this.busyModulosLoad = true;
      ModulosStorage.index(this.getIdCurso())
      .then(([response, data]) => {
        const idModulo = this.$route.params.idModulo
        data = data.filter(c => {return c.id == idModulo});
        this.modulo = data[0];
        this.buscarAulasDoModulo()
        this.busyModulosLoad = false;
      })
      .catch((error) => {
        this.busyModulosLoad = false;
        this.$refs.notifier.notify(`Ocorreu um erro: ${error}`, true)
        console.error(error);
      });
    },

    buscarAulasDoModulo () {
      this.busyAulasLoad = true;
      AulasStorage.index(this.modulo.id)
      .then(([response, data]) => {
        this.aulas = data;
        this.busyAulasLoad = false;
      })
      .catch((error) => {
        this.busyAulasLoad = false;
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
    this.buscarModulo(true);
    // this.buscaTags();
  },
}
</script>
