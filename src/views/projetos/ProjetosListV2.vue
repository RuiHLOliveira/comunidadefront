<style scoped>

.projetofoto {
  border: 10px solid #7c7c7c;
  border-style: inset;
  max-width: 400px;
  max-height: 400px;
}
section.projetoList {
  flex-basis: 100%;
  flex-grow: 0;
  flex-shrink: 0;
  div.projeto {
    background-color: #1f1c20;
    padding: 10px;
    margin-bottom: 10px;
    border-radius: 5px;
    justify-content: space-between;
    button.situacaoFixedWidth {
      min-width: 100px;
      max-width: 100px;
    }
    button.prioridadeFixedWidth {
      min-width: 100px;
      max-width: 100px;
    }
  }
}
@media only screen and (min-width: 800px) {
  section.projetoList {
    /**desktop */
    flex-basis: 300px;
    /* max-height: 87svh; */
    /* overflow-y: scroll; */
    /* margin-right: 10px; */
  }
}

.btnSituacao{
  padding: 5px 10px;
  border-radius: 50px;
}
.btnBgOnly{
  background-color: var(--darkmode-dark-button-color);
  color: var(--darkmode-font-color);
  padding: 5px 10px;
  border-radius: 50px;
}
.btnBgOnly:hover{
  background-color: var(--darkmode-dark-hover-button-color-background);
}


.projeto {
  .projetoNome {
    font-size: 1.2rem;
    margin-top: 10px;
    margin-bottom: 5px;
  }
  .projeto_tags {
    font-size: 0.8rem;
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    /* justify-content: flex-start; */
    justify-content: flex-end;
    align-items: center;
    margin-top: 5px;
    margin-bottom: 5px;
    margin-right: 10px;
    /* width: 120px; */
    .projeto_tags_tag {
      margin-right: 5px;
      padding: 3px;
    }
  }
  @media only screen and (min-width: 800px) {
    .projetoNome {
      margin-top: 5px;
      margin-bottom: 5px;
    }
    .projeto_tags {
      justify-content: flex-end;
      width: 150px;
    }
  }

}









section.projetoShow {
  /**mobile */
  border-radius: 5px;
  flex: 1;
  /* height: 90svh; */
  max-height: 100%; 
  .projetoShowLabel{
    /* font-style: italic; */
    /* text-decoration: underline; */
    font-size: 1.3rem;
    /* font-weight: bold; */
    color: var(--darkmode-font-color);
  }
}
@media only screen and (min-width: 800px) {
  section.projetoShow {
    flex:1;
  }
}

.linhaBox {
  padding: 10px;
  border-radius: 5px;
  color: var(--darkmode-font-color);
  background-color: var(--darkmode-bg-color);
  border: 1px solid var(--darkmode-border-gray);
}
/* .linhaBox:hover {
  border: 1px solid #939393;
} */

</style>

