package com.test.Reporter.services;

import com.google.gson.JsonElement;
import com.google.gson.JsonObject;
import org.springframework.stereotype.Service;

@Service
public class ReduxStoreService {

    public JsonElement initReduxStore() {
        JsonObject store = new JsonObject();

        JsonObject reports = new JsonObject();

        store.add("reports", reports);

        return store;
    }
}
