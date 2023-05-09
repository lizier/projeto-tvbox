#!/bin/bash

# Based on https://docs.raspap.com/manual/#default-configuration
# Adapted for Armbian rk322x and with some minor fixes

# Preparing Armbian

apt update

apt-get -y install dhcpcd5 lighttpd git hostapd dnsmasq iptables-persistent vnstat qrencode php-cgi iw net-tools

lighttpd-enable-mod fastcgi-php    

service lighttpd force-reload

systemctl restart lighttpd.service

rm -rf /var/www/html

rm /var/log/lighttpd/*.log


git clone https://github.com/RaspAP/raspap-webgui /var/www/html

WEBROOT="/var/www/html"
CONFSRC="$WEBROOT/config/50-raspap-router.conf"
LTROOT=$(grep "server.document-root" /etc/lighttpd/lighttpd.conf | awk -F '=' '{print $2}' | tr -d " \"")

HTROOT=${WEBROOT/$LTROOT}
HTROOT=$(echo "$HTROOT" | sed -e 's/\/$//')
awk "{gsub(\"/REPLACE_ME\",\"$HTROOT\")}1" $CONFSRC > /tmp/50-raspap-router.conf

cp /tmp/50-raspap-router.conf /etc/lighttpd/conf-available/

ln -s /etc/lighttpd/conf-available/50-raspap-router.conf /etc/lighttpd/conf-enabled/50-raspap-router.conf

systemctl restart lighttpd.service

cp /var/www/html/installers/raspap.sudoers /etc/sudoers.d/090_raspap
mkdir /etc/raspap/
mkdir /etc/raspap/backups
mkdir /etc/raspap/networking
mkdir /etc/raspap/hostapd
mkdir /etc/raspap/lighttpd
cp /var/www/html/raspap.php /etc/raspap 

chown -R www-data:www-data /var/www/html
chown -R www-data:www-data /etc/raspap

mv /var/www/html/installers/*log.sh /etc/raspap/hostapd 
mv /var/www/html/installers/service*.sh /etc/raspap/hostapd
chown -c root:www-data /etc/raspap/hostapd/*.sh 
chmod 750 /etc/raspap/hostapd/*.sh 
cp /var/www/html/installers/configport.sh /etc/raspap/lighttpd
chown -c root:www-data /etc/raspap/lighttpd/*.sh
mv /var/www/html/installers/raspapd.service /lib/systemd/system
systemctl daemon-reload

systemctl enable raspapd.service

cp /var/www/html/config/hostapd.conf /etc/hostapd/hostapd.conf
cp /var/www/html/config/090_raspap.conf /etc/dnsmasq.d/090_raspap.conf
cp /var/www/html/config/090_wlan0.conf /etc/dnsmasq.d/090_wlan0.conf
cp /var/www/html/config/dhcpcd.conf /etc/dhcpcd.conf
cp /var/www/html/config/config.php /var/www/html/includes/
cp /var/www/html/config/defaults.json /etc/raspap/networking/

systemctl stop systemd-networkd
systemctl disable systemd-networkd

cp /var/www/html/config/raspap-bridge-br0.netdev /etc/systemd/network/raspap-bridge-br0.netdev
cp /var/www/html/config/raspap-br0-member-eth0.network /etc/systemd/network/raspap-br0-member-eth0.network 

sed -i -E 's/^session\.cookie_httponly\s*=\s*(0|([O|o]ff)|([F|f]alse)|([N|n]o))\s*$/session.cookie_httponly = 1/' /etc/php/8.1/cgi/php.ini
sed -i -E 's/^;?opcache\.enable\s*=\s*(0|([O|o]ff)|([F|f]alse)|([N|n]o))\s*$/opcache.enable = 1/' /etc/php/8.1/cgi/php.ini
phpenmod opcache

echo "net.ipv4.ip_forward=1" | tee /etc/sysctl.d/90_raspap.conf > /dev/null

sysctl -p /etc/sysctl.d/90_raspap.conf

/etc/init.d/procps restart

iptables -t nat -A POSTROUTING -j MASQUERADE

# PRECISA MUDAR ISSO!
iptables -t nat -A POSTROUTING -s 192.168.10.0/24 ! -d 192.168.10.0/24 -j MASQUERADE

iptables-save | tee /etc/iptables/rules.v4

systemctl unmask hostapd.service
systemctl enable hostapd.service

# Finished!
echo "Reboot your system."
