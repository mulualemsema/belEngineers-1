package com.belengineers_tx.belengineers_tx.authenticate

import io.jsonwebtoken.ExpiredJwtException
import io.jsonwebtoken.MalformedJwtException
import jakarta.transaction.Transactional
import org.springframework.security.crypto.password.PasswordEncoder
import org.springframework.stereotype.Service

import java.security.SignatureException
import java.time.LocalDateTime

@Service
@Transactional
class UserService {

    private final UserRepository userRepository
    private final PasswordEncoder passwordEncoder
    private final TokenUtil tokenUtil

    UserService(UserRepository userRepository, PasswordEncoder passwordEncoder, TokenUtil tokenUtil) {
        this.userRepository = userRepository
        this.passwordEncoder = passwordEncoder
        this.tokenUtil = tokenUtil
    }

    // Handle login process
    Map login(String username, String password) {
        def user = userRepository.findByUsername(username)
                .orElseThrow { new RuntimeException("User not found") }

        if (!passwordEncoder.matches(password, user.password)) {
            throw new RuntimeException("Invalid credentials")
        }

        // Generate token
        String token = tokenUtil.generateToken(user.username)

        // Check if it's the user's first login
        if (user.firstLogin) {
            return [
                    firstLogin: true,
                    token     : token,
                    message   : "Password reset required on first login"
            ]
        }

        return [
                firstLogin: false,
                token     : token
        ]
    }

// Reset password for first login
    void resetPassword(String token, String newPassword) {
        try {
            // Validate token and extract username
            String username = tokenUtil.getUsernameFromToken(token);

            // Find the user by username
            User user = userRepository.findByUsername(username)
                    .orElseThrow(() -> new RuntimeException("User not found"));

            // Check if the user is required to reset their password
            if (user.isFirstLogin()) {
                // Update the user's password and other fields
                user.setPassword(passwordEncoder.encode(newPassword));
                user.setFirstLogin(false);
                user.setUpdatedAt(LocalDateTime.now());

                // Save the updated user to the database
                userRepository.save(user);
            } else {
                throw new RuntimeException("Password reset is not required for this user.");
            }
        } catch (ExpiredJwtException e) {
            throw new RuntimeException("Token has expired. Please log in again.", e);
        } catch (MalformedJwtException e) {
            throw new RuntimeException("Invalid token. Please log in again.", e);
        } catch (SignatureException e) {
            throw new RuntimeException("Token signature is invalid.", e);
        } catch (Exception e) {
            throw new RuntimeException("An error occurred during password reset.", e);
        }
    }
}