# Tutorial Wifi

Tutorial para conseguir habilitar o WiFi na TvBox.

## Requisitos

Lista de materiais utilizados:

* **Tx9-fake**: A versão original da Tx9 é baseada no SoC da [Amlogic](https://www.amlogic.com/), mais especificamente o [S905W](https://en.wikipedia.org/wiki/Amlogic). O lote que tivemos acesso, e portanto é o modelo utilizado neste manual, é a falsificação baseada no Soc da [Rockchip](http://www.rock-chips.com/), mais especificamente o modelo **rk3228a**.
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

* **Armbian**: Caso encontre problemas com as versões mais recentes, utilizamos o **kernel 5.15**. A versão está salva no [Google Drive](https://drive.google.com/drive/folders/1e4TiLbqWj8Yj2bcLT5fBhs6omHIN_e7u?usp=sharing).
	* _Não tem o Armbian instalado na sua TvBox?_ Cheque nosso [tutorial de instalação armbian](https://github.com/lizier/projeto-tvbox/tree/main/tx9-instalacao-armbian-ssh).

## Instalação e configuração do WiFi e do ponto de acesso

### WiFi

Por padrão não conseguimos reconhecer o WiFi diretamente, esta detecção automática ainda está em estudo. Por enquanto, nossa única alternativa tem sido utilizar as alterações realizadas pelo seguinte script. Faça:

* No terminal do Armbian, execute como `root` o script [`install-wifi.sh`](../assets/install-wifi.sh).

```
curl -sL https://github.com/lizier/projeto-tvbox/blob/main/tutorial_wifi/assets/install-wifi.sh| bash
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