<template>
  <div>
    <div class="container">

      <div class="position_sticky py-10 div_border_bottom_gray darkmodeBgBlack">
        <!-- HEADER -->
        <section class="my-5 py-5 px-10 flex justify-spacebetween alignitens-center">
          <div class="flex alignitens-center">
            <h1>Projetos</h1>
            <div class="">
              <button class="btn btn-sm mx-15" type="button"
                v-if="projetoExibir.id == null"
                @click="toggleModalCriarProjeto()">
                Criar Projeto +
              </button>

              <router-link v-if="projetoExibir.id != null && !projetoExibir.editMode" to='/projetosListV2'
                class="btn ml-15 mr-10 my-5 flex-center-combo" style="display: inline-flex;">
                <i class="fi fi-rr-arrow-small-left"></i> Voltar
              </router-link>

              <button v-if="projetoExibir.id != null && !projetoExibir.editMode" class="btn mx-10 my-5" type="button" 
                @click="toggleFixarProjeto(projetoExibir)">
                {{ projetoExibir.fixado ? 'Desafixar' : 'Fixar' }}
              </button>

              <button v-if="projetoExibir.id != null && !projetoExibir.editMode" class="btn mx-10 my-5" type="button" 
                @click="toggleEdicaoProjeto(projetoExibir)">
                Editar
              </button>

            </div>
          </div>
          <div v-if="projetoExibir.id != null">
            <div class="flex-wrap flex-center-combo justify-spacebetween">
              <button v-if="projetoExibir.editMode"
                class="btn mx-10 mr-10 my-5" type="button" 
                @click="cancelarEdicaoProjeto(projetoExibir)">
                Cancelar
              </button>
              <button v-if="projetoExibir.editMode"
                class="btn mx-10 my-5 btn" type="button" 
                @click="salvarEdicaoProjeto(projetoExibir)">
                Salvar
              </button>
              <button v-if="projetoExibir.editMode"
                class="btn mx-10 my-5 btn btn-red" type="button" 
                @click="excluirProjeto(projetoExibir)">
                Excluir
              </button>
            </div>

          </div>
        </section>

        <!-- FILTER -->
        <div class="mt-10 p-5 flex-column" v-if="projetoExibir.id == null">

          <div class="" :class="{
            'flex-wrap flex-center-combo' : !isSmallScreen,
            'flex-column' : isSmallScreen
          }">

            <div class="mr-5">
              <input @keyup="filtraListaProjeto()" name="filtroNomeProjeto" placeholder="filtro nome do projeto" type="text" v-model="filtroNomeProjeto">
            </div>

            <div class="flex flex-center-combo">
              <!-- SITUACAO -->
              <select class="smallSelect mr-5" v-model="selectedSituacao" name="situacao" id="situacao" @click="filtraListaProjeto()">
                <option value="0">Todos</option>
                <option value="1">Pendente</option>
                <option value="2">Espera</option>
                <option value="3">Pausado</option>
                <option value="4">Concluído</option>
              </select>
              <!-- PRIORIDADE -->
              <select class="smallSelect mr-15" v-model="selectedPrioridade" name="prioridade" id="prioridade" @click="filtraListaProjeto()">
                <option value="0">Todos</option>
                <option value="1">P1 Urgente</option>
                <option value="2">P2 Alta</option>
                <option value="3">P3 Media</option>
                <option value="4">P4 Baixa</option>
                <option value="5">P5 Baixissima</option>
              </select>
              <!-- <div class="mr-5">
                <button class="btn my-5 btn-sm" type="button" @click="buscaProjetos()">
                  Recarregar Lista
                </button>
              </div> -->
              <div class="mr-15">
                <button class="btn btn-sm" type="button" @click="showFilterTag = !showFilterTag">
                  Filtro Tags
                </button>
              </div>
            </div>

            <!-- MODAL DE TAGS PARA FILTRO -->
            <div v-if="showFilterTag" class="p-10 flex-column" style="top: 60px;"
              :class="{
                'menuAddTagFullscreen' : isSmallScreen,
                'menuAddTag' : !isSmallScreen
              }">

              <!-- TITULO -->
              <div class="flex justify-spacebetween flex-center-combo">
                <span>Escolha a tag:</span>
                <span>
                  <button class="btn btn-sm" type="button"
                    @click="showFilterTag = !showFilterTag">
                    <i class="fi fi-rr-x" ></i>
                  </button>
                </span>
              </div>

              <!-- LISTA DE SELECAO -->
              <div class="mb-10">
                <div v-if="listaTags.length > 0" class="flex-column">
                  <div v-for="tag in listaTags" :key="tag.id"
                    class="mt-10 flex-wrap flex-center-combo">

                    <span class="cursor-pointer iconBigger"
                      @click="removerTagNoFiltro(tag)"
                      v-if="listaTagsFiltro.findIndex(tagFiltro => tagFiltro.id === tag.id) != -1">
                      <i class="fi fi-sr-check-circle"></i>
                    </span>

                    <span class="cursor-pointer iconBigger"
                      @click="adicionaTagNoFiltro(tag)"
                      v-else>
                      <i class="fi fi-rr-circle"></i>
                    </span>

                    <span class="ml-5" :style="`color: ${tag.cor}`">
                      {{ tag.descricao }}
                    </span>
                  </div>
                </div>
              </div>
            </div>

          </div>

          <div>
            <!-- LISTA TAGS DO FILTRO -->
            <span v-if="listaTagsFiltro.length > 0" class="flex-wrap">
              <div v-for="tag in listaTagsFiltro" :key="tag.id"
                class="my-10 ml-5 mr-5 p-5"
                :style="`font-size: 0.8rem; border: 1px solid ${tag.cor}; color: ${tag.cor }`">
                {{ tag.descricao }}
              </div>
            </span>
          </div>

        </div>
      </div>

      <div>
        <!-- PROJETO LIST -->
        <section class="projetoList" v-if="projetoExibir.id == null">

          <!-- FOR EACH PROJETOS -->
          <div class="mt-10 pt-5" v-if="projetos != [] && !busyProjetosLoad && !busyProjetosDelete">

            <div v-for="projeto in projetos" :key="projeto.id">
              <!-- TITLE -->
              <!-- modelo dual column -->
              <div class="projeto ml-5 mr-15 pt-15 pb-15" :class="{ 'flex flex-center-combo' : !isSmallScreen, 'flex-column' : isSmallScreen}">
              <!-- <div class="projeto flex-column div_border_bottom_gray my-15 ml-5 mr-15 pt-5 pb-5"> -->
                
                <!-- PROJETO NOME -->
                <span class="projetoNome">
                  {{ projeto.nome }}
                </span>
                
                <!-- TAGS -->
                <!-- modelo dual column -->
                <div class="" :class="{'flex flex-center-combo' : !isSmallScreen,'flex-column mb-10' : isSmallScreen}">
                <!-- <div class="flex flex-center-combo"> -->
                <!-- <div class="flex-column mb-10"> -->

                  <!-- fixado -->
                  <div class="botaoFixado" v-if="!projetoExibir.editMode && projeto.fixado">
                    <button type="button" disabled="true"
                      class="btn btn-sm">
                      <i class="fi fi-ss-thumbtack"></i>
                    </button>
                  </div>

                  <div class="flex flex-center-combo" style="justify-content: flex-end;">

                    <!-- TAGS DO PROJETO -->
                    <div v-if="projeto.tags != null && projeto.tags.length > 0" class="projeto_tags">
                      <div v-for="tag in projeto.tags" :key="tag.id" class="projeto_tags_tag"
                        :style="`border: 1px solid ${tag.cor}; color: ${tag.cor}`">
                        {{ tag.descricao }}
                      </div>
                    </div>

                    <!-- SITUACAO -->
                    <!-- <button type="button" class="mr-10 btn btn-sm btnPrioridade"
                      :class="{
                        situacaoFixedWidth : configs.situacaoFixedWidth == true,
                        situacaoPendente : projeto.situacao == 1,
                        situacaoAguardandoResposta : projeto.situacao == 2,
                        situacaoPausado : projeto.situacao == 3,
                        situacaoConcluido : projeto.situacao == 4,
                      }">
                      {{ projeto.situacao }}-
                      {{ projeto.situacaoDescritivo }}
                    </button> -->
                    <div class="mr-10 btnSituacao" style="line-height: 0; font-size: 1.5rem;">
                      <i v-if="projeto.situacao == 1" class="fi fi-rr-square"></i>
                      <i v-if="projeto.situacao == 2" class="fi fi-rr-user-time"></i>
                      <i v-if="projeto.situacao == 3" class="fi fi-rr-pause"></i>
                      <i v-if="projeto.situacao == 4" class="fi fi-rr-checkbox"></i>
                    </div>

                    <!-- PRIORIDADE -->
                    <button type="button" class="mr-15 btn btn-sm btnPrioridade"
                      :class="{
                        prioridadeFixedWidth : configs.prioridadeFixedWidth == true,
                        smallPrioridadeUrgente : projeto.prioridade == 1,
                        smallPrioridadeAlta : projeto.prioridade == 2,
                        smallPrioridadeMedia : projeto.prioridade == 3,
                        smallPrioridadeBaixa : projeto.prioridade == 4,
                        smallPrioridadeBaixissima : projeto.prioridade == 5,
                      }">
                      P{{ projeto.prioridade }}
                    </button>
                    <!-- <div class="mr-10 btnSituacao" style="line-height: 0; font-size: 1.5rem;">
                      <i v-if="projeto.prioridade == 1" class="fi fi-rr-square-1 btn btn-sm"></i>
                      <i v-if="projeto.prioridade == 2" class="fi fi-rr-square-2 btn btn-sm"></i>
                      <i v-if="projeto.prioridade == 3" class="fi fi-rr-square-3 btn btn-sm"></i>
                      <i v-if="projeto.prioridade == 4" class="fi fi-rr-square-4 btn btn-sm"></i>
                      <i v-if="projeto.prioridade == 5" class="fi fi-rr-square-5 btn btn-sm"></i>
                    </div> -->

                    <router-link :to='getProjetoUrl(projeto)' class="mr-10 btn btnBgOnly" style="line-height: 0; font-size: 1.5rem;">
                      <i class="fi fi-rr-folder-open"></i>
                    </router-link>
                  </div>
                  
                </div>

              </div>

            </div>
          </div>
        </section>

        <div class="my-5 py-5" v-if="busyProjetosLoad">
          <InlineLoader
            :textoAguarde="true"
            :busy="busyProjetosLoad"
            :center="true">
          </InlineLoader>
        </div>

        <!-- PROJETO SHOW -->
        <section class="projetoShow my-10 p-10 mx-5" v-if="projetoExibir.id != null">
        <div v-if="projetoExibir.id != null">

          <InlineLoader
            :textoAguarde="true"
            :busy="busyProjetosUpdate || busyProjetosDelete"
            :center="true">
          </InlineLoader>

          <div class="flex-column">
            <!-- COL 1 DADOS E TAREFAS -->
            <div class="mr-5">
              <div class="mb-15">
                <div class="mb-5">
                  <!-- <span class="projetoShowLabel">Projeto: </span> -->
                  
                  <div v-if="!projetoExibir.editMode" class="mb-10 projetoShowLabel whitespace-pre">
                    {{ projetoExibir.nome }}
                  </div>
                  <div v-if="projetoExibir.editMode">
                    <input name="atividade" type="text" v-model="projetoExibir.nomeEditar">
                  </div>
                  
                  <span v-if="!projetoExibir.editMode" class="">
                    <!-- FIXADO -->
                      <!-- SITUACAO -->
                      <button type="button" class="btn btn-sm btnPrioridade mr-5"
                        :class="{
                          situacaoFixedWidth : configs.situacaoFixedWidth == true,
                          situacaoPendente : projetoExibir.situacao == 1,
                          situacaoAguardandoResposta : projetoExibir.situacao == 2,
                          situacaoPausado : projetoExibir.situacao == 3,
                          situacaoConcluido : projetoExibir.situacao == 4,
                        }">
                        {{ projetoExibir.situacao }}-{{ projetoExibir.situacaoDescritivo }}
                      </button>
                      <!-- PRIORIDADE -->
                      <button type="button" class="btn btn-sm btnPrioridade mr-5"
                        :class="{
                          prioridadeFixedWidth : configs.prioridadeFixedWidth == true,
                          prioridadeUrgente : projetoExibir.prioridade == 1,
                          prioridadeAlta : projetoExibir.prioridade == 2,
                          prioridadeMedia : projetoExibir.prioridade == 3,
                          prioridadeBaixa : projetoExibir.prioridade == 4,
                          prioridadeBaixissima : projetoExibir.prioridade == 5,
                        }">
                        {{ projetoExibir.prioridade }}-{{ projetoExibir.prioridadeDescritivo }}
                      </button>
                  </span>

                </div>
              </div>

              <div class="mb-15">

                <div v-if="projetoExibir.editMode" :class="{ 'flex' : isSmallScreen, 'flex-column' : !isSmallScreen}">

                  <div class="marginVerticalSpacer" :class="{ 'flex' : !isSmallScreen, 'flex-column' : isSmallScreen}">
                    <button type="button" class="btn my-5 btn-sm btnPrioridade mr-5 situacaoPendente"
                      :class="{selected : projetoExibir.situacaoEditar == 1}"
                      @click="toggleEditarSituacao(projetoExibir, 1)">
                      0-Pendente
                    </button>
                    <button type="button" class="btn my-5 btn-sm btnPrioridade mr-5 situacaoAguardandoResposta"
                      :class="{selected : projetoExibir.situacaoEditar == 2}"
                      @click="toggleEditarSituacao(projetoExibir, 2)">
                      1-Espera
                    </button>
                    <button type="button" class="btn my-5 btn-sm btnPrioridade mr-5 situacaoPausado"
                      :class="{selected : projetoExibir.situacaoEditar == 3}"
                      @click="toggleEditarSituacao(projetoExibir, 3)">
                      2-Suspenso
                    </button>
                    <button type="button" class="btn my-5 btn-sm btnPrioridade mr-5 situacaoConcluido"
                      :class="{selected : projetoExibir.situacaoEditar == 4}"
                      @click="toggleEditarSituacao(projetoExibir, 4)">
                      3-Concluído
                    </button>
                  </div>
                  

                  <div class="marginVerticalSpacer" :class="{ 'flex' : !isSmallScreen, 'flex-column ml-10' : isSmallScreen}">
                    <button type="button" class="btn my-5 btn-sm btnPrioridade mr-5 prioridadeUrgente"
                      :class="{selected : projetoExibir.prioridadeEditar == 1}"
                      @click="toggleEditarPrioridade(projetoExibir, 1)">
                      P1
                    </button>
                    <button type="button" class="btn my-5 btn-sm btnPrioridade mr-5 prioridadeAlta"
                      :class="{selected : projetoExibir.prioridadeEditar == 2}"
                      @click="toggleEditarPrioridade(projetoExibir, 2)">
                      P2
                    </button>
                    <button type="button" class="btn my-5 btn-sm btnPrioridade mr-5 prioridadeMedia"
                      :class="{selected : projetoExibir.prioridadeEditar == 3}"
                      @click="toggleEditarPrioridade(projetoExibir, 3)">
                      P3
                    </button>
                    <button type="button" class="btn my-5 btn-sm btnPrioridade mr-5 prioridadeBaixa"
                      :class="{selected : projetoExibir.prioridadeEditar == 4}"
                      @click="toggleEditarPrioridade(projetoExibir, 4)">
                      P4
                    </button>
                    <button type="button" class="btn my-5 btn-sm btnPrioridade mr-5 prioridadeBaixissima"
                      :class="{selected : projetoExibir.prioridadeEditar == 5}"
                      @click="toggleEditarPrioridade(projetoExibir, 5)">
                      P5
                    </button>
                  </div>

                </div>
              </div>

              <!-- PROJETOS FOTOS LINKS -->
              <div class="mb-15">
                <div class="mb-15 flex-wrap">
                  <span class="projetoShowLabel mr-15">Fotos Links: </span>

                  <button class="btn btn-sm mr-15" type="button" @click="toggleModalCriarProjetofoto(projetoExibir)">Criar Foto Link +</button>

                  <button class="btn btn-sm mr-5" type="button" @click="toggleCollapsarProjetosfotos()" v-if="projetoExibir.projetosfotos.length > 0">Mostrar Fotos</button>
                </div>

                <div v-if="projetoExibir.projetosfotos.length > 0 && !collapsarProjetosfotos">
                  <div class="flex-wrap">

                    <!-- CADA PROJETO FOTO -->
                    <div v-for="projetofoto in projetoExibir.projetosfotos" :key="projetofoto.id" >
                      <div class="flex-column div_border_gray ml-5 mr-5 p-5 mb-5">
                          <div class="mb-10">
                            {{ projetofoto.descricao }}
                            <button class="btn btn-sm btn_tarefa_concluida" type="button" 
                              @click="toggleModalEditarProjetofoto(projetofoto,projetoExibir)" >
                              Editar
                            </button> 
                          </div>
                          <div>
                            <img :src="projetofoto.link" class="projetofoto" />
                          </div>
                      </div>
                    </div>

                  </div>
                </div>
              </div>

              <!-- PROJETOS TAGS -->
              <div class="mb-15 flex-column div_border_bottom_gray">

                <div class="flex-wrap mb-10">
                  <span class="projetoShowLabel mr-5">Tags: </span>
                  
                  <button class="btn btn-sm" type="button" @click="toggleAdicionarTag(projetoExibir)">
                    <i class="fi fi-rr-menu-dots" ></i>
                  </button>

                  <!-- LISTA TAGS DO PROJETO -->
                  <span v-if="projetoExibir.tags != null && projetoExibir.tags.length > 0" class="flex-wrap">
                    <div v-for="tag in projetoExibir.tags" :key="tag.id"
                      class="ml-5 mr-5 p-5"
                      :style="`font-size: 0.8rem; border: 1px solid ${tag.cor}; color: ${tag.cor }`">
                      {{ tag.descricao }}
                    </div>
                  </span>

                  <InlineLoader
                    :textoAguarde="false"
                    :busy="busyProjetosUpdateTags"
                    :center="false">
                  </InlineLoader>
                </div>

                <div v-if="showAddTag" class="p-10 flex-column"
                  :class="{'menuAddTagFullscreen' : isSmallScreen, 'menuAddTag' : !isSmallScreen}">

                  <div class="flex justify-spacebetween flex-center-combo" style="height: 30px">
                    <span>
                      Escolha a tag:
                      <span class="ml-5">
                        <InlineLoader
                          :textoAguarde="false"
                          :busy="busyCreateNewTag || busyProjetosUpdateTags"
                          :center="false">
                        </InlineLoader>
                      </span>
                    </span>
                    <span v-if="isSmallScreen">
                      <button class="btn btn-sm" type="button" @click="toggleAdicionarTag(projetoExibir)">
                        <i class="fi fi-rr-x" ></i>
                      </button>
                    </span>
                  </div>

                  <!-- SELECIONAR TAG -->
                  <div class="mb-10">

                    <div v-if="listaTags.length > 0" class="flex-column">

                      <div v-for="tag in listaTags" :key="tag.id"
                        class="mt-10 flex flex-center-combo"
                        :style="`color: ${tag.cor }`">

                        <span :disabled="busyProjetosUpdateTags" class="flex flex-center-combo cursor-pointer iconBigger"
                          @click="removerTagProjeto(projetoExibir, tag)"
                          v-if="projetoExibir.tags != null && projetoExibir.tags.findIndex(tagProjeto => tagProjeto.id === tag.id) != -1">
                          <i class="fi fi-sr-check-circle"></i>
                        </span>
                        <span :disabled="busyProjetosUpdateTags" class="flex flex-center-combo cursor-pointer iconBigger"
                          @click="salvaTagNoProjeto(projetoExibir, tag)"
                          v-else>
                          <i class="fi fi-rr-circle"></i>
                        </span>

                        <span class="ml-5" :style="`color: ${tag.cor }`">
                          {{ tag.descricao }}
                        </span>
                      </div>

                    </div>
                  </div>

                  <!-- CRIAÇÃO DE NOVA TAG -->
                  <div class="mb-10 flex-column">
                    <div class="mb-10 flex flex-center-combo">
                      <input :disabled="busyCreateNewTag || busyProjetosUpdateTags"
                        class="inlineInput" name="nome" type="text"
                        placeholder="nova tag" v-model="novaTagDescricao">
                      <input :disabled="busyCreateNewTag || busyProjetosUpdateTags"
                        class="ml-5 inlineInput" name="cor" type="color"
                        placeholder="nome" v-model="novaTagCor">
                      <button :disabled="busyCreateNewTag || busyProjetosUpdateTags"
                        type="button" class="ml-5 my-5 btn btn-icon-bigger" @click="criarNovaTag()">
                        <i class="fi fi-rr-check-circle"></i>
                      </button>
                    </div>

                    <InlineLoader
                      :textoAguarde="true"
                      :busy="busyCreateNewTag || busyProjetosUpdateTags"
                      :center="true">
                    </InlineLoader>

                  </div>

                </div>
                
              </div>


              <!-- TAREFAS -->
              <div class="mb-15 div_border_bottom_gray">
                <div class="mb-15 flex-wrap">
                  <span class="projetoShowLabel mr-15">Tarefas: </span>
                  <button class="btn btn-sm mr-15" type="button" @click="toggleModalCriarTarefa(projetoExibir)">Criar Tarefa +</button>
                  <button class="btn btn-sm mr-15" type="button" @click="toggleExibirTarefasConcluidas()" v-if="projetoExibir.tarefas.length > 0">Mostrar Concluídas</button>
                  <button class="btn btn-sm mr-15" type="button" @click="toggleCollapsarTarefas()" v-if="projetoExibir.tarefas.length > 0">
                    <span v-if="!collapsarTarefas"><i class="fi fi-rr-eye-crossed"></i></span>
                    <span v-if="collapsarTarefas"><i class="fi fi-rr-eye"></i></span>
                  </button>
                  <button class="btn btn-sm mr-15" type="button" @click="toggleShowBulkActionTarefa()" v-if="!collapsarTarefas && projetoExibir.tarefas.length > 0">
                    <span v-if="!showBulkActionTarefa"><i class="fi fi-rr-trash"></i></span>
                    <span v-if="showBulkActionTarefa"><i class="fi fi-rr-arrow-left"></i> <i class="fi fi-rr-ban"></i></span>
                  </button>
                  <button class="btn btn-sm mr-15" type="button" @click="deleteTarefasBulk(projetoExibir)" v-if="!collapsarTarefas && showBulkActionTarefa && projetoExibir.tarefas.length > 0">
                    <i class="fi fi-rr-trash"></i> Apagar
                  </button>
                </div>

                <div v-if="projetoExibir.tarefas.length > 0 && !collapsarTarefas">
                  <!-- CADA TAREFA -->
                  <div v-for="tarefa in projetoExibir.tarefas" :key="tarefa.id" >
                    <div class="tarefa"
                      :class="{ 'tarefaSelected' : tarefa.selected, 'clickableTarefa' : showBulkActionTarefa }"
                      @click="toggleTarefaSelected(tarefa)"
                      v-if="tarefa.situacao == 0 || (exibirTarefasConcluidas)">
                      
                      <div class="flex-column">

                        <div class="" :class="{
                          'flex-wrap': !isSmallScreen,
                          'flex-column' : isSmallScreen
                        }">

                          <div class="flex-wrap flex-center-combo ml-5 mr-5">
                            <div class="iconBigTarefa flex flex-center-combo" >
                              <span class="mr-10 check-pendente" v-if="tarefa.situacao == 0"><i class="fi fi-sr-square"></i></span>
                              <span class="mr-10 check-concluido" v-if="tarefa.situacao == 1"><i class="fi fi-rr-checkbox"></i></span>
                              <span class="mr-10 check-falhado" v-if="tarefa.situacao == 2"><i class="fi fi-sr-square-x"></i></span>
                            </div>
                            <!-- <div>
                              <span class="ml-5 iconBigTarefa flex flex-center-combo" v-if="showBulkActionTarefa">
                                <i v-if="!tarefa.selected" class="fi fi-rs-horizontal-rule"></i>
                                <i v-if="tarefa.selected" class="fi fi-rs-check"></i>
                              </span>
                            </div> -->
                          </div>
                          
                          <div class="mr-5 flex flex-center-combo">
                            <span :class="{
                              'prioridade semPrioridade' : tarefa.prioridade == null,
                              'prioridade p1' : tarefa.prioridade == 1,
                              'prioridade p2' : tarefa.prioridade == 2,
                              'prioridade p3' : tarefa.prioridade == 3,
                              'prioridade p4' : tarefa.prioridade == 4,
                              'prioridade p5' : tarefa.prioridade == 5
                            }">{{ tarefa.prioridade != null ? 'Prioridade '+ tarefa.prioridade : 'Não possui' }}</span>
                          </div>

                          <div :class="{'mt-10 mb-10': isSmallScreen}">

                            <button class="btn btn-sm btn-clear sbtn_tarefa_concluida" type="button" 
                              @click="toggleModalEditarTarefa(tarefa,projetoExibir)" >
                              Editar
                            </button>

                            <button v-if="!tarefa.editMode" class="btn btn-sm btn-clear btn_tarefa_concluida ml-10 mr-10" type="button" 
                              :disabled="tarefa.busyTarefasUpdate || tarefa.busyTarefasDelete"
                              @click="togglePrioridadesTarefa(tarefa)">
                                <i class="fi fi-sr-priority-importance"></i>
                            </button>

                            <span v-if="tarefa.showMenuPrioridades">
                              <button v-if="tarefa.showMenuPrioridades" class="btn btn-sm p1 mr-10" type="button"
                                :disabled="tarefa.busyTarefasUpdate || tarefa.busyTarefasDelete"
                                @click="updatePrioridade(tarefa, 1)">P1
                              </button>
                              <button v-if="tarefa.showMenuPrioridades" class="btn btn-sm p2 mr-10" type="button"
                                :disabled="tarefa.busyTarefasUpdate || tarefa.busyTarefasDelete"
                                @click="updatePrioridade(tarefa, 2)">P2
                              </button>
                              <button v-if="tarefa.showMenuPrioridades" class="btn btn-sm p3 mr-10" type="button"
                                :disabled="tarefa.busyTarefasUpdate || tarefa.busyTarefasDelete"
                                @click="updatePrioridade(tarefa, 3)">P3
                              </button>
                              <button v-if="tarefa.showMenuPrioridades" class="btn btn-sm p4 mr-10" type="button"
                                :disabled="tarefa.busyTarefasUpdate || tarefa.busyTarefasDelete"
                                @click="updatePrioridade(tarefa, 4)">P4
                              </button>
                              <button v-if="tarefa.showMenuPrioridades" class="btn btn-sm p5 mr-10" type="button"
                                :disabled="tarefa.busyTarefasUpdate || tarefa.busyTarefasDelete"
                                @click="updatePrioridade(tarefa, 5)">P5
                              </button>
                              <button v-if="tarefa.showMenuPrioridades" class="btn btn-sm semPrioridade mr-10" type="button"
                                :disabled="tarefa.busyTarefasUpdate || tarefa.busyTarefasDelete"
                                @click="updatePrioridade(tarefa, null)">x
                              </button>
                            </span>

                          </div>

                          <InlineLoader class="ml-20"
                            :textoAguarde="false"
                            :busy="tarefa.busyTarefasUpdate || tarefa.busyTarefasDelete"
                            :center="true">
                          </InlineLoader>

                        </div>

                        <div class="">
                          <div class="mt-10">
                            <span class="data_com_tarefa">
                              {{
                                tarefa.datahoraFormatted != null ?
                                `${tarefa.datahoraWeekday}, ${tarefa.datahoraFormatted}` :
                                '___ __/__/__ __:__'
                              }}
                            </span>
                            <span class="mr-5 ml-5">
                              <i class="fi fi-rr-arrow-small-right"></i>
                            </span>
                            <span>
                              {{ tarefa.descricao }}
                            </span>
                          </div>
                        </div>

                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div style="flex-grow: 2;">
              <!-- ANOTAÇÕES -->
              <div class="mb-15">
                <div class="mb-10">
                  <span class="projetoShowLabel">Anotações: </span>
                  <span v-if="timeoutIDUpdateProjeto != null" class="p-5 px-5 div_border_gray">Pendente...</span>
                  <span v-if="timeoutIDUpdateProjeto == null" class="p-5 px-5 div_border_gray">Salvo</span>
                </div>
                <div v-if="!projetoExibir.editMode" class="whitespace-pre mb-5 linhaBox">
                  {{ projetoExibir.anotacoes }}
                </div>
                <div v-if="projetoExibir.editMode" class="mb-30 pb-30">
                  <textarea
                    id="projetoExibirAnotacoesEditarTextarea"
                    class="textarea"
                    name="anotacoes"
                    placeholder="anotacoes"
                    @keydown="registrarDebounceUpdateProjeto(projetoExibir)"
                    v-model="projetoExibir.anotacoesEditar">
                  </textarea>
                </div>
              </div>
            </div>
          </div>


        </div>
        </section>

      </div>
  </div>

    <Notifier ref="notifier"></Notifier>

    <ModalCriarProjeto
      v-model:exibirModal="exibirModalCriarProjeto"
      @reloadListaProjetosHabitTracker="buscaProjetos()">
    </ModalCriarProjeto>

    <ModalCriarTarefa
      v-model:exibirModal="exibirModalCriarTarefa"
      :projeto="projetoModalNovaTarefa"
      @updateTaskEvent="guardarNovaTarefa">
    </ModalCriarTarefa>
    
    <ModalEditarTarefa
      v-model:exibirModal="exibirModalEditarTarefa"
      :tarefa="tarefaModalEditarTarefa"
      :projeto="projetoModalEditarTarefa"
      @updateTaskEvent="guardarTarefaAtualizada"
      @deletedTaskEvent="removeTarefaExcluida">
    </ModalEditarTarefa>

    <ModalCriarProjetofoto
      v-model:exibirModal="exibirModalCriarProjetofoto"
      :projeto="projetoModalNovoProjetofoto"
      @createdProjetofotoEvent="guardarNovoProjetofoto">
    </ModalCriarProjetofoto>

    <ModalEditarProjetofoto
      v-model:exibirModal="exibirModalEditarProjetofoto"
      :projetofoto="projetofotoModalEditarProjetofoto"
      :projeto="projetoModalEditarProjetofoto"
      @updatedProjetofotoEvent="guardarProjetofotoAtualizado">
    </ModalEditarProjetofoto>

  </div>
