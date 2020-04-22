package com.test.Reporter.controllers;

import com.google.gson.JsonElement;
import com.test.Reporter.services.ReduxStoreService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/reduxStore")
public class ReduxStoreController {

    private ReduxStoreService reduxStoreService;

    @Autowired
    public void ReduxStoreService(ReduxStoreService reduxStoreService){
        this.reduxStoreService = reduxStoreService;
    }

    @RequestMapping("/init")
    public JsonElement initReduxStore(){
        return reduxStoreService.initReduxStore();
    }


}
