package com.cars.a2.controllers;

import com.cars.a2.exceptions.ConnectionTemporarilyLostException;
import com.cars.a2.exceptions.EntityFailedToSaveException;
import com.cars.a2.exceptions.UnexpectedBehaviourException;
import org.apache.tomcat.util.http.fileupload.servlet.ServletRequestContext;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.boot.web.servlet.error.ErrorController;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;

import javax.servlet.ServletContext;
import javax.servlet.http.HttpServletResponse;

@Controller
public class CustomErrorController implements ErrorController {

    private static Logger logger = LoggerFactory.getLogger(CustomErrorController.class);

    @RequestMapping("/error")
    public void handleErrorMapping(HttpServletResponse httpServletResponse) {
        if (httpServletResponse.getStatus() == 503) {
            logger.info("There is no database connection!");
            throw new ConnectionTemporarilyLostException("There is no database connection at the moment!");
        } else if (httpServletResponse.getStatus() == 500) {
            logger.info("The data is not desired therefore the save cannot be made!");
            throw new EntityFailedToSaveException("Wrong data arrived!");
        } else {
            logger.info("Unexpected behaviour of the application, error controller!");
            throw new UnexpectedBehaviourException("The application behaves unexpectedly!");
        }
    }

    @Override
    public String getErrorPath() {
        return null;
    }
}
