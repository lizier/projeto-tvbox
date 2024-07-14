# Transformando o Armbian em Capibian

## Instalando o Armbian

A primeira coisa a se fazer é instalar o Armbian em sua tv-box, para isso deve-se seguir o tutorial [tx9-instalacao-armbian-ssh](../tx9-instalacao-armbian-ssh), realizando os passos em **Requisitos** até **WiFi**, se atentando para não prosseguir o tutorial ao chegar na seção **RaspAP**.

## Instalando os pacotes

O tutorial a cima usa como base uma imagem do Armbian sem interface gráfica. Para nossa interface, utilizaremos como _Desktop Environment_ o _LXDE_, o gerenciador de logins _Slim_ e o browser _Chromium_, além de criarmos atalhos para as ferramentas do google diretamente no sistema, a fim de focarmos mais na utilização de progamas online.

Para instalar todos os programas devemos executar o comando:

	apt update && apt install -y xorg slim numlockx lxde-core chromium-browser network-manager-gnome

## Setando login automático

Para setar o login como automático deveremos editar o arquivo `/etc/slim.conf`, substituindo as linhas _45_, _71_ e _79_ com os seguintes conteúdos:

> sessionstart_cmd	numlockx on

> default_user	user

> auto_login	yes

No lugar de _user_, coloque o nome do usuário que você criou durante a instalação do sistema.

Essa edição pode ser feita utilizando qualquer editor de texto, por exemplo o **nano** (para mostrar a numeração das linhas deve-se teclar ALT+N), ou usando os seguintes comando a baixo:

	sed -i '45 s/^/sessionstart_cmd	numlockx on/' /etc/slim.conf
	sed -i '71 s/^/default_user	user/' /etc/slim.conf
	sed -i '79 s/^/auto_login	yes/' /etc/slim.conf

## Configurando o ambiente LXDE

### Papel de parede

Dentro da pasta imagens nesse repositório há o arquivo `wallpaper.png`, usado como papel de parede. Para utilizá-lo com esse objetivo, dentro da pasta do repositório, execute o comando:

	pcmanfm --set-wallpaper="imagens/wallpaper.png"

### Modificando o menu

No menu do sistema teremos acesso há vários aplicativos que não são tão interessantes para um usuário comum. Para simplificá-lo podemos fazer algumas mudanças.

Podemos ocultar todos os aplicativos que não queremos que estejam no menu adicionando a linha:

> NoDisplay=true

No arquivo que define seu comportamento. Esse arquivo se encontra na pasta `/usr/share/applications`, e seu nome pode ser consultado clicando com o botão direito em cima de seu ícone no menu do sistema e depois em propriedades. Para editá-lo, pode ser utilizado novamente o programa **nano**, ou usando o comando `echo 'NoDisplay=true' >>` seguido do nome do arquivo (caso não esteja na pasta mencionada é necessário passar o caminho completo do arquivo).

Também podemos adicionar as opções de rebootar e desligar o sistema diretamente no menu, sem a necessidade de abrir uma nova janela. Primeiramente, é necessário substituir o arquivo `~/.config/lxpanel/LXDE/panels/panel` (na home do usuário _user_) pelo arquivo `panel` presente nesse repositório. Em seguida deve-se colocar a imagem `capibian_reboot.png`, que está na pasta `imagens` desse repositório, na pasta `/usr/share/lxpanel/images`. Por fim, é necessário executar os comandos:

	# atualiza o paínel do LXDE
	lxpanelctl restart
	# dá permissão de execução do comando shutdown para usuários além do root
	chmod 4755 /sbin/shutdown
	ln -s /sbin/shutdown /bin/

### Configurar apenas uma área de trabalho

Para deixar o sistema com apenas uma área de trabalho (por padrão ele vem com duas) deve-se editar o arquivo `~/.config/openbox/lxde-rc.xml`, substituindo as linhas:

```
<desktop\>
	<number\>2<number\>
```

Para:

```
<desktop\>
	<number\>1<number\>
```

### Adicionando ícones para as ferramentas do google

No lugar das ferramentas do google, Slides, Docs e Sheets, escolhemos utilizar uma extensão do Chromium que permite modificar arquivos de modo offline e depois guardá-los no drive. Para instalar essa extensão pode-se seguir o tutorial [tutorial_office](../tutorial_office), que também ensina como configurá-la de modo que os ícones na área de trabalho abram automaticamente as ferramentas.

Para criar um ícone na área de trabalho, é necessário clicar com o botão direito no ícone no menu do sistema e clicar em adicioná-lo na Desktop. Porém, esses ícones ainda não estão presentes no sistema, para criá-los, devemos criar os respectivos arquivos:

- `/usr/share/applications/documents.desktop` com o conteúdo:

```
Name=Documents
Name[pt_BR]=Documentos
Icon="$local_atalhos_imagens"logo_docs.png
Exec=chromium chrome-extension://gbkeegbaiigmenfmjfclcdgdpimamgkj/views/word.html
```

- `/usr/share/applications/sheets.desktop` com o conteúdo:

```
Name=Sheets
Name[pt_BR]=Planilhas
Icon=/home/user/Downloads/images/logo_sheets.png
Exec=chromium chrome-extension://gbkeegbaiigmenfmjfclcdgdpimamgkj/views/sheet.html
```

- `/usr/share/applications/slides.desktop` com o conteúdo:

```
Name=Slides
Name[pt_BR]=Apresentações
Icon=/home/user/Downloads/images/logo_slides.png
Exec=chromium chrome-extension://gbkeegbaiigmenfmjfclcdgdpimamgkj/views/slides.html
```

- `/usr/share/applications/gmail.desktop` com o conteúdo:

```
Name=Gmail
Name[pt_BR]=Gmail
Icon=/usr/share/applications/Capibian/logo_gmail.png
Exec=chromium gmail.google.com/
```

- `/usr/share/applications/google_drive.desktop` com o conteúdo:

```
Name=Google Drive
Name[pt_BR]=Google Drive
Icon=/usr/share/applications/Capibian/logo_drive.png
Exec=chromium drive.google.com/
```

Também é necessário criar a pasta `/usr/share/applications/Capibian/` e copiar as imagens iniciadas com `logo_` que estão dentro da pasta  `imagens` desse repositório para ela.

## Dicas

Se a instalação for feita por meio do SSH, ao entrar no sistema diretamente por meio de um monitor e periféricos ligados na tv-box, o teclado do sistema pode não estar corretamente configurado. Esse detalhe pode ser corrigido com o comando:

	setxkbmap -model pc105 -layout br -variant abnt2

Pode ser necessário descomprir pacotes com a extensão _.zip_, para isso pode-se usar o comando `unzip` seguido do nome do arquivo zipado.
