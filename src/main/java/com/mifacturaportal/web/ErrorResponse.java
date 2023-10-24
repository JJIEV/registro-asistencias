package com.mifacturaportal.web;

import java.util.List;


public class ErrorResponse {
    public ErrorResponse(String message/*, List<String> details*/) {
        super();
        this.message = message;
        //this.details = details;
    }
  
    private String message;


    public String getMessage() {
        return this.message;
    }

    public void setMessage(String message) {
        this.message = message;
    }


}
