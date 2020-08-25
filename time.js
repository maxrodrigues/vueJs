class Time {
  constructor(nome, escudo){
    this.nome = nome
    this.escudo = escudo
    this.pontos = 0
    this.gp = 0
    this.gc = 0
    this.saldo = 0

  }

  fimJogo(timeVisitante, golsMarcados, golsSofridos){
    if(this.foiEmpate(golsMarcados, golsSofridos)){
      this.empate(golsMarcados, golsSofridos);
      timeVisitante.empate(golsMarcados, golsSofridos);

      return;
    }

    if(this.foiVitoria(golsMarcados, golsSofridos)){
      this.vitoria(golsMarcados, golsSofridos);
      timeVisitante.derrota(golsSofridos, golsMarcados);
      return;

    }else{
      this.derrota(golsMarcados, golsSofridos);
      timeVisitante.vitoria(golsSofridos, golsMarcados);
      return;

    }
  }

  foiEmpate(golsMarcados, golsSofridos){
    return golsMarcados === golsSofridos;
  }

  foiVitoria(golsMarcados, golsSofridos){
    return golsMarcados > golsSofridos;
  }

  atualizaInfo(pontos, golsMarcados, golsSofridos){
    this.pontos += pontos
    this.gp += golsMarcados
    this.gc += golsSofridos
    this.saldo = this.gp - this.gc
  }

  empate(golsMarcados, golsSofridos){
    this.atualizaInfo(1, golsMarcados, golsSofridos);
  }

  vitoria(golsMarcados, golsSofridos){
    this.atualizaInfo(3, golsMarcados, golsSofridos);
  }

  derrota(golsMarcados, golsSofridos){
    this.atualizaInfo(0, golsMarcados, golsSofridos);
  }
}