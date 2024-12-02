package com.belengineers_tx.belengineers_tx.authenticate

import spock.lang.Specification
import org.springframework.http.HttpHeaders
import org.springframework.test.web.servlet.MockMvc
import org.springframework.test.web.servlet.request.MockMvcRequestBuilders
import org.springframework.test.web.servlet.result.MockMvcResultMatchers
import static org.springframework.test.web.servlet.setup.MockMvcBuilders.standaloneSetup


class UserControllerSpec extends Specification {

    private final UserService userService = Mock()  // Mocking the UserService
    private final UserController userController = new UserController(userService)  // Injecting the mock UserService
    private final MockMvc mockMvc = standaloneSetup(userController).build()  // Setup MockMvc with UserController

    def "should reset password when valid token and new password provided"() {
        given: "A valid authorization token and new password"
        String token1 = "valid.jwt.token"

        // Mocking the userService.resetPassword method to verify token and password
        userService.resetPassword(_, _) >> { String token, String password ->
            assert token == "valid.jwt.token"
            assert password == "newpassword123"
        }

        when: "The /reset-password endpoint is called with a valid token and new password"
        mockMvc.perform(MockMvcRequestBuilders.post("/api/users/reset-password")
                .header(HttpHeaders.AUTHORIZATION, "Bearer $token1")
                .contentType("application/json")
                .content('{"newPassword": "newpassword123"}'))
                .andExpect(MockMvcResultMatchers.status().isOk())

        then: "The reset password method should be called with correct token and password"
        noExceptionThrown()
    }
}
