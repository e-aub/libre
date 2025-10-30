package com.libre;

import java.util.TimeZone;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@SpringBootApplication
public class LibreApplication {

	public static void main(String[] args) {
        TimeZone.setDefault(TimeZone.getTimeZone("UTC"));
		SpringApplication.run(LibreApplication.class, args);
	}

};


@RestController
class HelloController {

    @GetMapping("/hello")
    @PreAuthorize("hasRole('USER')") 
    public String sayHello() {
        return "Hello";
    }
}


