package com.belengineers_tx.belengineers_tx.authenticate

import spock.lang.Specification
import io.jsonwebtoken.Jwts
import io.jsonwebtoken.security.Keys

class TokenUtilSpec extends Specification {

    def "generateToken should create a valid JWT token"() {
        given: "A TokenUtil instance and a username"
        TokenUtil tokenUtil = new TokenUtil()
        String username = "testUser"

        // Extract the SecretKey used for signing from the TokenUtil instance
        def secretKey = Keys.hmacShaKeyFor(TokenUtil.JWT_SECRET.getBytes())

        when: "A token is generated"
        String token = tokenUtil.generateToken(username)

        then: "The token is not null and contains the username in claims"
        token != null
        def claims = Jwts.parserBuilder()
                .setSigningKey(secretKey)
                .build()
                .parseClaimsJws(token)
                .getBody()
        claims.sub == username
    }

    def "getUsernameFromToken should extract the correct username"() {
        given: "A TokenUtil instance and a token"
        TokenUtil tokenUtil = new TokenUtil()
        String username = "testUser"
        String token = tokenUtil.generateToken(username)

        when: "The username is extracted from the token"
        String extractedUsername = tokenUtil.getUsernameFromToken(token)

        then: "The extracted username matches the original username"
        extractedUsername == username
    }

    def "validateToken should return true for a valid token"() {
        given: "A TokenUtil instance and a valid token"
        TokenUtil tokenUtil = new TokenUtil()
        String username = "testUser"
        String token = tokenUtil.generateToken(username)

        when: "The token is validated"
        boolean isValid = tokenUtil.validateToken(token, username)

        then: "The token is valid"
        isValid
    }

    def "getUsernameFromToken should throw an exception for a malformed token"() {
        given: "A TokenUtil instance and a malformed token"
        TokenUtil tokenUtil = new TokenUtil()
        String malformedToken = "invalid.token.string"

        when: "An attempt is made to extract the username"
        tokenUtil.getUsernameFromToken(malformedToken)

        then: "An exception is thrown"
        thrown(RuntimeException)
    }
}

