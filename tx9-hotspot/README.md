# Tutorial para criar um ponto de acesso WiFi

## Requisitos

Lista de material utilizado:

* Tx9-fake: A versão original da Tx9 é baseada no SoC da [Amlogic](https://www.amlogic.com/), mais especificamente o [S905W](https://en.wikipedia.org/wiki/Amlogic). O lote que tivemos acesso, e portanto é o modelo utilizado neste manual, é a falsificação baseada no Soc da [Rockchip](http://www.rock-chips.com/), mais especificamente o modelo **rk3228a**.
  * Curiosidades: [link1](https://www.youtube.com/watch?v=bWcwqZfOcUI) [link2](https://www.youtube.com/watch?v=nGlpigD6uoY)
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
  * Fotos
  
  
* Cartão de memória microSD
* Leitor de cartão de memória para PC
* Linux (utilizamos o Ubuntu 22.10)


## Preparação inicial
* Faça o download:
  * [balenaEtcher](https://www.balena.io/etcher#download-etcher)
  * [multitool](https://users.armbian.com/jock/rk322x/multitool/multitool.img.xz)
  * [Armbian](https://github.com/armbian/community/), para rk322x. Utilizamos a versão cli, não é necessário e nem recomendado ter interface gráfica. IMPORTANTE: utilize o kernel 5.15!
  * Utilizamos as versões salvas no `#0969DA` [drive](https://drive.google.com/), caso encontre problemas com as versões mais recentes.
* Gravar o multitool no cartão microSD utilizando o balenaEtcher.
* No cartão microSD haverá uma partição chamada `MULTITOOL`, salve o Armbian na pasta `images`, sem descompactar.
* Desmonte adequadamente o cartão e insira na tvbox desligada.
* Ligue a tvbox com o cartão microSD inserido e siga os passos a seguir.

### Instalação pelo MultiTool

Faça a instalação pelo multitool. Recomendamos a instalação sem monitor e teclado, apenas com o cabo de rede ethernet.

### Instalação do Armbian

Faça a instalação do Armbian. Recomendamos a instalação sem monitor e teclado, apenas com o cabo de rede ethernet.

## Instalação e configuração do WiFi e do ponto de acesso

Por padrão não conseguimos reconhecer o WiFi diretamente, esta detecção automática ainda está em estudo. Por enquanto, nossa única alternativa tem sido utilizar as alterações realizadas pelo seguinte script. Faça:

* No terminal do Armbian, execute como `root` o script [`install.sh`](./install.sh).
```
curl -sL https://github.com/lizier/projeto-tvbox/raw/main/tx9-hotspot/install.sh | bash
```
ou, se o script já estiver na tvbox,
```
bash install-wifi.sh
```

*  Reinicie a tvbox e se quiser verificar a habilitação do WiFi, execute:
```
dmesg | grep ssv
```

## Agradecimentos

* Fórum da comunidade Armbian [:link:](https://forum.armbian.com/topic/12656-csc-armbian-for-rk322x-tv-boxes/)
* Receita Federal do Brasil [:link:](https://www.gov.br/receitafederal/pt-br)
* Universidade Federal de São Carlos [:link:](http://ufscar.br)
 
