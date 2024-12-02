package com.belengineers_tx.belengineers_tx.authenticate

import io.jsonwebtoken.*
import io.jsonwebtoken.security.Keys
import org.springframework.stereotype.Component
import javax.crypto.SecretKey

@Component
class TokenUtil {

    // Secret key for signing JWTs (ensure it's long enough for HMAC)
    private static final String JWT_SECRET = '$2a$12$DZpajYaXlbfSu9AHj8mmLOJHlarMceLck1xYv.gzKWz1sx4wMcU5W'

    // Token expiration time (e.g., 1 hour)
    private static final long JWT_EXPIRATION_TIME = 60 * 60 * 1000L

    // SecretKey instance for signing
    private final SecretKey secretKey = Keys.hmacShaKeyFor(JWT_SECRET.getBytes())

    // Generate JWT token
    String generateToken(String username) {
        return Jwts.builder()
                .setSubject(username) // Store username in 'sub' (subject) claim
                .setIssuedAt(new Date()) // Token issue date
                .setExpiration(new Date(System.currentTimeMillis() + JWT_EXPIRATION_TIME)) // Expiration date
                .signWith(secretKey, SignatureAlgorithm.HS256) // Sign the token with HS256 algorithm
                .compact()
    }

    // Extract username from token
    String getUsernameFromToken(String token) {
        try {
            Claims claims = Jwts.parserBuilder()
                    .setSigningKey(secretKey)
                    .build()
                    .parseClaimsJws(token)
                    .getBody()
            return claims.getSubject() // Extract 'sub' (subject) claim as username
        } catch (ExpiredJwtException e) {
            throw new RuntimeException("Token has expired", e)
        } catch (MalformedJwtException e) {
            throw new RuntimeException("Invalid token", e)
        } catch (SignatureException e) {
            throw new RuntimeException("Token signature does not match", e)
        } catch (Exception e) {
            throw new RuntimeException("Error parsing token", e)
        }
    }

    // Validate token (optional, if additional checks are needed)
    boolean validateToken(String token, String username) {
        String extractedUsername = getUsernameFromToken(token)
        return extractedUsername.equals(username) && !isTokenExpired(token)
    }

    // Check if the token has expired
    private boolean isTokenExpired(String token) {
        try {
            Date expiration = Jwts.parserBuilder()
                    .setSigningKey(secretKey)
                    .build()
                    .parseClaimsJws(token)
                    .getBody()
                    .getExpiration()
            return expiration.before(new Date())
        } catch (ExpiredJwtException e) {
            return true
        } catch (Exception e) {
            throw new RuntimeException("Error checking token expiration", e)
        }
    }
}
