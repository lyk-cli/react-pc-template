FROM nginx
MAINTAINER HanKeQi
VOLUME /tmp
ADD dist /usr/share/nginx/html/dist
#COPY default.conf /etc/nginx/conf.d/
EXPOSE 80
