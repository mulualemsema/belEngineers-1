package com.belengineers_tx.belengineers_tx.authenticate

import org.springframework.beans.factory.annotation.Autowired
import org.springframework.security.crypto.password.PasswordEncoder
import org.springframework.stereotype.Service

@Service
class UserService {

    @Autowired
    UserRepository userRepository

    @Autowired
    PasswordEncoder passwordEncoder // For password hashing

    // Authenticate a user
    User authenticate(String username, String password) {
        Optional<User> userOpt = userRepository.findByUsername(username)
        if (userOpt.isPresent()) {
            User user = userOpt.get()
            // Verify password using PasswordEncoder
            if (passwordEncoder.matches(password, user.password)) {
                return user
            }
        }
        return null // Authentication failed
    }

    // Verify the user's current password
    boolean verifyPassword(User user, String currentPassword) {
        passwordEncoder.matches(currentPassword, user.password)
    }

    // Update the user's password
    void updatePassword(User user, String newPassword) {
        String encodedPassword = passwordEncoder.encode(newPassword)
        user.password = encodedPassword
        userRepository.save(user)
    }

    // Save or update a user
    void saveUser(User user) {
        userRepository.save(user) // Save user directly to the database
    }

    // Check if a user exists
    boolean userExists(String username) {
        userRepository.findByUsername(username).isPresent()
    }

    // Create a new user (for registration or initial setup)
    User createUser(String username, String password) {
        if (userExists(username)) {
            throw new IllegalArgumentException("User already exists")
        }
        User user = new User(username: username, password: passwordEncoder.encode(password))
        userRepository.save(user)
    }

    // Find a user by username
    User findUserByUsername(String username) {
        Optional<User> userOpt = userRepository.findByUsername(username)
        return userOpt.orElse(null) // Return user if found, otherwise null
    }
}
