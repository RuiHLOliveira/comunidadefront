<style scoped>

/* gemini deixei de usar */
.breadcrumbs{
  background-color: var(--darkmode-bg-color);
  padding: 5px 5px;
  border-radius: 5px;
}
/* gemini deixei de usar */
.curso {
  background-color: var(--darkmode-bg-color-box);
  padding: 20px;
}
/* gemini deixei de usar */
.cursoNome{
  margin-bottom: 20px;
}
.cursoConteudo{
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
.modulo{
  background-color: rgb(14, 14, 14);
  padding: 20px 20px;
  border-radius: 5px;
  .nomeModulo{
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

.gemini-course-container {
  max-width: 1000px;
  margin: 40px auto;
  padding: 0 24px;
}

.gemini-course-card {
  background: #262631;
  border-radius: 12px;
  padding: 32px;
  border: 1px solid rgba(255, 255, 255, 0.05);
  box-shadow: 0 8px 30px rgba(0, 0, 0, 0.3);
  position: relative;
  overflow: hidden;
  margin-bottom: 32px;
}

.gemini-course-card::before {
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

.gemini-course-title-section {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 32px;
}

.gemini-course-title {
  font-size: 2rem;
  font-weight: 800;
  color: #fff;
  letter-spacing: -0.5px;
}

.gemini-module-list {
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.gemini-module-item {
  background: rgba(255, 255, 255, 0.03);
  border: 1px solid rgba(255, 255, 255, 0.05);
  padding: 20px 24px;
  border-radius: 10px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  transition: all 0.2s ease;
}

.gemini-module-item:hover {
  background: rgba(255, 255, 255, 0.06);
  border-color: rgba(68, 77, 175, 0.3);
  transform: translateX(4px);
}

.gemini-module-name {
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
  padding: 8px 16px;
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

      <div class="gemini-course-container">

          <div class="my-5 py-5" v-if="busyCursosLoad">
            <InlineLoader
              :textoAguarde="true"
              :busy="busyCursosLoad"
              :center="true">
            </InlineLoader>
          </div>

          <div v-if="curso != [] && !busyCursosLoad">
            <section>
              <div class="gemini-course-card">
                <div class="gemini-breadcrumb">
                  <router-link to='/cursos'>Cursos</router-link>
                  <i class="fi fi-rr-angle-small-right" style="font-size: 12px; margin-top: 2px;"></i>
                  <span>{{ curso.nome }}</span>
                </div>

                <div class="gemini-course-title-section" v-if="!editarNomeCurso">
                  <h1 class="gemini-course-title"> {{ curso.nome }} </h1>
                  <div class="flex">
                    <button type="button" class="gemini-btn-secondary mr-10" v-if="isAdmin" @click="toggleEditarNome()">
                      <i class="fi fi-rr-edit"></i> Editar
                    </button>
                    <button type="button" class="gemini-btn-primary" v-if="isAdmin" @click="toggleCriarModulo()">
                      <i class="fi fi-rr-plus"></i> Criar Modulo
                    </button>
                  </div>
                </div>

                <!-- EDIÇÃO DO NOME DO CURSO -->
                <div class="cursoNomeEdicao mb-32" v-if="editarNomeCurso">
                  <span style="font-weight: 600; color: #888;">Editar nome do Curso:</span>
                  <input type="text" class="gemini-input-edit" v-model="curso.nome" :disabled="busyCursoEditar">
                  <div class="flex mt-10">
                    <button type="button" :disabled="busyCursoEditar" class="gemini-btn-secondary mr-10" @click="toggleEditarNome()">
                      <i class="fi fi-rr-cross-small"></i> Cancelar
                    </button>
                    <button type="button" :disabled="busyCursoEditar" class="gemini-btn-primary" v-if="isAdmin" @click="salvarEdicaoNomeCurso()">
                      <i class="fi fi-rr-disk"></i> Salvar
                    </button>
                  </div>
                </div>

                <!-- CRIAR MODULO -->
                <div v-if="criarModulo" class="mb-32 p-20" style="background: rgba(68, 77, 175, 0.05); border-radius: 12px; border: 1px dashed rgba(68, 77, 175, 0.3);">
                  <span style="font-weight: 600; color: #888;">Nome do Novo Módulo:</span>
                  <input type="text" class="gemini-input-edit" v-model="nomeNovoModulo" :disabled="busyModuloCriar">
                  <div class="flex mt-10">
                    <button type="button" :disabled="busyModuloCriar" class="gemini-btn-secondary mr-10" @click="toggleCriarModulo()">
                      <i class="fi fi-rr-cross-small"></i> Cancelar
                    </button>
                    <button type="button" :disabled="busyModuloCriar" class="gemini-btn-primary" v-if="isAdmin" @click="salvarNovoModulo()">
                      <i class="fi fi-rr-disk"></i> Criar Módulo
                    </button>
                  </div>
                </div>

                <div class="my-5" v-if="busyModuloCriar || busyModulosLoad || busyCursoEditar">
                  <InlineLoader
                    :textoAguarde="true"
                    :busy="true"
                    :center="true">
                  </InlineLoader>
                </div>

                <div class="gemini-module-list" v-if="modulos != []">
                  <div v-for="modulo in modulos" class="gemini-module-item">
                    <div class="gemini-module-name">
                      {{ modulo.nome }}
                    </div>
                    <router-link :to='getModuloUrl(modulo)' class="gemini-btn-icon-only">
                      <i class="fi fi-rr-folder-open"></i>
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
import { CursosStorage } from '@/core/storage/CursosStorage.js'
import { ModulosStorage } from '@/core/storage/ModulosStorage.js'
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

      busyCursosLoad: false,
      busyCursoEditar: false,

      busyModulosLoad: false,
      busyModuloCriar: false,

      editarNomeCurso: false,
      criarModulo: false,
      nomeNovoModulo: '',

      modulos: [],
      curso: [],
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


    getModuloUrl(modulo) { return UrlBuilder.getModuloUrl(modulo); },
    toggleEditarNome() { this.editarNomeCurso = !this.editarNomeCurso },
    toggleCriarModulo() { this.criarModulo = !this.criarModulo },

    salvarEdicaoNomeCurso(){
      this.busyCursoEditar = true;
      CursosStorage.editar(this.curso)
      .then(([response, data]) => {
        this.busyCursoEditar = false;
        this.$refs.notifier.notify(`Nome do curso atualizado.`)
        this.toggleEditarNome();
        this.buscaCurso()
      })
      .catch((error) => {
        this.busyCursoEditar = false;
        this.$refs.notifier.notify(`Ocorreu um erro: ${error}`, true)
        console.error(error);
      });
    },

    salvarNovoModulo(){
      this.busyModuloCriar = true;
      ModulosStorage.criar(this.curso.id, this.nomeNovoModulo)
      .then(([response, data]) => {
        this.busyModuloCriar = false;
        this.$refs.notifier.notify(`Modulo criado.`);
        this.nomeNovoModulo = '';
        this.toggleCriarModulo();
        this.buscaCurso();
      })
      .catch((error) => {
        this.busyModuloCriar = false;
        this.$refs.notifier.notify(`Ocorreu um erro: ${error}`, true)
        console.error(error);
      });
    },

    buscaCurso () {
      this.busyCursosLoad = true;
      CursosStorage.index()
      .then(([response, data]) => {
        const idCurso = this.$route.params.idCurso
        data = data.filter(c => {return c.id == idCurso});
        this.curso = data[0];
        this.buscarModulosDoCurso()
        this.busyCursosLoad = false;
      })
      .catch((error) => {
        this.busyCursosLoad = false;
        this.$refs.notifier.notify(`Ocorreu um erro: ${error}`, true)
        console.error(error);
      });
    },

    buscarModulosDoCurso () {
      this.busyModulosLoad = true;
      ModulosStorage.index(this.curso.id)
      .then(([response, data]) => {
        this.modulos = data;
        this.busyModulosLoad = false;
      })
      .catch((error) => {
        this.busyModulosLoad = false;
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
    this.buscaCurso(true);
    // this.buscaTags();
  },
}
</script>
