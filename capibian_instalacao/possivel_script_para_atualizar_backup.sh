#!/bin/bash

# cria script que atualiza schaves ssh e hostname
touch /root/fr.sh
echo -e "#!/bin/bash\n" > /root/fr.sh
echo -e "# seta novo nome\nnumero_al=`tr -dc 0-9 < /dev/urandom  | head -c 5`\nnovo_nome=\"capibian-\"\${numero_al}\nhostnamectl set-hostname \${novo_nome}\n" >> /root/fr.sh
echo -e "# atualizar chaves ssh\nrm /etc/ssh/ssh_host*\nssh-keygen -A -N \"\"\n" >> /root/fr.sh
echo -e "# remover inicialização automática desse script\nrm /etc/cron.d/fr\nshutdown -r now" >> /root/fr.sh

# cria cron job para executar no próximo reboot
touch /etc/cron.d/fr
echo "SHELL=/bin/sh" > /etc/cron.d/fr
echo "PATH=/usr/local/sbin:/usr/local/bin:/sbin:/bin:/usr/sbin:/usr/bin" >> /etc/cron.d/fr
echo "@reboot root bash /root/fr.sh" >> /etc/cron.d/fr
