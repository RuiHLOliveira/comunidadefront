<style scoped>

.post {
  background-color: var(--darkmode-bg-color-box);
  padding: 20px;
  margin-top: 40px;
}
.postNome{
  margin-bottom: 20px;
  text-align: center;
}
.postConteudo{
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

.profilePicture {
  border-radius: 10%;
  background-color: black;
  min-width:  70px;
  min-height: 70px;
  max-width:  70px;
  max-height: 70px;
}
.comentario{
  padding: 10px;
  width: 100%;
  border-radius: 5px;
  background-color: rgb(34, 34, 34);
  margin-bottom: 10px;
}

.comentarioUsuario,
.comentarioDataHora {
  font-size: 0.9rem;
  margin-left: 10px;
  color: var(--darkmode-font-color-secondary);

  padding: 5px 10px;
  border-radius: 10px;

  margin-left: 0px;
  margin-bottom: 5px;
}
.comentarioUsuario{
  background-color: var(--darkmode-bg-color);
}
.comentarioConteudo{
  padding-left: 10px;
}


.resposta {
  border-top: 1px solid black;
  margin-top: 10px;
  padding-top: 10px;
  padding-left: 40px;
}
.respostaUsuario, .respostaDataHora {
  font-size: 0.9rem;
  color: var(--darkmode-font-color-secondary);
  padding: 5px 10px;
  border-radius: 10px;
  margin-bottom: 5px;
}
.respostaDataHora {
}
.respostaUsuario{
  background-color: var(--darkmode-bg-color);
}
.respostaConteudo{
  padding-left: 10px;
}

.responder {
  color: var(--darkmode-font-color-secondary-transparent);
  font-size: 0.8rem;
  margin-top: 10px;
}
.responder:hover {
  color: var(--darkmode-font-color-secondary);
}

.sugestoesPosts {
  min-height: 200px;
  background-color: var(--darkmode-border-gray);
  .sugestaoPost {
    background-color: black;
    min-height: 200px;
    min-width:  200px;
    border-radius: 10px;
  }
}

</style>

<template>
  <div>
    <div class="container">

      <div class="position_sticky py-10 div_border_bottom_gray darkmodeBgBlack">
        <!-- HEADER -->
        <section class="my-5 py-5 px-10 flex justify-spacebetween alignitens-center">
          <div class="flex alignitens-center">
            <h1>Bem-vindo de volta, mentorado!</h1>
            <div>
              <router-link to='/posts' class="btn ml-15 mr-10 my-5 flex-center-combo" style="display: inline-flex;">
                <i class="fi fi-rr-arrow-small-left"></i>
                <span class="ml-5">Voltar</span>
              </router-link>
            </div>
          </div>
          <div>
            lateral
          </div>
        </section>

      </div>

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
              <div class="post flex-column">
                <div class="postNome">
                  <h1> {{ post.nome }} </h1>
                </div>
                <div class="postConteudo whitespace-pre" v-html="post.introducaoHtml"></div>
                <div class="postConteudo whitespace-pre" v-html="post.conteudoHtml"></div>
              </div>
            </section>
            

            <section>
              <div class="comentariosTitle">
                <h2>Comentários:</h2>
              </div>
              
              <label for="comentar"></label>
              <div class="flex mb-20">
                <input name="conteudoComentario" type="text" placeholder="comente!" v-model="conteudoComentario">
                <button type="button" class="btn ml-10 mr-10 my-5 flex-center-combo" style="display: inline-flex;"
                  @click="salvarComentario()">
                  <i class="fi fi-rr-disk"></i>
                  <span class="ml-5">Ok</span>
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
                <div v-for="comentario in comentarios" >
                  <div class="comentario">
                    
                    <!-- <div class="profilePicture flex ">imagem quadrada</div> -->
                    <div class="ml-5 flex-column">
                      <div class="flex">
                        <div class="comentarioUsuario">{{ getUsuarioApelido(comentario) }}</div>
                        <div class="comentarioDataHora">{{ comentario.createdAtBr }}</div>
                      </div>
                      <div class="comentarioConteudo">{{ comentario.conteudo }}</div>

                      <!-- RESPOSTAS -->
                       
                      <div v-for="resposta in comentario.respostas" >
                        <div class="resposta">
                          <div class="flex">
                            <div class="respostaUsuario">{{ getUsuarioApelido(resposta) }}</div>
                            <div class="respostaDataHora">{{ resposta.createdAtBr }}</div>
                          </div>
                          <div class="respostaConteudo">{{ resposta.conteudo }}</div>
                        </div>
                      </div>

                      <!-- RESPONDER -->
                      <div>
                        <button type="button" class="btn btn-sm btn-discreet responder" @click="toggleResponseComentario(comentario)">
                          {{ comentario.showCaixaResposta ? 'Cancelar' : 'Responder' }}
                        </button>
                        <div v-if="comentario.showCaixaResposta == true">
                          <div class="flex">
                            <input name="conteudoComentarioResposta" type="text" placeholder="responder" v-model="conteudoComentarioResposta">
                            <button type="button" class="btn ml-10 mr-10 my-5 flex-center-combo" style="display: inline-flex;"
                              @click="salvarComentarioResposta(comentario)">
                              <i class="fi fi-rr-disk"></i>
                              <span class="ml-5">Ok</span>
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>

                  </div>
                </div>
              </div>

            </section>
          </div>

          <section>
          <div class="sugestoesPosts mt-20 flex justify-spacearound p-10">

            <div class="sugestaoPost flex flex-center-combo justify-center">
              <span>sugestao 1</span>
            </div>
            <div class="sugestaoPost flex flex-center-combo justify-center">
              <span>sugestao 2</span>
            </div>
            <div class="sugestaoPost flex flex-center-combo justify-center">
              <span>sugestao 3</span>
            </div>
            <div class="sugestaoPost flex flex-center-combo justify-center">
              <span>sugestao 4</span>
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
      this.busyComentarioCreate = true;
      const idComentarioPai = comentarioPai.id;
      const idPost = this.post.id;
      const conteudoComentarioResposta = this.conteudoComentarioResposta;
      ComentariosStorage.criar(idPost, conteudoComentarioResposta, idComentarioPai)
      .then(([response, data]) => {
        this.atualizaComentarios();
        this.busyComentarioCreate = false;
      })
      .catch((error) => {
        this.busyComentarioCreate = false;
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
