#!/bin/bash

# ------------------ Define os caminhos que serão usados ------------->
local_atalhos="/usr/share/applications/"
local_atalhos_imagens="/usr/share/applications/Capibian/"
local_menu="~/.config/lxpanel/LXDE/panels/panel"
local_menu_imagens="/usr/share/lxpanel/images/"
desktop="/home/user/Desktop/"

# ---------------------- verifica se é root -------------------------->
[[ $(id -u) -nq "0" ]] && echo "Necessário ser root!" && exit 1


# --------------- baixa as imagens, descomprime o pacote --------------
# ---------------- e copia elas para seus devídos locais ------------->
# baixar FAZER
tar -xf imagens.tar.gz
cp imagens/logo_docs.png $local_atalhos_imagens
cp imagens/logo_gmail.png $local_atalhos_imagens
cp imagens/logo_drive.png $local_atalhos_imagens
cp imagens/logo_sheets.png $local_atalhos_imagens
cp imagens/logo_sildes.png $local_atalhos_imagens
cp imagens/capibian_reboot.png $local_menu_imagens


# ------------------------ adicionar wallpaper ----------------------->
pcmanfm --set-wallpaper="imagens/wallpaper.png"
# apaga os arquivos já utilizados
rm -r imagens imagens.tar.gz


# ------------------------- seta novo nome --------------------------->
numero_al=`tr -dc 0-9 < /dev/urandom`
novo_nome="capibian-"${serial: -5}
echo "novo nome       : $novo_nome"
#hostnamectl set-hostname ${novo_nome}

# ------------ executar script para reconhecer wifi no boot ---------->
# Verificando se já existe overlay configurado! Neste caso, altere
#	manualmente.
#if [[ -n $(grep overlays /boot/armbianEnv.txt) ]]; then
#   echo "This is not a fresh system!"
#   exit 1;
#else
#   echo "overlays=emmc led-conf5" >> /boot/armbianEnv.txt
#fi
## Adding cron job at every startup
#echo "SHELL=/bin/sh" > /etc/cron.d/wifi
#echo "PATH=/usr/local/sbin:/usr/local/bin:/sbin:/bin:/usr/sbin:/usr/bin" >> /etc/cron.d/wifi
#echo "@reboot root bash /root/wifi.sh" >> /etc/cron.d/wifi
## Creating wifi loop script
#echo "#!/bin/bash" > /root/wifi.sh
#echo "[[ -n \$(grep led-conf5 /boot/armbianEnv.txt) ]] && { sed -i 's/led-conf5/led-conf4/' /boot/armbianEnv.txt; sleep 5s; reboot; } || { sed -i 's/led-conf4/led-conf5/' /boot/armbianEnv.txt; }" >> /root/wifi.sh
#chmod +x /root/wifi.sh

# ------------------------ atualizar chaves ssh ---------------------->
#rm /etc/ssh/ssh_host*
#ssh-keygen -A -N ""


# -------------------- colocar teclado em português ------------------>
setxkbmap -model pc105 -layout br -variant abnt2


# ------------------------- instalar pacotes ------------------------->
apt update
apt install -y xorg slim numlockx lxde-core chromium-browser network-manager-gnome


# ------------------------- alterar slim.conf ------------------------>
sed -i '45 s/^/sessionstart_cmd	numlockx on/' /etc/slim.conf
sed -i '71 s/^/default_user	user/' /etc/slim.conf
sed -i '79 s/^/auto_login	yes/' /etc/slim.conf


# --------------------------- modificar menu ------------------------->


# -------------- dar permissão para usar o comando shutdown ---------->
chmod 4755 /sbin/shutdown
ln -s /sbin/shutdown /bin/


# --------------------- modificar painel do sistema ------------------>


# ---------------- remover ícones do menu desnecessários ------------->
for i in $local_atalhos"*"
do
	[[ i != $local_atalhos"firefox-esr.desktop" ]] && [[ i != $local_atalhos"chromium.desktop" ]] && echo "NoDisplay=true" >> i
done


# ---------- instalar extensão do chromium e configurá-la ------------>


# -------------- adicionar ícones dos novos aplicativos -------------->
mkdir $local_atalhos_imagens
for i in "documents" "gmail" "google_drive" "sheets" "slides"
do
	arquivo=$($local_atalhos$i".desktop")
	touch $arquivo
	echo -e "[Desktop Entry]\nType=Application\nTerminal=false\nCategories=Network" > $arquivo
	case "$i" in
		"gmail")
			echo "\
Name=Gmail
Name[pt_BR]=Gmail
Icon="$local_atalhos_imagens"logo_gmail.png
Exec=chromium gmail.google.com/" >> $arquivo
		;;
		"google_drive")
			echo "\
Name=Google Drive
Name[pt_BR]=Google Drive
Icon="$local_atalhos_imagens"logo_drive.png
Exec=chromium drive.google.com/" >> $arquivo
		;;
		"documents")
			echo "\
Name=Documents
Name[pt_BR]=Documentos
Icon="$local_atalhos_imagens"logo_docs.png
Exec=chromium chrome-extension://gbkeegbaiigmenfmjfclcdgdpimamgkj/views/word.html" >> $arquivo
		;;
		"sheets")
			echo "\
Name=Sheets
Name[pt_BR]=Planilhas
Icon=/home/user/Downloads/images/logo_sheets.png
Exec=chromium chrome-extension://gbkeegbaiigmenfmjfclcdgdpimamgkj/views/sheet.html" >> $arquivo
		;;
		"slides")
			echo "\
Name=Slides
Name[pt_BR]=Apresentações
Icon=/home/user/Downloads/images/logo_slides.png
Exec=chromium chrome-extension://gbkeegbaiigmenfmjfclcdgdpimamgkj/views/slides.html" >> $arquivo
		;;
	esac
	ln -s $arquivo $desktop
done
