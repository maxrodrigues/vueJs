Vue.filter('ucwords', function(valor){
  return valor.charAt(0).toUpperCase() + valor.slice(1)
})

Vue.component('titulo', {
  template: `
    <div class="row">
        <h1>Campeonato Brasileiro 2020</h1>
    </div>
  `
})

Vue.component('clube', {
  props: ['time'],
  template: `
  <div>
    <img :src="time.escudo" :alt="time.nome" style="width: 35px; margin: 0 25px;">
    {{ time.nome | ucwords }}
  </div>
  `
})

new Vue({
    el: '#app',
    data: {
        busca: '',
        ordem: {
          colunas: ['pontos', 'gp', 'gc', 'saldo'],
          orientacao: ['desc', 'desc', 'asc', 'desc']
        },
        times: [
          new Time('athletico PR', 'assets/athletico_pr_60x60.png'),
          new Time('atletico GO', 'assets/atletico_go_60x60.png'),
          new Time('atletico MG', 'assets/atletico_mg_60x60.png'),
          new Time('Bahia', 'assets/bahia_60x60.png'),
          new Time('Botafogo', 'assets/botafogo_60x60.png'),
          new Time('Bragantino', 'assets/bragantino_sp_60x60.png'),
          new Time('Ceara', 'assets/ceara_60x60.png'),
          new Time('Corinthians', 'assets/corinthians_60x60.png'),
          new Time('Coritiba', 'assets/coritiba_60x60.png'),
          new Time('Flamengo', 'assets/flamengo_60x60.png'),
          new Time('Fluminense', 'assets/fluminense_60x60.png'),
          new Time('Fortaleza', 'assets/fortaleza_60x60.png'),
          new Time('Goias', 'assets/goias_60x60.png'),
          new Time('Gremio', 'assets/gremio_60x60.png'),
          new Time('Internacional', 'assets/internacional_60x60.png'),
          new Time('Palmeiras', 'assets/palmeiras_60x60.png'),
          new Time('Santos', 'assets/santos_60x60.png'),
          new Time('São Paulo', 'assets/sao_paulo_60x60.png'),
          new Time('Sport', 'assets/sport_60x60.png'),
          new Time('Vasco', 'assets/vasco_60x60.png'),
          
        ],
        novoJogo: {
          casa: {
            time: null,
            gols: 0
          },
          visitante: {
            time: null,
            gols: 0
          }
        },
        visao: 'tabela'
    },
    computed: {
      timesLibertadores(){
        return this.times.slice(0, 6)
      },
      timesRebaixados(){
        return this.times.slice(16, 20)
      },
      timesFiltrados(){
        let times = _.orderBy(this.times, this.ordem.colunas, this.ordem.orientacao)
        let self = this
        return _.filter(times, function(time){
          let busca = self.busca
          return time.nome.indexOf(busca) >= 0
        })
      },
    },
    methods: {
      criarNovoJogo(){
        let indiceCasa = Math.floor(Math.random() * 20)
        let indiceFora = Math.floor(Math.random() * 20)

        this.novoJogo.casa.time = this.times[indiceCasa]
        this.novoJogo.casa.gols = 0
        this.novoJogo.visitante.time = this.times[indiceFora]
        this.novoJogo.visitante.gols = 0

        this.visao = 'placar'
      },

      fimJogo(){
        let golsMarcados = parseInt(this.novoJogo.casa.gols)
        let golsSofridos = parseInt(this.novoJogo.visitante.gols)
        let timeAdversario = this.novoJogo.visitante.time
        let timeCasa = this.novoJogo.casa.time

        timeCasa.fimJogo(timeAdversario, golsMarcados, golsSofridos)

        this.visao = 'tabela'
      },
      ordenar(indice){
        //this.ordem.orientacao[indice] = this.ordem.orientacao[indice] == 'desc' ? 'asc' : 'desc'
        this.$set(this.ordem.orientacao, indice, this.ordem.orientacao[indice] == 'desc' ? 'asc' : 'desc')
      }
    },
    filters: {
      saldo(time){
        return time.gp - time.gc
      }
    }
})