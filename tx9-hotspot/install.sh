#!/bin/bash
# Checking overlays
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

apt update
apt install dnsmasq -y

systemctl stop dnsmasq
systemctl disable dnsmasq

SSID="hotspot"
PWD="hotspot1234"

nmcli con add type wifi ifname wlan0 con-name $SSID autoconnect yes ssid $SSID
nmcli con modify $SSID 802-11-wireless.mode ap 802-11-wireless.band bg ipv4.method shared
nmcli con modify $SSID wifi-sec.key-mgmt wpa-psk
nmcli con modify $SSID wifi-sec.psk $PWD
nmcli con up $SSID



# Finished!
sync; sync; sync;
echo "Reboot your system."
