#!/bin/bash

# Verificando se já existe overlay configurado! Neste caso, altere manualmente.
if [[ -n $(grep overlays /boot/armbianEnv.txt) ]]; then
   echo "This is not a fresh system!"
   exit 1;
else
   echo "overlays=emmc led-conf5" >> /boot/armbianEnv.txt
fi

# Adding cron job at every startup
echo "SHELL=/bin/sh" > /etc/cron.d/wifi
echo "PATH=/usr/local/sbin:/usr/local/bin:/sbin:/bin:/usr/sbin:/usr/bin" >> /etc/cron.d/wifi
echo "@reboot root bash /root/wifi.sh" >> /etc/cron.d/wifi
# Creating wifi loop script
echo "#!/bin/bash" > /root/wifi.sh
echo "[[ -n \$(grep led-conf5 /boot/armbianEnv.txt) ]] && { sed -i 's/led-conf5/led-conf4/' /boot/armbianEnv.txt; sleep 5s; reboot; } || { sed -i 's/led-conf4/led-conf5/' /boot/armbianEnv.txt; }" >> /root/wifi.sh
chmod +x /root/wifi.sh

# Instalando as dependências
apt update
apt install dnsmasq -y

# Desabilitando o serviço do dnsmasq, devido a conflito de portas, não é necessário
systemctl stop dnsmasq
systemctl disable dnsmasq

# NOME DA REDE WIFI
# SSID Naming Conventions
# The SSID can be any alphanumeric, case-sensitive entry from 2 to 32 characters. The printable characters plus the space (ASCII 0x20) are allowed, but these six characters are not:
# ?, ", $, [, \, ], and +.
# The allowable characters are:
# ASCII 0x20, 0x21, 0x23, 0x25 through 0x2A, 0x2C through 0x3E, 0x40 through 0x5A, 0x5E through 0x7E.
# In addition, these three characters cannot be the first character:
# !, #, and ; (ASCII 0x21, 0x23, and 0x3B, respectively).
# Trailing and leading spaces (ASCII 0x20) are not permitted.
# NOTE     This means that spaces are allowed within the SSID, but not as the first or last character, and the period “.” (ASCII 0x2E) is also allowed.

SSID="hotspot"

# SENHA DA REDE WIFI
# Enter a string of at least 8 characters to a maximum of 63 characters. Acceptable characters include upper and lower case alphabetic letters, the numeric digits, and special symbols such as @ and #.

PWD="hotspot1234"

# configurando o NetworkManager
nmcli con add type wifi ifname wlan0 con-name "$SSID" autoconnect yes ssid "$SSID"
nmcli con modify "$SSID" 802-11-wireless.mode ap 802-11-wireless.band bg ipv4.method shared
nmcli con modify "$SSID" wifi-sec.key-mgmt wpa-psk
nmcli con modify "$SSID" wifi-sec.psk "$PWD"
nmcli con up "$SSID"

# Finished!
sync; sync; sync;
echo "Reboot your system."
