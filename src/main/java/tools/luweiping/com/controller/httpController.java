package tools.luweiping.com.controller;

import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import util.HttpRequest;

/**
 * Created by lwplvx on 2017/6/5.
 */

@RestController

@RequestMapping("/proxy")
public class httpController {

    @RequestMapping("/get/{url}")
    public String proxyGet(@PathVariable("url") String url) {
        String res = HttpRequest.sendGet(url, "");

        return res;
    }

}
