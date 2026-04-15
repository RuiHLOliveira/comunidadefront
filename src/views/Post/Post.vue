<style scoped>

/* .post { gemini deixei de usar */
.post-old {
  background-color: var(--darkmode-bg-color-box);
  padding: 20px;
  margin-top: 40px;
}

/* Identidade Modern Scholar */
.modern-scholar-post-card {
  background-color: #262631;
  padding: 30px;
  margin-top: 20px;
  border-radius: 12px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.3);
  position: relative;
  overflow: hidden;
}

.modern-scholar-post-card::before {
  content: '';
  position: absolute;
  left: 0;
  top: 0;
  bottom: 0;
  width: 4px;
  background: #3b3b4f;
}

/* .postNome{ gemini deixei de usar */
.postNome-old {
  margin-bottom: 20px;
  text-align: center;
}

.modern-scholar-post-header {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  gap: 20px;
  margin-bottom: 20px;
}

.modern-scholar-post-title {
  font-size: 2.2rem;
  font-weight: 700;
  color: #fff;
  margin-bottom: 15px;
  letter-spacing: -0.5px;
}

/* .postConteudo{ gemini deixei de usar */
.postConteudo-old {
  /* height:     100px;
  max-height: 100px;
  overflow-y: hidden; */
  width: 100%;
}

.modern-scholar-content {
  color: #e0e0e0;
  line-height: 1.6;
  font-size: 1.05rem;
}

.modern-scholar-content :deep(p) {
  margin-bottom: 1.2rem;
}

.modern-scholar-content :deep(.imgPost) {
  max-width: 100%;
  height: auto;
  border-radius: 8px;
  margin: 20px 0;
  box-shadow: 0 4px 12px rgba(0,0,0,0.2);
}

/* .comentariosTitle { gemini deixei de usar */
.comentariosTitle-old {
  margin-top: 20px;
  margin-bottom: 20px;
  border-bottom: 2px solid var(--darkmode-border-gray);
}

.modern-scholar-section-title {
  font-size: 1.5rem;
  font-weight: 600;
  color: #fff;
  margin: 40px 0 20px;
  display: flex;
  align-items: center;
  gap: 10px;
}

.modern-scholar-section-title::after {
  content: '';
  flex-grow: 1;
  height: 1px;
  background: rgba(255,255,255,0.05);
}

/* .profilePicture { gemini deixei de usar */
.profilePicture-old {
  border-radius: 10%;
  background-color: black;
  min-width:  70px;
  min-height: 70px;
  max-width:  70px;
  max-height: 70px;
}

.modern-scholar-avatar {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background-color: #3b3b4f;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: bold;
  color: #fff;
  border: 2px solid #2c2c39;
}

/* .comentario{ gemini deixei de usar */
.comentario-old {
  padding: 10px;
  width: 100%;
  border-radius: 5px;
  background-color: rgb(34, 34, 34);
  margin-bottom: 10px;
}

.modern-scholar-comment-card {
  background-color: #2c2c39;
  padding: 20px;
  border-radius: 12px;
  margin-bottom: 15px;
  transition: transform 0.2s ease;
}

/* .comentarioUsuario, .comentarioDataHora { gemini deixei de usar */
.comentarioUsuario-old, .comentarioDataHora-old {
  font-size: 0.9rem;
  margin-left: 10px;
  color: var(--darkmode-font-color-secondary);
  padding: 5px 10px;
  border-radius: 10px;
  margin-left: 0px;
  margin-bottom: 5px;
}

.modern-scholar-comment-header {
  display: flex;
  align-items: center;
  gap: 12px;
  margin-bottom: 10px;
}

.modern-scholar-comment-user {
  font-weight: 600;
  color: #fff;
  font-size: 0.95rem;
}

.modern-scholar-comment-date {
  color: #a0a0b0;
  font-size: 0.8rem;
}

.modern-scholar-comment-body {
  color: #d1d1d1;
  font-size: 0.95rem;
  padding-left: 52px;
}

/* .resposta { gemini deixei de usar */
.resposta-old {
  border-top: 1px solid black;
  margin-top: 10px;
  padding-top: 10px;
  padding-left: 40px;
}