</template>

<script>
import DateTime from '@/core/DateTime.js'
import Request from '@/core/request.js';
import config from '@/core/config.js'
import UrlBuilder from '../../core/urlBuilder';
import QueryStringConverter from '@/core/QueryStringConverter.js'
import Loader from '@/components/Loader.vue';
import InlineLoader from '@/components/InlineLoader.vue';
import Notifier from '@/components/Notifier.vue';
import ModalCriarProjeto from '@/views/projetos/ModalCriarProjeto.vue';
import ModalCriarTarefa from '@/views/projetos/ModalCriarTarefa.vue';
import ModalEditarTarefa from '@/views/projetos/ModalEditarTarefa.vue';
import ModalCriarProjetofoto from '@/views/projetos/ModalCriarProjetofoto.vue';
import ModalEditarProjetofoto from '@/views/projetos/ModalEditarProjetofoto.vue';
import BackupProjetos from "@/views/projetos/BackupProjetos.vue";
import TarefasApi from '../../core/apis/TarefasApi';

export default {
  name: 'HabitTracker',
  components: {
    Loader,
    InlineLoader,
    ModalCriarProjeto,
    ModalCriarTarefa,
    ModalEditarTarefa,
    ModalCriarProjetofoto,
    ModalEditarProjetofoto,
    BackupProjetos,
    Notifier,
  },
  inject: ['configuracoes'],
  data: () => {
    return {
      configs: {
        situacaoFixedWidth: false,
        prioridadeFixedWidth: false
      },
      busyProjetosLoad: false,
      busyProjetosDelete: false,
      busyProjetosUpdate: false,
      busyTarefasLoad: false,
      dataPrazo: '',
      projetos: [],
      projetoBackup: [],
      exibirModalCriarProjeto: false,
      exibirModalCriarTarefa: false,
      exibirModalEditarTarefa: false,
      projetoModalNovaTarefa: [],
      tarefaModalEditarTarefa: [],
      projetoModalEditarTarefa: [],
      exibirModalBackupProjetos: false,
      carregarPreviamenteAsTarefas: true,
      filtroPrioridade: null,
      filtroSituacao: null,
      nextProgramedListingAmount: 0,
      filtroNomeProjeto: '',
      filtroTag: '',
      exibirTarefasConcluidas: false,
      collapsarTarefas: false,
      projetoExibir: [],
      selectedSituacao: 0,
      selectedPrioridade: 0,
      
      exibirModalCriarProjetofoto: false,
      projetoModalNovoProjetofoto: [],
      exibirModalEditarProjetofoto: false,
      projetoModalEditarProjetofoto: [],
      projetofotoModalEditarProjetofoto: [],
      collapsarProjetosfotos: true,

      listaTagsFiltro: [],

      busyProjetosUpdateTags: false,
      busyCreateNewTag: false,
      showAddTag: false,
      novaTagDescricao: null,
      novaTagCor: null,
      tagAddProjeto: null,
      showFilterTag: false,
      listaTags: [],

      showBulkActionTarefa: false,
      
      windowWidth: 0,
      windowHeight: 0,

      timeoutIDUpdateProjeto: null,
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

    getProjetoUrl(projeto) {
      return UrlBuilder.getProjetoUrl(projeto);
    },

    toggleAdicionarTag(){
      this.showAddTag = !this.showAddTag;
    },

    registrarDebounceUpdateProjeto(projetoEditar){
      const tempo = 3;
      if(this.timeoutIDUpdateProjeto != null){
        window.clearTimeout(this.timeoutIDUpdateProjeto);
      }
      this.timeoutIDUpdateProjeto = window.setTimeout(() => {
        const sairDaEdicao = false;
        this.salvarEdicaoProjeto(projetoEditar, sairDaEdicao)
        this.timeoutIDUpdateProjeto = null;
      }, tempo * 1000);
    },

    toggleTarefaSelected(tarefa){
      if(!this.showBulkActionTarefa) return;
      tarefa.selected = !tarefa.selected;
    },

    toggleShowBulkActionTarefa() {
      this.showBulkActionTarefa = !this.showBulkActionTarefa
    },

    togglePrioridadesTarefa(tarefa) {
      tarefa.showMenuPrioridades = !tarefa.showMenuPrioridades
    },

    showProjetoFromQueryIdProjeto() {
      if(this.$route.params.idProjeto != undefined && this.$route.params.idProjeto != null && this.$route.params.idProjeto != '') {
        const projeto = this.findProjeto(this.$route.params.idProjeto)
        this.toggleShowProjeto(projeto);
      } else {
        this.hideProjeto(this.projetoExibir)
      }
    },

    findProjeto(idProjeto){
      for (let i = 0; i < this.projetos.length; i++) {
        if(this.projetos[i].id == idProjeto){
          return this.projetos[i];
        }
      }
    },

    /**
     * FUNCOES TOGGLE
     */
    toggleShowProjeto(projeto) {
      this.hideProjeto(projeto)
      projeto.selected = true
      this.projetoExibir = projeto
    },
    hideProjeto(projeto) {
      this.projetoExibir.selected = false
      projeto.selected = false
      this.projetoExibir = []
    },

    guardarNovaTarefa(novaTarefa)
    {
      console.log("novaTarefa",novaTarefa);
      console.log("projetos",this.projetos);
      console.log("projetoBackup",this.projetoBackup);

      for (let i = 0; i < this.projetos.length; i++) {
        if(this.projetos[i].id == novaTarefa.projeto){
          this.projetos[i].tarefas.push(novaTarefa);
          break;
        }
      }
      // for (let i = 0; i < this.projetoBackup.length; i++) {
      //   if(this.projetoBackup[i].id == novaTarefa.projeto){
      //     this.projetoBackup[i].tarefas.push(novaTarefa);
      //     break;
      //   }
      // }
    },

    guardarNovoProjetofoto(novo)
    {
      console.log("novo projeto foto",novo);
      console.log("projetos",this.projetos);
      console.log("projetoBackup",this.projetoBackup);

      for (let i = 0; i < this.projetos.length; i++) {
        if(this.projetos[i].id == novo.projeto){
          this.projetos[i].projetosfotos.push(novo);
          break;
        }
      }
      // for (let i = 0; i < this.projetoBackup.length; i++) {
      //   if(this.projetoBackup[i].id == novaTarefa.projeto){
      //     this.projetoBackup[i].tarefas.push(novaTarefa);
      //     break;
      //   }
      // }
    },

    guardarTarefaAtualizada(tarefaAtualizada){
      for (let i = 0; i < this.projetos.length; i++) {
        if(this.projetos[i].id == tarefaAtualizada.projeto){
          for (let j = 0; j < this.projetos[i].tarefas.length; j++) {
            if(this.projetos[i].tarefas[j].id == tarefaAtualizada.id){
              this.projetos[i].tarefas[j] = tarefaAtualizada
              break;
            }
          }
        }
      }
      // for (let i = 0; i < this.projetoBackup.length; i++) {
      //   if(this.projetoBackup[i].id == tarefaAtualizada.projeto){
      //     for (let j = 0; j < this.projetoBackup[i].tarefas.length; j++) {
      //       if(this.projetoBackup[i].tarefas[j].id == tarefaAtualizada.id){
      //         this.projetoBackup[i].tarefas[j] = tarefaAtualizada
      //         break;
      //       }
      //     }
      //   }
      // }
    },

    
    removeTarefaExcluida(tarefaExcluida)
    {
      for (let i = 0; i < this.projetos.length; i++) {
        if(this.projetos[i].id == tarefaExcluida.projeto){
          let tarefas = this.projetos[i].tarefas
          const indice = tarefas.findIndex(tarefa => tarefa.id === tarefaExcluida.id);
          console.log('id para remover encontrado: ', indice);
          // Se o elemento foi encontrado (índice não é -1)
          if (indice !== -1) {
            console.log('removido');
            tarefas.splice(indice, 1);
          }
          this.projetos[i].tarefas = tarefas;
        }
      }
    },

    guardarProjetofotoAtualizado(projetofotoAtualizado){
      for (let i = 0; i < this.projetos.length; i++) {
        if(this.projetos[i].id == projetofotoAtualizado.projeto){
          for (let j = 0; j < this.projetos[i].projetosfotos.length; j++) {
            if(this.projetos[i].projetosfotos[j].id == projetofotoAtualizado.id){
              if(projetofotoAtualizado.excluido == true){
                delete(this.projetos[i].projetosfotos[j]);
              } else {
                this.projetos[i].projetosfotos[j] = projetofotoAtualizado
              }
              break;
            }
          }
        }
      }
    },

    
    toggleCollapsarTarefas()
    {
      this.collapsarTarefas = !this.collapsarTarefas;
    },

    toggleCollapsarProjetosfotos()
    {
      this.collapsarProjetosfotos = !this.collapsarProjetosfotos;
    },
    
    toggleExibirTarefasConcluidas()
    {
      this.exibirTarefasConcluidas = !this.exibirTarefasConcluidas;
    },

    toggleModalCriarProjeto () {
      this.exibirModalCriarProjeto = true;
    },

    toggleModalCriarTarefa (projeto) {
      this.projetoModalNovaTarefa = projeto
      this.exibirModalCriarTarefa = true;
    },
    toggleModalEditarTarefa (tarefa, projeto) {
      this.tarefaModalEditarTarefa = tarefa
      this.exibirModalEditarTarefa = true;
      this.projetoModalEditarTarefa = projeto
    },

    toggleFiltroSituacao(novaSituacao){
      this.filtroSituacao = novaSituacao;
    },
    toggleFiltroPrioridade(novaPrioridade){
      this.filtroPrioridade = novaPrioridade;
    },

    toggleModalCriarProjetofoto (projeto) {
      this.projetoModalNovoProjetofoto = projeto
      this.exibirModalCriarProjetofoto = true;
    },
    toggleModalEditarProjetofoto (projetofoto, projeto) {
      this.projetofotoModalEditarProjetofoto = projetofoto
      this.exibirModalEditarProjetofoto = true;
      this.projetoModalEditarProjetofoto = projeto
    },

    /**
     * EDIT FORMS
     */
    toggleEdicaoProjeto(projeto) {
      projeto.prioridadeEditar = projeto.prioridade;
      projeto.situacaoEditar = projeto.situacao;
      projeto.editMode = !projeto.editMode
      if(projeto.editMode == true){
        // configuração para autosize
        setTimeout(() => {
          let element = document.getElementById('projetoExibirAnotacoesEditarTextarea');
          if(element != null) {
            console.log('event added');
            element.addEventListener('input', function(e){
              this.style.height = this.scrollHeight + 1 + 'px';
            })
            element.style.height = element.scrollHeight + 3 + 'px';
          }
        }, 1);
      }
    },

    toggleFixarProjeto(projeto) {
      // ask for confirmation
      this.busyProjetosDelete = true;
      let requestData = {
        'url': `${config.serverUrl}/projetos/${projeto.id}/fixar-desafixar`,
        'headers': new Headers({'Content-Type': 'application/json'}),
        'method' : 'POST',
      };
      return Request.fetch(requestData).then(([response, data]) => {
        this.busyProjetosDelete = false;
        if(projeto.fixado == false) {
          this.$refs.notifier.notify('Projeto fixado!')
        } else {
          this.$refs.notifier.notify('Projeto desafixado!')
        }
        projeto.fixado = !projeto.fixado
      }).catch((error) => {
        console.error(error);
        this.busyProjetosDelete = false;
        this.$refs.notifier.notify(`Ocorreu um erro: ${error}`, true)
      });
    },
    cancelarEdicaoProjeto(projeto) {
      this.toggleEdicaoProjeto(projeto)
      projeto.nomeEditar = projeto.nome;
      projeto.anotacoesEditar = projeto.anotacoes;
    },

    salvarEdicaoProjeto(projeto, sairDaEdicao = true) {
      console.log(projeto.nomeEditar)
      console.log(projeto.anotacoesEditar)
      projeto.nome = projeto.nomeEditar
      projeto.anotacoes = projeto.anotacoesEditar
      projeto.prioridade = projeto.prioridadeEditar
      projeto.situacao = projeto.situacaoEditar
      console.log(projeto);
      this.updateProjeto(projeto, sairDaEdicao);
    },

    toggleEditarSituacao(projeto, novaSituacao){
      projeto.situacaoEditar = novaSituacao;
    },
    toggleEditarPrioridade(projeto, novaPrioridade){
      projeto.prioridadeEditar = novaPrioridade;
    },


    excluirProjeto(projeto) {
      // ask for confirmation
      if(!confirm("Deseja apagar o projeto?")){
        return;
      }
      console.log(projeto.id);
      this.busyProjetosDelete = true;
      let requestData = {
        'url': `${config.serverUrl}/projetos/${projeto.id}`,
        'headers': new Headers({'Content-Type': 'application/json'}),
        'method' : 'DELETE',
      };
      return Request.fetch(requestData).then(([response, data]) => {
        this.busyProjetosDelete = false;
        this.$refs.notifier.notify('Projeto excluído!')
        this.toggleEdicaoProjeto(projeto)
        this.buscaProjetos();
      }).catch((error) => {
        console.error(error);
        this.busyProjetosDelete = false;
        this.$refs.notifier.notify(`Ocorreu um erro: ${error}`, true)
      });
    },

    /**
     * FUNCOES FETCH API
     */
    deleteTarefasBulk(projeto) {
      // ask for confirmation
      if(!confirm("Deseja apagar as tarefas selecionadas? <br> [lista de tarefas]")){
        return;
      }

      projeto.tarefas.forEach(async tarefa => {
        if(!tarefa.selected) {
          return;
        }
        tarefa.busyTarefasDelete = true
        let requestData = {
          'url': config.serverUrl + '/tarefas/' + tarefa.id,
          'headers': new Headers({'Content-Type': 'application/json'}),
          'method' : 'DELETE',
        };
        let [response, data] = await Request.fetch(requestData);
        tarefa.busyTarefasDelete = false
        if(response.ok == true) {
          this.removeTarefaExcluida(tarefa);
        } else {
          console.error("ocorreu um erro: ", tarefa, response, data);
        }
      });
    },

    removerTagNoFiltro (tag) {
      const index = this.listaTagsFiltro.findIndex(tagFiltro => (tagFiltro.id == tag.id));
      if (index !== -1) {
        this.listaTagsFiltro.splice(index, 1);
      }
      this.filtraListaProjeto()
    },

    adicionaTagNoFiltro (tag) {
      this.listaTagsFiltro.push(tag);
      this.filtraListaProjeto()
    },

    salvaTagNoProjeto(projeto, novaTag)
    {
      if(this.busyProjetosUpdateTags || this.busyCreateNewTag){
        return;
      }
      if(projeto.tags == null) projeto.tags = [];
      let listaprojeto_tags = projeto.tags;
      for (let i = 0; i < listaprojeto_tags.length; i++) {
        if(listaprojeto_tags[i].id == novaTag.id){
          return;
        }
      }
      for (let i = 0; i < this.listaTags.length; i++) {
        if(this.listaTags[i].id == novaTag.id){
          novaTag = this.listaTags[i];
          break;
        }
      }
      projeto.tags.push(novaTag);
      this.updateTags(projeto);
    },

    removerTagProjeto(projeto, tagRemover)
    {
      if(this.busyProjetosUpdateTags || this.busyCreateNewTag){
        return;
      }
      let listaTags = projeto.tags
      const index = listaTags.findIndex(tag => tag.id === tagRemover.id);
      if (index !== -1) {
        console.log('removido');
        listaTags.splice(index, 1);
      }
      projeto.tags = listaTags
      this.updateTags(projeto);
    },

    validate_criarNovaTag(data){
      let error = null;
      console.log("")
      if(data.descricao == null || data.descricao == '') error = 'Favor preencher o campo descrição.';
      else if(data.cor == null || data.cor == '') error = 'Favor preencher o campo cor.';

      if(error != null) {
        this.$refs.notifier.notify(`Ocorreu um erro: ${error}`, true);
        return false;
      }
      return true;
    },

    criarNovaTag() {
      const data = {
        'descricao': this.novaTagDescricao,
        'cor': this.novaTagCor
      }
      if(!this.validate_criarNovaTag(data)) return;
      this.busyCreateNewTag = true;
      let requestData = {
        'url': `${config.serverUrl}/tags`,
        'headers': new Headers({'Content-Type': 'application/json'}),
        'method' : 'POST',
        'data': data
      };
      return Request.fetch(requestData).then(([response, data]) => {
        this.busyCreateNewTag = false;
        this.$refs.notifier.notify('Tag criada!');
        this.buscaTags();
        this.novaTagDescricao = null;
        this.novaTagCor = null;
      }).catch((error) => {
        console.error(error);
        this.busyCreateNewTag = false;
        this.$refs.notifier.notify(`Ocorreu um erro: ${error}`, true)
      });

    },


    buscaTags()
    {
      let requestData = {
        'url': `${config.serverUrl}/tags`,
      };
      Request.fetch(requestData)
      .then(([response, data]) => {
        console.log({data});
        this.listaTags = data
      })
      .catch((error) => {
        this.$refs.notifier.notify(`Ocorreu um erro: ${error}`, true)
        console.error(error);
      });
    },

    buscaProjetos (primeiraExecucao = false) {
      this.busyProjetosLoad = true;
      let params = {};
      params['loadTarefas'] = this.carregarPreviamenteAsTarefas;
      params['loadProjetosfotos'] = true;
      if(this.selectedPrioridade != null && this.selectedPrioridade > 0){
        params['prioridade'] = this.selectedPrioridade;
      }
      if(this.selectedSituacao != null && this.selectedSituacao > 0){
        params['situacao'] = this.selectedSituacao;
      }
      params['orderBy'] = 'nome,asc'
      params = QueryStringConverter.toQueryString(params, true);
      let requestData = {
        'url': `${config.serverUrl}/projetos${params}`,
      };
      Request.fetch(requestData)
      .then(([response, data]) => {
        console.log({data});
        data = this.projetosFillAdditionalProps(data)
        data = this.projetosTarefasDataHora(data)
        data = this.projetosTarefasFillAdditionalProps(data)
        data = this.projetosTarefasOrganizar(data)
        this.projetos = data
        this.projetoBackup = this.projetos
        this.busyProjetosLoad = false;
        if(primeiraExecucao) this.showProjetoFromQueryIdProjeto();
      })
      .catch((error) => {
        this.busyProjetosLoad = false;
        this.$refs.notifier.notify(`Ocorreu um erro: ${error}`, true)
        console.error(error);
      });
    },
    
    projetosTarefasDataHora(projetos){
      let dateHoje = new Date();
      for (let i = 0; i < projetos.length; i++) {
        for (let j = 0; j < projetos[i].tarefas.length; j++) {
          if(projetos[i].tarefas[j].datahora != null && projetos[i].tarefas[j].datahora != '') {
            let array = projetos[i].tarefas[j].datahora.split(" ");
            projetos[i].tarefas[j].data = array[0];
            projetos[i].tarefas[j].hora = array[1];
          }
        }
      }
      return projetos;
    },

    projetosTarefasFillAdditionalProps(projetos){
      let dateHoje = new Date();
      for (let i = 0; i < projetos.length; i++) {
        for (let j = 0; j < projetos[i].tarefas.length; j++) {
          let dateMeuDia = this.newDatetimeTz(projetos[i].tarefas[j].meuDia);
          let tarefaDeHoje = this.isSameYMD(dateMeuDia, dateHoje);
          if(tarefaDeHoje){
            projetos[i].tarefas[j].meuDiaHoje = true;
          }
          projetos[i].tarefas[j].busyTarefasUpdate = false;
          projetos[i].tarefas[j].busyTarefasDelete = false;
          projetos[i].tarefas[j].showMenuPrioridades = false
          projetos[i].tarefas[j].selected = false
        }
      }
      return projetos;
    },

    projetosTarefasOrganizar(projetos){
      let dateHoje = new Date();
      for (let i = 0; i < projetos.length; i++) {
        let tarefasPendentes = [];
        let tarefasConcluidas = [];
        for (let j = 0; j < projetos[i].tarefas.length; j++) {
          if(projetos[i].tarefas[j].situacao == 1 || projetos[i].tarefas[j].situacao == 2){
            tarefasConcluidas.push(projetos[i].tarefas[j])
          } else {
            tarefasPendentes.push(projetos[i].tarefas[j])
          }
        }
        
        tarefasConcluidas.sort(function(tarefa1,tarefa2){
          // Turn your strings into dates, and then subtract them
          // to get a value that is either negative, positive, or zero.
          return new Date(tarefa1.datahora) - new Date(tarefa2.datahora);
        });
        
        tarefasPendentes.sort(function(tarefa1,tarefa2){
          // Turn your strings into dates, and then subtract them
          // to get a value that is either negative, positive, or zero.
          return new Date(tarefa1.datahora) - new Date(tarefa2.datahora);
        });

        // finalização
        tarefasPendentes.push(...tarefasConcluidas);
        projetos[i].tarefas = tarefasPendentes
      }
      return projetos;
    },

    projetosFillAdditionalProps(projetos) {
      for (let i = 0; i < projetos.length; i++) {
        projetos[i].nomeEditar = projetos[i].nome;
        projetos[i].anotacoesEditar = projetos[i].anotacoes;
        projetos[i].prioridadeEditar = projetos[i].prioridade;
        projetos[i].situacaoEditar = projetos[i].situacao;
        projetos[i].editMode = false;
        projetos[i].selected = false;
      }
      return projetos;
    },

    updateTags(projeto) {
      this.busyProjetosUpdateTags = true;
      let body = {
        'tags': projeto.tags,
      };
      let requestData = {
        'url': `${config.serverUrl}/projetos/${projeto.id}/tags`,
        'headers': new Headers({'Content-Type': 'application/json'}),
        'method' : 'PUT',
        'data' : body
      };
      return Request.fetch(requestData).then(([response, data]) => {
        this.busyProjetosUpdateTags = false;
        this.$refs.notifier.notify('Tags do projeto salvas!')
      }).catch((error) => {
        console.error(error);
        this.busyProjetosUpdateTags = false;
        this.$refs.notifier.notify(`Ocorreu um erro: ${error}`, true)
      });
    },

    updateProjeto(projeto, sairDaEdicao = true) {
      console.log(projeto.id);
      this.busyProjetosUpdate = true;
      let body = {
        'dataPrazo': projeto.dataPrazo,
        'nome': projeto.nome,
        'anotacoes': projeto.anotacoes,
        'prioridade': projeto.prioridade,
        'situacao': projeto.situacao,
      };

      let requestData = {
        'url': `${config.serverUrl}/projetos/${projeto.id}`,
        'headers': new Headers({'Content-Type': 'application/json'}),
        'method' : 'PUT',
        'data' : body
      };
      return Request.fetch(requestData).then(([response, data]) => {
        this.busyProjetosUpdate = false;
        // this.resetFields(true)
        this.$refs.notifier.notify('Projeto salvo!')
        if(sairDaEdicao) this.toggleEdicaoProjeto(projeto)
        // this.buscaProjetos(); // nao atualiza a lista para não atrapalhar o fluxo
      }).catch((error) => {
        console.error(error);
        this.busyProjetosUpdate = false;
        this.$refs.notifier.notify(`Ocorreu um erro: ${error}`, true)
      });
    },

    updatePrioridade(tarefa, prioridade) {
      tarefa.busyTarefasUpdate = true;
      TarefasApi.updatePrioridade(tarefa, prioridade)
      .then(([response, data]) => {
        this.$refs.notifier.notify('Prioridade editada!')
        tarefa.busyTarefasUpdate = false;
        tarefa.prioridade = prioridade
      }).catch((error) => {
        console.error(error);
        tarefa.busyTarefasUpdate = false;
        this.$refs.notifier.notify('Ocorreu um erro: ' + error, true)
      });
    },
    
    loadProjetosfotos(projeto){
      this.busyProjetosfotosLoad = true;
      const params = {'projeto': projeto.id};
      let requestData = {
        'url': `${config.serverUrl}/projetosfotos${QueryStringConverter.toQueryString(params, true)}`,
      };
      Request.fetch(requestData)
      .then(([response, data]) => {
        projeto.projetosfotos = data
        this.busyProjetosfotosLoad = false;
      })
      .catch((error) => {
        this.busyProjetosfotosLoad = false;
        this.$refs.notifier.notify(`Ocorreu um erro: ${error}`, true)
        console.error(error);
      });
    },

    filtraListaProjeto()
    {
      // guarda o backup se não existir
      if(this.projetoBackup.length == 0){
        this.projetoBackup = this.projetos;
      }
      // recupera o backup para listar de forma completa
      // this.projetos = this.projetoBackup;
      let listaProjetos = this.projetoBackup;

      let arrayfilter = [];
      let nomeProjetoFiltro = this.filtroNomeProjeto.toLowerCase();
      let situacaoFiltro = this.selectedSituacao != 0 ? this.selectedSituacao : null;
      let prioridadeFiltro = this.selectedPrioridade != 0 ? this.selectedPrioridade : null;
      
      // ************************ filtro por situação
      if(situacaoFiltro != null){
        arrayfilter = [];
        for (let i = 0; i < listaProjetos.length; i++) {
          if(listaProjetos[i].situacao == situacaoFiltro){
            arrayfilter.push(listaProjetos[i])
          }
        }
        listaProjetos = arrayfilter;
      }
      
      // ************************ filtro por prioridade
      if(prioridadeFiltro != null){
        arrayfilter = [];
        for (let i = 0; i < listaProjetos.length; i++) {
          if(listaProjetos[i].prioridade == prioridadeFiltro){
            arrayfilter.push(listaProjetos[i])
          }
        }
        listaProjetos = arrayfilter;
      }
      // ************************ filtro por tags
      console.log('this.listaTagsFiltro', this.listaTagsFiltro);
      if(this.listaTagsFiltro.length > 0){
        arrayfilter = [];
        for (let i = 0; i < listaProjetos.length; i++) {
          let projetoTagValida = false;
          if(listaProjetos[i].tags == null) {
            continue;
          }
          for (let j = 0; j < listaProjetos[i].tags.length; j++) {
            for (let k = 0; k < this.listaTagsFiltro.length; k++) {
              if(listaProjetos[i].tags[j].id == this.listaTagsFiltro[k].id){
                arrayfilter.push(listaProjetos[i]);
                projetoTagValida = true
                break;
              }
              if(projetoTagValida) break;
            }
          }
        }
        listaProjetos = arrayfilter;
      }
      // ************************ filtro por texto
      if(nomeProjetoFiltro != null){
        arrayfilter = [];
        for (let i = 0; i < listaProjetos.length; i++) {
          if(listaProjetos[i].nome.toLowerCase().includes(nomeProjetoFiltro)){
            arrayfilter.push(listaProjetos[i])
          }
        }
        listaProjetos = arrayfilter;
      }
      // ************************ atribuição final
      this.projetos = arrayfilter
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
    'projetoExibir.anotacoesEditar'(a, b) {
      //this.registrarDebounceUpdateProjeto();
    },
    $route (to, from){
      this.showProjetoFromQueryIdProjeto();
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
    this.buscaProjetos(true);
    this.buscaTags();
  },
}
</script>
