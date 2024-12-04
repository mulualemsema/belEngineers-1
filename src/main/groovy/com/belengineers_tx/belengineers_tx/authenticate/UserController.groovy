package com.belengineers_tx.belengineers_tx.authenticate

import org.springframework.web.bind.annotation.CrossOrigin
import org.springframework.web.bind.annotation.PostMapping
import org.springframework.web.bind.annotation.RequestBody
import org.springframework.web.bind.annotation.RequestHeader
import org.springframework.web.bind.annotation.RequestMapping
import org.springframework.web.bind.annotation.RestController

@RestController
@RequestMapping("/api/users")
class UserController {

    private final UserService userService

    UserController(UserService userService) {
        this.userService = userService
    }

    @PostMapping("/login")
    Map<String, String> login(@RequestBody Map<String, String> payload) {
        String username = payload['username']
        String password = payload['password']
        String token = userService.login(username, password)
        return [token: token]
    }

    @PostMapping("/reset-password")
    void resetPassword(@RequestHeader("Authorization") String token, @RequestBody Map<String, String> payload) {
        String newPassword = payload['newPassword']
        userService.resetPassword(token.replace("Bearer ", ""), newPassword)
    }
}

