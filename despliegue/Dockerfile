FROM jboss/wildfly:17.0.0.Final

ENV WILDFLY_MODULES /opt/jboss/wildfly/modules/system/layers/base/org
ENV POSTGRES_VERSION 42.2.19

USER root

RUN yum -y update
RUN localedef -i es_PY -f UTF-8 es_PY.UTF-8
RUN echo "LANG=\"es_PY.UTF-8\"" > /etc/locale.conf
RUN ln -s -f /usr/share/zoneinfo/America/Asuncion /etc/localtime

RUN mkdir -p ${WILDFLY_MODULES}/postgresql/main

ADD postgresql-$POSTGRES_VERSION.jar ${WILDFLY_MODULES}/postgresql/main
ADD module.xml ${WILDFLY_MODULES}/postgresql/main
ADD mifactura.war    /opt/jboss/wildfly/standalone/deployments

USER jboss

ENV LANG es_PY.UTF-8
ENV LANGUAGE es_PY.UTF-8
ENV LC_ALL es_PY.UTF-8


# Expose the ports we're interested in
EXPOSE 8080
EXPOSE 8443

# Set the default command to run on boot
# This will boot WildFly in the standalone mode and bind to all interface
CMD ["/opt/jboss/wildfly/bin/standalone.sh", "-b", "0.0.0.0"]