.modern-scholar-reply-container {
  margin-top: 15px;
  padding-left: 52px;
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.modern-scholar-reply-card {
  background-color: rgba(255, 255, 255, 0.03);
  padding: 12px 15px;
  border-radius: 8px;
  border-left: 2px solid #3b3b4f;
}

/* .responder { gemini deixei de usar */
.responder-old {
  color: var(--darkmode-font-color-secondary-transparent);
  font-size: 0.8rem;
  margin-top: 10px;
}

.modern-scholar-reply-btn {
  background: transparent;
  border: none;
  color: #8888a0;
  font-weight: 600;
  font-size: 0.85rem;
  cursor: pointer;
  margin-top: 10px;
  padding: 0;
  transition: color 0.2s;
}

.modern-scholar-reply-btn:hover {
  color: #fff;
}

/* .sugestoesPosts { gemini deixei de usar */
.sugestoesPosts-old {
  min-height: 200px;
  background-color: var(--darkmode-border-gray);
}

.modern-scholar-suggestions-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
  gap: 20px;
  margin-top: 30px;
}

.modern-scholar-suggestion-card {
  background-color: #262631;
  border-radius: 12px;
  height: 150px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #a0a0b0;
  border: 1px solid rgba(255, 255, 255, 0.05);
  transition: all 0.3s ease;
  cursor: pointer;
  text-align: center;
  padding: 15px;
}

.modern-scholar-suggestion-card:hover {
  background-color: #2c2c39;
  border-color: rgba(255, 255, 255, 0.1);
}

.animate-spin {
  animation: spin 1s linear infinite;
}

@keyframes spin {
  100% { transform: rotate(360deg); }
}

/* Utility Modern Scholar classes */
.modern-scholar-btn-edit {
  background-color: #3b3b4f;
  border: none;
  padding: 6px 12px;
  border-radius: 6px;
  color: #fff;
  text-decoration: none;
  display: inline-flex;
  align-items: center;
  gap: 6px;
  font-size: 0.85rem;
  transition: all 0.2s;
}

.modern-scholar-btn-edit:hover {
  background-color: #4a4a66;
  box-shadow: 0 0 10px rgba(59, 59, 79, 0.3);
}

.modern-scholar-input {
  flex-grow: 1;
  color: #fff;
  font-size: 0.95rem;
}

.modern-scholar-input:focus {
  box-shadow: none;
}

/* .flex-center-combo, .btn, .btn-sm... gemini classe era inline */
.modern-scholar-inline-fix {
  display: inline-flex;
  line-height: 0;
}

</style>

