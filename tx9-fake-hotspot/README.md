# Tutorial para criar um ponto de acesso WiFi

## Requisitos

Lista de material utilizado:

* Tx9-fake: A versão original da Tx9 é baseada no SoC da [Amlogic](https://www.amlogic.com/), mais especificamente o [S905W](https://en.wikipedia.org/wiki/Amlogic). O lote que tivemos acesso, e portanto é o modelo utilizado neste manual, é a falsificação baseada no Soc da [](http://www.rock-chips.com/), mais especificamente o modelo rk3228a.
  * Curiosidades: [link1](https://www.youtube.com/watch?v=bWcwqZfOcUI) [link2](https://www.youtube.com/watch?v=nGlpigD6uoY)
  * Especificações do modelo utilizado:
  ```
  
  ```
  * Fotos:
  
  
* Cartão de memória microSD;
* Leitor de cartão de memória para PC;
* Linux (tutorial para Windows [aqui]())


## Preparação inicial
* Faça o download do balenaEtcher ([download](https://www.balena.io/etcher#download-etcher)), do [multitool](https://users.armbian.com/jock/rk322x/multitool/multitool.img.xz) e do [Armbian](https://github.com/armbian/community/) para rk322x. Utilizamos as versões salvas na pasta [softwares](softwares/).
* Gravar o multitool no cartão microSD utilizando o balenaEtcher;
* No cartão microSD haverá uma partição chamada `MULTITOOL`, salve o Armbian na pasta `images`, sem descompactar.
* Desmonte adequadamente o cartão e insira na tvbox desligada;
* Ligue a tvbox com o cartão microSD inserido e siga os passos da instalação do Armbian.

## Instalação do Armbian

## Instalação do RaspAP

## Configurações sugeridas


2. Executar como *root* o script [**install.sh**](/gambi-temporaria/install.sh)
  
     ``` root@rk322x-box:~# bash install.sh ```

## Agradecimentos

* Fórum da comunidade Armbian [:link:](https://forum.armbian.com/topic/12656-csc-armbian-for-rk322x-tv-boxes/)
* Receita Federal do Brasil [:link:](https://www.gov.br/receitafederal/pt-br)
* Universidade Federal de São Carlos [:link:](http://ufscar.br)
 
