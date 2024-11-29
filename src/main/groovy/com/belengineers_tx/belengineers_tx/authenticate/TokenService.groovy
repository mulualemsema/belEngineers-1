package com.belengineers_tx.belengineers_tx.authenticate

import org.springframework.beans.factory.annotation.Autowired
import org.springframework.stereotype.Service

@Service
class TokenService {

    @Autowired
    UserRepository userRepository

    private Map<String, User> tokenStore = [:] // Simple in-memory storage for tokens and users

    /**
     * Generate a token for the given user and store it.
     *
     * @param user The user for whom the token is generated.
     * @return The generated token.
     */
    String generateToken(User user) {
        String token = UUID.randomUUID().toString() // Generate a unique token
        tokenStore.put(token, user) // Store the token and associated user
        return token
    }

    /**
     * Validate the token and return the associated user.
     *
     * @param token The token to validate.
     * @return The associated User object if valid, or null if invalid.
     */
    User validateTokenAndGetUser(String token) {
        tokenStore.get(token) // Retrieve the user associated with the token
    }

    /**
     * Invalidate the token by removing it from the store.
     *
     * @param token The token to invalidate.
     */
    void invalidateToken(String token) {
        tokenStore.remove(token) // Remove the token from the store
    }
}

