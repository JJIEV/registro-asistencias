package com.mifacturaportal.config;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.core.env.Environment;
import org.springframework.data.jpa.repository.config.EnableJpaRepositories;
import org.springframework.jdbc.datasource.DriverManagerDataSource;
import org.springframework.jndi.JndiObjectFactoryBean;
import org.springframework.orm.jpa.JpaTransactionManager;
import org.springframework.orm.jpa.LocalContainerEntityManagerFactoryBean;
import org.springframework.orm.jpa.vendor.HibernateJpaVendorAdapter;
import org.springframework.transaction.PlatformTransactionManager;
import org.springframework.transaction.annotation.EnableTransactionManagement;

import javax.naming.NamingException;
import javax.sql.DataSource;
import java.util.Arrays;
import java.util.HashMap;
import java.util.Map;

@Configuration
@EnableTransactionManagement
@EnableJpaRepositories(entityManagerFactoryRef = "mifacturaPortalEntityManager", transactionManagerRef = "mifacturaPortalTransactionManager",
        basePackages = "com.mifacturaportal.dao")
public class PortalDBConfig {

    @Autowired
    private Environment env;


    @Bean
    public DataSource mifacturaPortalDataSource() throws NamingException {
        if (Arrays.asList(env.getActiveProfiles()).contains("DEV")){
            DriverManagerDataSource dataSource = new DriverManagerDataSource();
            dataSource.setUrl(env.getProperty("spring.datasource1.url"));
            dataSource.setUsername(env.getProperty("spring.datasource1.username"));
            dataSource.setPassword(env.getProperty("spring.datasource1.password"));
            dataSource.setDriverClassName(env.getProperty("spring.datasource1.driver-class-name"));
            return dataSource;
        }else{
            JndiObjectFactoryBean bean = new JndiObjectFactoryBean();
            bean.setJndiName(env.getProperty("portal.config.datasource.jndiname"));
            bean.setProxyInterface(DataSource.class);
            bean.setLookupOnStartup(false);
            bean.afterPropertiesSet();
            return (DataSource) bean.getObject();
        }
    }

    @Bean
    public LocalContainerEntityManagerFactoryBean mifacturaPortalEntityManager() throws NamingException {
        LocalContainerEntityManagerFactoryBean em = new LocalContainerEntityManagerFactoryBean();
        em.setDataSource(mifacturaPortalDataSource());
        em.setPackagesToScan("com.mifacturaportal.domain.registro");

        HibernateJpaVendorAdapter vendorAdapter = new HibernateJpaVendorAdapter();
        em.setJpaVendorAdapter(vendorAdapter);

        Map<String, Object> properties = new HashMap<>();
        properties.put("hibernate.dialect_resolvers", "com.mifacturaportal.web.CustomDialectResolver");

        em.setJpaPropertyMap(properties);

        return em;

    }


    @Bean
    public PlatformTransactionManager mifacturaPortalTransactionManager() throws NamingException {
        JpaTransactionManager transactionManager = new JpaTransactionManager();
        transactionManager.setEntityManagerFactory(mifacturaPortalEntityManager().getObject());

        return transactionManager;
    }
}
