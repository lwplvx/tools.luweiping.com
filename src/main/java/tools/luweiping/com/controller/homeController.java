package tools.luweiping.com.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;

import javax.servlet.http.HttpServletRequest;

/**
 * Created by lwplvx on 2017/6/5.
 */

@Controller

@RequestMapping("/")
public class homeController {


    /*
    * 1.获取请求host
StringBuffer url = request.getRequestURL();
String tempContextUrl = url.delete(url.length() - request.getRequestURI().length(), url.length()).toString();
2.获取静态页的相对路径
String path=request.getSession().getServletContext().getRealPath("相对路径");
    *
    * */

    @RequestMapping("/")
    public String index(HttpServletRequest request) {
        String vieName="/index";

       // StringBuffer url = request.getRequestURL();
       // String tempContextUrl = url.delete(url.length() - request.getRequestURI().length(), url.length()).toString();

        String hostName=request.getServerName() ;//request.getRemoteHost();
        String prefix=hostName.substring(0,hostName.indexOf('.'));

        switch (prefix)
        {
            case "base64":
                vieName="/base64/index";
                break;
            case "md5":
                vieName="/md5/index";
                break;
            case "ip":
                vieName="/ip/index";
                break;
        }

        return vieName;
    }

}
