package com.mifacturaportal.web;

import org.hibernate.dialect.*;
import org.hibernate.engine.jdbc.dialect.spi.DialectResolutionInfo;
import org.hibernate.engine.jdbc.dialect.spi.DialectResolver;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

public class CustomDialectResolver implements DialectResolver {

    private static final Logger log = LoggerFactory.getLogger(CustomDialectResolver.class);

    private static final long serialVersionUID = 1L;

    @Override
    public Dialect resolveDialect(DialectResolutionInfo info) {

        System.err.println("CustomDialecResolver");

        log.info("databaseName = {}, majorVersion = {}, minorVersion = {}", info.getDatabaseName(),
                info.getDatabaseMajorVersion(), info.getDatabaseMinorVersion());

        if ("Microsoft SQL Server".equals(info.getDatabaseName())) {
            return new SQLServer2012Dialect();
        } else if ("MySQL".equals(info.getDatabaseName())) {
            return new MySQL57Dialect();
        } else if ("PostgreSQL".equals(info.getDatabaseName())) {
            return new PostgreSQL9Dialect();
        } else if ("Oracle".equals(info.getDatabaseName())){
            return new Oracle12cDialect();
        }

        throw new RuntimeException("Base de datos no soportada!!!");
    }

}