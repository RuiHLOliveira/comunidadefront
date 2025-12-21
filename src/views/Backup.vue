<style>
</style>

<template>
  <div>
    <div class="container">

      <section class="darkmodeBgBlack my-10 p-10">
        <h1>Backup</h1>
      </section>
      
      <section class="darkmodeBgBlack my-10 p-10">
        <div class="mb-15">
          <h3 class="pageTitle">Baixar Backup</h3>
          <div>
            <button type="button" class="btn"  :disabled="busyExportProjetos == 1"  @click="exportProjetos()">
              Baixar Dados
              <InlineLoader :busy="busyExportProjetos"></InlineLoader>
            </button>
          </div>
          <div class="mt-10">
            <button type="button" class="btn" :disabled="busyExportProjetosTxt == 1"  @click="exportProjetosTxt()">
              Baixar Texto
              <InlineLoader :busy="busyExportProjetosTxt"></InlineLoader>
            </button>
          </div>
          <div class="mt-10">
            <button type="button" class="btn" :disabled="busyExportSqlBkp == 1"  @click="exportSqlBkp()">
              Baixar Sql
              <InlineLoader :busy="busyExportSqlBkp"></InlineLoader>
            </button>
          </div>
        </div>
      </section>

      <section class="darkmodeBgBlack my-10 p-10">
        <div class="mb-15">
          <h3 class="pageTitle">Importar Backup</h3>
          <div>
            Arquivo <input type="file" name="importfile" id="importfile" ref="importfile">
          </div>
          <div class="flex" style="margin-top: 10px;">
            <button class="btn form-input" :disabled="busyImportFile == 1" @click="importFile()">Salvar
              <InlineLoader :busy="busyImportFile"></InlineLoader>
            </button>
          </div>
        </div>
      </section>
    </div>

    <Notifier ref="notifier"></Notifier>
    <!-- <Loader :busy="busy"></Loader> -->

  </div>
</template>

<script>
import deepCopy from '@/core/deepcopy.js';
import Loader from '@/components/Loader.vue';
import Request from '@/core/request.js';
import AuthManager from '@/core/AuthManager.js';
import config from '@/core/config.js'
import Notifier from '@/components/Notifier.vue';
import InlineLoader from '@/components/InlineLoader.vue';

export default {
  name: 'Backup',
  components: {
    Loader,
    Notifier,
    InlineLoader
  },
  data: () => {
    return {
      busyExportProjetos: false,
      // busyExportProjetos: true,
      busyExportProjetosTxt: false,
      busyExportSqlBkp: false,
      // busyExportProjetosTxt: true,
      busyImportFile: false,
      fileToImport: null,
    };
  },
  methods: {
    exportSqlBkp() {
      this.busyExportSqlBkp = true;
      let requestData = {
        'url': config.serverUrl + "/backup/exportSqlBkpInsert",
        'headers': new Headers({'Content-Type': 'application/json', 'Accept': 'application/json'}),
      };
      Request.fetch(requestData).then(([response, data]) => {
        console.log(data);
        const SQL = data.arquivoSql
        const blob = new Blob([SQL], { type: 'text/plain' })
        const link = document.createElement('a')
        link.href = URL.createObjectURL(blob)
        let date = new Date();
        date = date.toISOString().substr(0, 19);
        date = date.replaceAll( ':','.');
        link.download = date + '.phpdailymanager.bkp.sql'
        link.click()
        URL.revokeObjectURL(link.href)
        this.busyExportSqlBkp = false;
      }).catch((error) => {
        this.busyExportSqlBkp = false;
        console.error(error);
        this.$refs.notifier.notify('Ocorreu um erro: ' + error, true) //this.notify(error);
      });
    },
    exportProjetos() {
      this.busyExportProjetos = true;
      let requestData = {
        'url': config.serverUrl + "/backup/exportProjetos",
        'headers': new Headers({'Content-Type': 'application/json', 'Accept': 'application/json'}),
      };
      Request.fetch(requestData).then(([response, data]) => {
        const blob = new Blob([JSON.stringify(data)], { type: 'application/json' })
        const link = document.createElement('a')
        link.href = URL.createObjectURL(blob)
        let date = new Date();
        date = date.toISOString().substr(0, 19);
        date = date.replaceAll( ':','.');
        link.download = date + '.projetos.phpdailymanager.export.json'
        link.click()
        URL.revokeObjectURL(link.href)
        this.busyExportProjetos = false;
      }).catch((error) => {
        this.busyExportProjetos = false;
        console.error(error);
        this.$refs.notifier.notify('Ocorreu um erro: ' + error, true) //this.notify(error);
      });
    },
    exportProjetosTxt() {
      this.busyExportProjetosTxt = true;
      let requestData = {
        'url': config.serverUrl + "/backup/exportProjetosTxt",
        'headers': new Headers({'Content-Type': 'application/json', 'Accept': 'application/json'}),
      };
      Request.fetch(requestData).then(([response, data]) => {
        console.log(data);
        const txt = data.arquivoTxt
        const blob = new Blob([txt], { type: 'text/plain' })
        const link = document.createElement('a')
        link.href = URL.createObjectURL(blob)
        let date = new Date();
        date = date.toISOString().substr(0, 19);
        date = date.replaceAll( ':','.');
        link.download = date + '.projetos.phpdailymanager.export.txt'
        link.click()
        URL.revokeObjectURL(link.href)
        this.busyExportProjetosTxt = false;
      }).catch((error) => {
        this.busyExportProjetosTxt = false;
        console.error(error);
        this.$refs.notifier.notify('Ocorreu um erro: ' + error, true) //this.notify(error);
      });
    },
    async importFile() {
      this.busyImportFile = true;
      
      let file = this.$refs.importfile.files[0];
      let fileJson = await file.text();
      console.log('1',fileJson);
      fileJson = JSON.parse(fileJson);
      console.log('2',fileJson);

      console.log('[fileJson2]', fileJson);

      let headers = new Headers();
      headers.append("Authorization", AuthManager.getToken());
      headers.append('Accept','application/json');

      let requestData = {
        'url': config.serverUrl + "/backup/importProjetos",
        'headers': headers,
        'method' : 'POST',
        'data' : fileJson,
      };

      Request.fetch(requestData).then(([response,data]) => {
        console.log('[response]',response);
        console.log('[data]',data);
        this.busyImportFile = false;
        this.$refs.notifier.notify('Importado! Atualize a listagem.') //this.notify('Importado! Atualize a listagem.');
        // this.fecharModal();
      }).catch((error) => {
        console.error(error);
        this.busyImportFile = false;
        this.$refs.notifier.notify('Ocorreu um erro: ' + error, true) //this.notify(error);
      });

    },
  },
  watch: {
  },
  created () {
  },
}
</script>
