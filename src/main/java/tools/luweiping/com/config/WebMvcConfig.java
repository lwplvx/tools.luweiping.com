package tools.lwp.com.config;

import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.EnableWebMvc;
import org.springframework.web.servlet.config.annotation.ResourceHandlerRegistry;
import org.springframework.web.servlet.config.annotation.ViewControllerRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurerAdapter;

/**
 * Created by lwplvx on 2017/6/5.
 */
@Configuration
@EnableWebMvc
public class WebMvcConfig extends WebMvcConfigurerAdapter{

    @Override
    public void addResourceHandlers(ResourceHandlerRegistry registry) {
        registry.addResourceHandler("/static/**").addResourceLocations("classpath:/static/");
        super.addResourceHandlers(registry);
    }

    @Override
    public void addViewControllers(ViewControllerRegistry registry) {

        // registry.addViewController("/base64").setViewName("/base64/index");
        // registry.addViewController("/md5").setViewName("/md5/index");
        // registry.addViewController("/ip").setViewName("/ip/index");
        // registry.addViewController("/json").setViewName("/json/index");

        super.addViewControllers(registry);
    }
}
