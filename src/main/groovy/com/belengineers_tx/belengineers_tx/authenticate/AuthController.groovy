package com.belengineers_tx.belengineers_tx.authenticate

import org.springframework.http.*
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder
import org.springframework.web.bind.annotation.*

@RestController
@RequestMapping("/auth")
@CrossOrigin(origins = "http://localhost:3000")
class AuthController {

    private BCryptPasswordEncoder passwordEncoder = new BCryptPasswordEncoder()

    private final UserService userService
    private final TokenService tokenService

    AuthController(UserService userService, TokenService tokenService) {
        this.userService = userService
        this.tokenService = tokenService
    }

    @PostMapping("/login")
    ResponseEntity<?> login(@RequestBody Map<String, String> credentials) {
        String username = credentials.get("username")
        String password = credentials.get("password")

        def user = userService.findUserByUsername(username)

        if (user && passwordEncoder.matches(password, user.password)) {
            String token = tokenService.generateToken(user) // Generate token
            boolean firstLogin = user.firstLogin // Check if this is the first login
            return ResponseEntity.ok([token: token, firstLogin: firstLogin])
        } else {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Invalid credentials")
        }
    }

    @PostMapping("/reset-password")
    ResponseEntity<String> resetPassword(@RequestHeader("Authorization") String token, @RequestBody PasswordResetRequest request) {
        try {
            // Validate the token and get the associated user
            def user = tokenService.validateTokenAndGetUser(token)
            if (!user) {
                return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Invalid token")
            }

            // Validate the old password
            if (!userService.verifyPassword(user, request.oldPassword)) {
                return ResponseEntity.status(HttpStatus.FORBIDDEN).body("Invalid current password")
            }

            // Validate new password strength (if needed)
            if (!isValidPassword(request.newPassword)) {
                return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("New password does not meet security requirements")
            }

            // Update the password
            userService.updatePassword(user, request.newPassword)

            // Mark first login as completed
            user.firstLogin = false

            // Save the updated user
            userService.saveUser(user)

            return ResponseEntity.ok("Password reset successful")
        } catch (Exception e) {
            // Log the exception (optional) and return a generic error message
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("An error occurred while resetting the password")
        }
    }

    private static boolean isValidPassword(String password) {
        // Implement password validation logic, such as length and complexity checks
        return password?.length() >= 8  // Example check for minimum length
    }
}
