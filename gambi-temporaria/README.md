
# Teste:

1. Instalar o [Armbian](https://www.armbian.com/)
    - Gravar o [multitool](https://users.armbian.com/jock/rk322x/multitool/multitool.img.xz) para a rk322x
    - Na pasta **images** da partição **MULTITOOL** salvar a versão do [Armbian 2.6.9](https://github.com/armbian/community/releases/download/23.05.0-trunk-e33842ef2/Armbian_23.05.0-trunk-e33842ef2_Rk322x-box_lunar_edge_6.2.9.img.xz#rk322x-box)
    - Inicializar a tvbox TX9-Fake com o cartão inserido
    - ...
    - Senha root: *user1234*
    - Usuário padrão: *user* com a senha *user1234*
2. Executar como *root* o script [**install-wifi.sh**](/gambi-temporaria/install-wifi.sh)
  
     ``` root@rk322x-box:~# bash install-wifi.sh ```
  
3. Reiniciar
