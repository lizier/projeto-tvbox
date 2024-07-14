## Versão UFSCar-Sorocaba do Armbian para a MXQ-PRO 5G MXQ-PRO 4K - Projeto BemTeVi

# [Download](https://drive.google.com)


## Instruções básicas


### Requisitos

Lista de material utilizado:

* MXQ-PRO-fake: A versão original da MXQ-PRO é baseada no SoC da [Amlogic](https://www.amlogic.com/), mais especificamente o [S905W](https://en.wikipedia.org/wiki/Amlogic). O lote que tivemos acesso, e portanto é o modelo utilizado neste manual, é a falsificação baseada no Soc da [Rockchip](http://www.rock-chips.com/), mais especificamente o modelo **rk3228a**.
  * Curiosidades: 
    [link1](https://www.youtube.com/watch?v=mR09TfH5lRk): Vídeo ensinando como identificar a diferença de um aparelho de TV Box MXQ-PRO verdadeiro do falso de uma maneira bem simples.
    
  * Especificações do modelo utilizado:
  
    * Rockchip rk3228A 4-core ARMv7
    * eMCP com 1GB de RAM e 8GB de armazenamento
    * Chipset WiFi: SSV6251P
    ![foto_tvbox_aberta.jpeg](./files/foto_tvbox_aberta.jpeg)
  
* Cartão de memória microSD
* Cabo de rede Ethernet ou monitor de video e teclado
* Leitor de cartão de memória para PC
* Linux (utilizamos uma versão Debian bookworm)
* `Status` atual:

| Recurso | Condição |
| :---         |     :---:      |
| wifi | Funcionando |
| hdmi | Funcionando |
| leitor de cartão | Funcionando |
| rede | Funcionando 100Mbps|
| infra-vermelho | Funcionando - precisa configurar um mapeamento|
| usb 2.0 | Funcionando |
| saída audio | Funcionando |
| saída AV | Não testada |

### Preparação inicial
* Faça download dos arquivos:
  * [balenaEtcher](https://www.balena.io/etcher#download-etcher)
  * [MULTITOOL](https://users.armbian.com/jock/rk322x/multitool/multitool.img.xz) ou no [drive](https://drive.google.com/)
  * [Imagem](https://drive.google.com/file/d/1RXTVMk07d8pVUPnz66Lop48093ZaQMXU/view?usp=sharing). Montamos esta versão com o [Armbian](https://github.com/armbian/community/) para rk322x, incluindo alguns pacotes educacionais. A versão utilizada do Armbian está no [drive](https://drive.google.com/drive).

* Em seguida:
    * Abra o balenaEtcher para gravar o multitool no cartão microSD. Talvez seja necessário dar permissão de execução para o programa, para isso, dentro da pasta Downloads do seu computador use:
    ```
    chmod +x balenaEtcher-*-x64.AppImage
    ```
    Com o balenaEtcher aberto, escolha o arquivo do multitool em `Flash from file` e depois a mídia que será usada em `Select Target` (no nosso caso o cartão microSD), por fim, basta clicar em `Flash`.
    
    * No cartão microSD haverá uma partição chamada `MULTITOOL`, abra ela e copie a Imagem do Armbian para dentro da pasta `backups`, sem descompactar o arquivo.
    * Desmonte adequadamente o cartão e insira na tvbox desligada.
    * Ligue a tvbox com o cartão microSD inserido e siga os passos a seguir.

### Instalação da imagem pelo MultiTool

Antes de instalar a imagem, você pode querer fazer um backup, este é o momento. 

Para gravar a imagem, inicialize a tvbox com o cartão microSD. Aguarde a disponibilização do terminal e inicie o `MULTITOOL` pelo comando `multitool.sh`. Quando aparecer o menu, selecione a opção `restore flash`. Siga os passos para gravar a imagem. Não é necessário descompactar, o arquivo `gz` pode ser salvo diretamente na pasta `backups`.


![multitool-burn3.png](./files/multitool.png)



### Agradecimentos

* Fórum da comunidade Armbian [:link:](https://forum.armbian.com/topic/12656-csc-armbian-for-rk322x-tv-boxes/)
* Receita Federal do Brasil [:link:](https://www.gov.br/receitafederal/pt-br)
* Universidade Federal de São Carlos [:link:](http://ufscar.br)
 

