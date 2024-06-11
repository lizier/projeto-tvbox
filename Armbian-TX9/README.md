# Imagem do Armbian para a TX9 - Projeto BemTeVi

## Requisitos

Lista de material utilizado:

* Tx9-fake: A versão original da Tx9 é baseada no SoC da [Amlogic](https://www.amlogic.com/), mais especificamente o [S905W](https://en.wikipedia.org/wiki/Amlogic). O lote que tivemos acesso, e portanto é o modelo utilizado neste manual, é a falsificação baseada no Soc da [Rockchip](http://www.rock-chips.com/), mais especificamente o modelo **rk3228a**.
  * Curiosidades: 
    [link1](https://www.youtube.com/watch?v=bWcwqZfOcUI): Vídeo ensinando como identificar a diferença de um aparelho de TV Box TX9 verdadeiro do falso de uma maneira bem simples.
    [link2](https://www.youtube.com/watch?v=nGlpigD6uoY): Um vídeo no qual uma TV Box é analisada.

  * Especificações do modelo utilizado:
  
    * Rockchip rk3228A 4-core ARMv7
    * eMCP com 1GB de RAM e 8GB de armazenamento
    * Chipset WiFi: SSV6051P
    ```
    model name	: ARMv7 Processor rev 5 (v7l)
    BogoMIPS	: 35.29
    Features	: half thumb fastmult vfp edsp thumbee neon vfpv3 tls vfpv4 idiva idivt vfpd32 lpae evtstrm 
    CPU implementer	: 0x41
    CPU architecture: 7
    CPU variant	: 0x0
    CPU part	: 0xc07
    CPU revision	: 5
    ```
  ![foto_tvbox_aberta.jpeg](./files/fotos_TVBox/foto_tvbox_aberta.jpeg)
  
* Cartão de memória microSD
* Cabo de rede Ethernet ou monitor de video e teclado
* Leitor de cartão de memória para PC
* Linux (utilizamos o Ubuntu 22.10)

## Preparação inicial
* Faça download dos arquivos:
  * [balenaEtcher](https://www.balena.io/etcher#download-etcher)
  * [multitool](https://users.armbian.com/jock/rk322x/multitool/multitool.img.xz)
  * [Imagem]() Montamos esta versão com o [Armbian](https://github.com/armbian/community/) para rk322x, incluindo alguns pacotes educacionais, XFCE e habilitação do Wifi. As versões utilizadas do multitool e do Arbian estão salvas no [drive](https://drive.google.com/drive/folders/1e4TiLbqWj8Yj2bcLT5fBhs6omHIN_e7u?usp=sharing).

* Em seguida:
    * Abra o balenaEtcher para gravar o multitool no cartão microSD. Talvez seja necessário dar permissão de execução para o programa, para isso, dentro da pasta Downloads do seu computador use:
    ```
    chmod +x balenaEtcher-*-x64.AppImage
    ```
    Com o balenaEtcher aberto, escolha o arquivo do multitool em `Flash from file` e depois a mídia que será usada em `Select Target` (no nosso caso o cartão microSD), por fim, basta clicar em `Flash`.
    
    * No cartão microSD haverá uma partição chamada `MULTITOOL`, abra ela e copie o Armbian para dentro da pasta `images`, sem descompactar o arquivo.
    * Desmonte adequadamente o cartão e insira na tvbox desligada.
    * Ligue a tvbox com o cartão microSD inserido e siga os passos a seguir.

### Instalação pelo MultiTool

Faça a instalação pelo Multitool. Recomendamos a instalação sem monitor e teclado, acessando sua tv-box por ssh a partir de outra máquina. Porém, você pode utilizar um monitor de Video e teclado.

Para instalar a imagem usando shh, é necessário ter instalado em seu sistema os pacotes: `openssh-client`, `nmap` (opcional) e `ip`.

Faço os passos a seguir caso deseje usar ssh:
* Conecte um lado do cabo de rede ao roteador, e o outro na tv-box.
* Use o comando `ip address` para descobrir o ip da sua máquina. Ele é informado após a palavra `inet` na seção da interface de rede que você está usando, caso esteja usando wifi normalmente a interface tem o nome iniciado com a letra `w`, como `wlan0`, e caso esteja usando cabo de rede Ethernet normalmente a interface tem o nome iniciado com a letra `e`, como `eth0`. No exemplo da imagem as interface wifi e Ethernet são, respectivamente, `wlp4s0` e `enp6s0f0`.
![ipaddress_sublinhado.png](./files/ipadress_sublinhado.png)

* Use o comando `sudo nmap -p 22 -sS <ip_da_sua_máquina>` seguido do ip de sua máquina para scanear todos dispositivos conectados à internet, e assim descobrir o ip da tv-box. Essa pode ser uma primeira visão que você terá depois de rodar o comando, o que muda são os dispositivos que estão na sua rede:
![nmap.png](./files/nmap.png)

    Todos os dispositivos conectados à rede aparecem nesse comando, por isso você precisa procurar onde que sua TV Box está listada.
* 
    Três dicas para saber qual dispositivo listado é a tv-box: 
    * Sua saída terá uma linha `22/tcp open  ssh`
    * No fim do `MAC Address` estará escrito `(Unknown)`
    * Você pode desconectar a TV Box da rede, e rodar o comando, anotar todos os IPs nos quais o fim do MAC Address é `(Unknown)`, depois reconectar a TV Box e procurar por um IP que não estava antes na rede conforme as duas primeiras dicas.
    * 
* Seguindo essas dicas, encontramos o IP da nossa TV Box (200.8.84.66), conforme ilustrado abaixo. Mas o IP da sua vai ser diferente do nosso.
![nmap_tvbox.png](./files/nmap_tvbox.png)

* Use o comando `ssh root@<ip_da_sua_tv-box>`, onde no lugar de <ip_da_sua_tv-box> deve ser usado o ip encontrado usando o nmap, para poder acessá-la.
![ssh1.png](./files/ssh1.png)

* Após acessar a tv-box, utilize o comando `multitool.sh`, e faça os passos a seguir.
![ssh2.png](./files/ssh2.png)

Após fazer os passos anteriores, ou pulados caso não esteja usando ssh, cairemos na seguinte tela:
![multitool.png](./files/multitool.png)
Clique enter para prosseguir, depois:
* Faça um backup do estado atual da tv-box (opcional), por precaução, basta teclar enter com a opção `Backup flash` selecionada.
![multitool_backup1.png](./files/multitool_backup1.png)

* Depois tecle enter novamente (com o dispositivo selecionado). O seu dispositivo pode ser diferente daquele ilustrado na imagem.
![multitool_backup2.png](./files/multitool_backup2.png)

* Escolha um nome para o backup e prossiga.
![multitool-backup3.png](./files/multitool-backup3.png)

* Espere o backup terminar.
![multitool-backup4.png](./files/multitool-backup4.png)

* Com o backup pronto, vá até `Burn image to flash` com os direcionais do teclado e tecle enter. 
![multitool-burn1.png](./files/multitool-burn1.png)

* Escolha o dispositivo. Lembre-se que o nome do seu dispositivo pode ser diferente do nome do nosso. Novamente, não tem problema.
![multitool-burn2.png](./files/multitool-burn2.png)

* Selecione o arquivo da imagem, basta apertar Enter. Neste caso, selecione a imagem [tx9-image-v2.gz](https://drive.google.com/file/d/1RXTVMk07d8pVUPnz66Lop48093ZaQMXU/view?usp=sharing)
![multitool-burn3.png](./files/multitool-burn3.png)
 
* Espere a instalação ser concluída.
![multitool-burn4.png](./files/multitool-burn4.png)

* Quando a instalação terminar, prossiga, teclando Enter.
![multitool-burn5.png](./files/multitool-burn5.png)

* Por fim, desligue a máquina, indo até a opção `(9) Shutdown` e feche o terminal.
![multitool-shutdown.png](./files/multitool-shutdown.png)

Feito isso, siga os seguintes passos:
1) Vá até sua TV Box e a retire da energia. Ou seja, retire o cabo redondo dela.
2) Apenas após fazer isso, retire o cartão SD da máquina.
3) Reconecte a TV Box na energia

É importante tirar o cartão SD somente quando cortar a energia (Ou seja, o cabo cuja entrada é “redonda”). Não retire o cartão SD com a TV Box com energia ligada, pode dar problema de leitura e no cartão.
(Até onde se sabe, não é necessário retirar o cabo de rede)

## Agradecimentos

* Fórum da comunidade Armbian [:link:](https://forum.armbian.com/topic/12656-csc-armbian-for-rk322x-tv-boxes/)
* Receita Federal do Brasil [:link:](https://www.gov.br/receitafederal/pt-br)
* Universidade Federal de São Carlos [:link:](http://ufscar.br)
 