<template>
  <div>
    <div class="container">

      <header class="modern-scholar-header-container">
        <div class="modern-scholar-header-left">
          <h2 class="modern-scholar-main-title">Portal do Aluno</h2>
          <router-link to='/posts' class="modern-scholar-btn-back">
            <i class="fi fi-rr-arrow-small-left"></i>
            <span>Voltar</span>
          </router-link>
        </div>
        <div class="modern-scholar-avatar" title="Mentor">
          M
        </div>
      </header>

      <div>

          <div class="my-5 py-5" v-if="busyPostsLoad">
            <InlineLoader
              :textoAguarde="true"
              :busy="busyPostsLoad"
              :center="true">
            </InlineLoader>
          </div>

          <div v-if="post != [] && !busyPostsLoad">

            <section>
              <article class="modern-scholar-post-card /* gemini deixei de usar post flex-column */">
                <div class="modern-scholar-post-header /* gemini classe era inline */">
                  <h1 class="modern-scholar-post-title"> {{ post.nome }} </h1>
                  <div v-if="isAdmin">
                    <router-link :to='getEditPostUrl(post)' class="modern-scholar-btn-edit /* gemini deixei de usar btn brn-sm flex-center-combo */">
                      <i class="fi fi-rr-edit"></i>
                      <span>Editar Post</span>
                    </router-link>
                  </div>
                </div>
                <div class="modern-scholar-content whitespace-pre /* gemini deixei de usar postConteudo */" v-html="post.introducaoHtml"></div>
                <div class="modern-scholar-content whitespace-pre /* gemini deixei de usar postConteudo */" v-html="post.conteudoHtml"></div>
              </article>
            </section>
            

            <section>
              <div class="modern-scholar-section-title /* gemini deixei de usar comentariosTitle */">
                <h2>Comentários</h2>
              </div>
              
              <div class="flex mb-30 gap-10">
                <input class="modern-scholar-input" name="conteudoComentario" type="text" placeholder="Escreva um comentário..." v-model="conteudoComentario">
                <button type="button" class="modern-scholar-btn-submit"
                  :disabled="busyComentarioCreate"
                  @click="salvarComentario()">
                  <i v-if="!busyComentarioCreate" class="fi fi-rr-paper-plane"></i>
                  <i v-else class="fi fi-rr-spinner animate-spin"></i>
                  <span class="ml-5">{{ busyComentarioCreate ? 'Enviando...' : 'Enviar' }}</span>
                </button>
              </div>
            </section>

            <section>
              <div class="my-5 py-5" v-if="busyComentariosLoad">
                <InlineLoader
                  :textoAguarde="true"
                  :busy="busyComentariosLoad"
                  :center="true">
                </InlineLoader>
              </div>
              <div v-if="comentarios != [] && !busyPostsLoad" >
                <div v-for="comentario in comentarios" :key="comentario.id" >
                  <div class="modern-scholar-comment-card /* gemini deixei de usar comentario */">
                    
                    <div class="modern-scholar-comment-header">
                      <div class="modern-scholar-avatar">
                        {{ getUsuarioApelido(comentario).charAt(0).toUpperCase() }}
                      </div>
                      <div class="flex-column">
                        <span class="modern-scholar-comment-user">{{ getUsuarioApelido(comentario) }}</span>
                        <span class="modern-scholar-comment-date">{{ comentario.createdAtBr }}</span>
                      </div>
                    </div>
                    
                    <div class="modern-scholar-comment-body">{{ comentario.conteudo }}</div>

                    <!-- RESPOSTAS -->
                    <div class="modern-scholar-reply-container" v-if="comentario.respostas && comentario.respostas.length > 0">
                      <div v-for="resposta in comentario.respostas" :key="resposta.id" class="modern-scholar-reply-card">
                        <div class="modern-scholar-comment-header">
                          <span class="modern-scholar-comment-user" style="font-size: 0.85rem;">{{ getUsuarioApelido(resposta) }}</span>
                          <span class="modern-scholar-comment-date" style="font-size: 0.75rem;">{{ resposta.createdAtBr }}</span>
                        </div>
                        <div class="modern-scholar-comment-body" style="padding-left: 0; font-size: 0.85rem;">{{ resposta.conteudo }}</div>
                      </div>
                    </div>

                    <!-- RESPONDER -->
                    <div style="padding-left: 52px;">
                      <button type="button" class="modern-scholar-reply-btn" 
                              :disabled="comentario.busyResposta"
                              @click="toggleResponseComentario(comentario)">
                        <i v-if="!comentario.busyResposta" class="fi fi-rr-redo"></i>
                        <i v-else class="fi fi-rr-spinner animate-spin"></i>
                        {{ comentario.showCaixaResposta ? 'Cancelar' : 'Responder' }}
                      </button>
                      
                      <div v-if="comentario.showCaixaResposta == true" class="mt-15 flex gap-10">
                        <input class="modern-scholar-input" name="conteudoComentarioResposta" type="text" placeholder="Sua resposta..." v-model="conteudoComentarioResposta">
                        <button type="button" class="modern-scholar-btn-submit"
                          :disabled="comentario.busyResposta"
                          @click="salvarComentarioResposta(comentario)">
                          <i v-if="!comentario.busyResposta" class="fi fi-rr-paper-plane"></i>
                          <i v-else class="fi fi-rr-spinner animate-spin"></i>
                          <span>{{ comentario.busyResposta ? 'Enviando...' : 'Responder' }}</span>
                        </button>
                      </div>
                    </div>

                  </div>
                </div>
              </div>

            </section>
          </div>

          <section>
            <div class="modern-scholar-section-title">
              <h2>Sugestões para você</h2>
            </div>
            <div class="modern-scholar-suggestions-grid /* gemini deixei de usar sugestoesPosts mt-20 flex justify-spacearound p-10 */">
              <div class="modern-scholar-suggestion-card">
                <span>Próximo Nível: Avançando em Vue.js</span>
              </div>
              <div class="modern-scholar-suggestion-card">
                <span>Dominando CSS Grid</span>
              </div>
              <div class="modern-scholar-suggestion-card">
                <span>Clean Code na Prática</span>
              </div>
              <div class="modern-scholar-suggestion-card">
                <span>Arquitetura de Sistemas</span>
              </div>
            </div>
          </section>
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

      busyPostsLoad: false,
      busyComentarioCreate: false,
      busyComentariosLoad: false,

      post: [],
      comentarios: [],

      conteudoComentario: '',
      conteudoComentarioResposta: '',
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


    getEditPostUrl() {
      const url = '/posts/criar?idPost='+this.post.id
      console.log('DEBUG', url)
      return url;
    },

    toggleResponseComentario(comentario) {
      
      for (let i = 0; i < this.comentarios.length; i++) {
        if(this.comentarios[i].id == comentario.id) {
          this.comentarios[i].showCaixaResposta = !this.comentarios[i].showCaixaResposta;
        } else {
          this.comentarios[i].showCaixaResposta = false;
        }
      }
    },


    getUsuarioApelido(comentario){
      if(comentario.usuario.apelido != null && comentario.usuario.apelido != '') {
        return comentario.usuario.apelido;
      }
      if(comentario.usuario.nome != null && comentario.usuario.nome != '') {
        return comentario.usuario.nome;
      }
      if(comentario.usuario.email != null && comentario.usuario.email != '') {
        return comentario.usuario.email;
      }
      return '---';
    },

    getPostUrl(projeto) {
      return UrlBuilder.getPostUrl(projeto);
    },

    salvarComentario() {
      this.busyComentarioCreate = true;
      const idPost = this.post.id;
      const conteudoComentario = this.conteudoComentario;
      ComentariosStorage.criar(idPost, conteudoComentario)
      .then(([response, data]) => {
        this.conteudoComentario = '';
        this.atualizaComentarios();
        this.busyComentarioCreate = false;
      })
      .catch((error) => {
        this.busyComentarioCreate = false;
        this.$refs.notifier.notify(`Ocorreu um erro: ${error}`, true)
        console.error(error);
      });
    },

    salvarComentarioResposta(comentarioPai) {
      comentarioPai.busyResposta = true;
      const idComentarioPai = comentarioPai.id;
      const idPost = this.post.id;
      const conteudoComentarioResposta = this.conteudoComentarioResposta;
      ComentariosStorage.criar(idPost, conteudoComentarioResposta, idComentarioPai)
      .then(([response, data]) => {
        this.conteudoComentarioResposta = '';
        this.atualizaComentarios();
        comentarioPai.busyResposta = false;
      })
      .catch((error) => {
        comentarioPai.busyResposta = false;
        this.$refs.notifier.notify(`Ocorreu um erro: ${error}`, true)
        console.error(error);
      });
    },

    atualizaComentarios(){
      this.busyComentariosLoad = true;
      ComentariosStorage.index(this.post.id)
      .then(([response, data]) => {
        console.log({data});
        data.forEach(comentario => {
          console.log('transformado', new Date(comentario.createdAt));
          comentario.createdAtBr = DateTime.formatBrDateTime(new Date(comentario.createdAt));
          comentario.showCaixaResposta = false;
        });
        
        let lista = data.filter(com => { return com.comentariopai == null; });
        let listaRespostas = data.filter(com => { return com.comentariopai != null; });
        console.log('listaRespostas', listaRespostas);

        let mapRespostas = new Map();

        listaRespostas.forEach(resposta => {
          let arrayRespostasPai = [];
          if(mapRespostas.has(resposta.comentariopai)){
            arrayRespostasPai = mapRespostas.get(resposta.comentariopai);
          }
          //add
          arrayRespostasPai.push(resposta);
          mapRespostas.set(resposta.comentariopai, arrayRespostasPai);
        });
        console.log('mapRespostas', mapRespostas);

        lista.forEach(comentario => {
          comentario.respostas = [];
          if(mapRespostas.has(comentario.id)){
            comentario.respostas = mapRespostas.get(comentario.id);
          }
        });
        console.log('lista', lista);



        this.comentarios = lista;
        this.busyComentariosLoad = false;


      })
      .catch((error) => {
        this.busyComentariosLoad = false;
        this.$refs.notifier.notify(`Ocorreu um erro: ${error}`, true)
        console.error(error);
      });
    },

    buscaPost () {
      this.busyPostsLoad = true;
      PostsStorage.index()
      .then(([response, data]) => {
        const idPost = this.$route.params.idPost
        data = data.filter(p => {return p.id == idPost});
        console.log({data});
        data.forEach(post => {
          post.introducaoHtml = MdHtmlConverter.convert(post.introducao);
          post.conteudoHtml = MdHtmlConverter.convert(post.conteudo);
        });
        this.post = data[0];
        this.atualizaComentarios();
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
    this.buscaPost(true);
    // this.buscaTags();
  },
}
</script>
