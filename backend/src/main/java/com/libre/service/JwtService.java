package com.libre.service;

import java.security.Key;
import java.util.Date;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import io.jsonwebtoken.security.Keys;

@Service

public class JwtService{
    @Value("${JWT_SECRET}")
    private  String jwtSecret;

    @Value("${JWT_EXPIRATION}")
    private long jwtExpiration;

    private Key key = Keys.hmacShaKeyFor(jwtSecret.getBytes());

    public String generateToken(String username, String role){
        return Jwts.builder()
        .setSubject(username)
        .claim("role",role)
        .setIssuedAt(new Date())
        .setExpiration(new Date(System.currentTimeMillis() + jwtExpiration))
        .signWith(key, SignatureAlgorithm.HS256)
        .compact();
    
    }
}