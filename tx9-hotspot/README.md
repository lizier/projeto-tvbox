# Tutorial para criar um ponto de acesso WiFi

* [Armbian](https://github.com/armbian/community/), para rk322x. Utilizamos a versão sem ambiente gráfico. IMPORTANTE: utilize o kernel 5.15!

## Instalação e configuração do WiFi e do ponto de acesso

Com a instalação padrão do Armbian, não conseguimos reconhecer o WiFi diretamente, esta detecção automática ainda está em estudo. Por enquanto, forçamos a detecção ao custo de uma reinicalização.
Durante a execução do script será necessário informar o nome da rede Wifi e a senha.

* No terminal do Armbian, execute como `root` o script [`install.sh`](./install.sh).
```
curl -sL https://github.com/lizier/projeto-tvbox/raw/main/tx9-hotspot/install.sh | bash
```
ou, se o script já estiver na tvbox,
```
bash install-wifi.sh
```

* Reinicie a tvbox e veja se a rede WiFi aparece disponível. Se nenhum nome ou senha for fornecido, procure pela rede padrão `hotspot` com a senha `hotspot1234`.

## Agradecimentos

* Fórum da comunidade Armbian [:link:](https://forum.armbian.com/topic/12656-csc-armbian-for-rk322x-tv-boxes/)
* Receita Federal do Brasil [:link:](https://www.gov.br/receitafederal/pt-br)
* Universidade Federal de São Carlos [:link:](http://ufscar.br)
 
