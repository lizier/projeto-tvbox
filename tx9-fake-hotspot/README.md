# Tutorial para criar um ponto de acesso WiFi

## Requisitos

Lista de material utilizado:

* Tx9-fake: A versão original da Tx9 é baseada no SoC da [Amlogic](https://www.amlogic.com/), mais especificamente o [S905W](https://en.wikipedia.org/wiki/Amlogic). O lote que tivemos acesso, e portanto é o modelo utilizado neste manual, é a falsificação baseada no Soc da [](http://www.rock-chips.com/), mais especificamente o modelo rk3228a.
* * Curiosidade: [link]((https://www.youtube.com/watch?v=bWcwqZfOcUI)
 Seguem algumas especificações e fotos do modelo utilizado:
* Cartão de memória microSD;
* Leitor de cartão de memória para PC;
* Linux (tutorial para Windows [aqui]())


## Preparação inicial

## Instalação do Armbian

## Instalação do RaspAP

## Configurações sugeridas

## Agradecimentos
* Blog do armbian rk

1. Instalar o [Armbian](https://www.armbian.com/)
    - Gravar o [multitool](https://users.armbian.com/jock/rk322x/multitool/multitool.img.xz) para a rk322x
    - Na pasta **images** da partição **MULTITOOL** salvar a versão do [Armbian 2.6.9](https://github.com/armbian/community/releases/download/23.05.0-trunk-e33842ef2/Armbian_23.05.0-trunk-e33842ef2_Rk322x-box_lunar_edge_6.2.9.img.xz#rk322x-box)
    - Inicializar a tvbox TX9-Fake com o cartão inserido
    - ...
    - Senha root: *user1234*
    - Usuário padrão: *user* com a senha *user1234*
2. Executar como *root* o script [**install.sh**](/gambi-temporaria/install.sh)
  
     ``` root@rk322x-box:~# bash install.sh ```
  
3. Reiniciar
