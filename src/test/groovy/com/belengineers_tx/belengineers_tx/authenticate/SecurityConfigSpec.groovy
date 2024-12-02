package com.belengineers_tx.belengineers_tx.authenticate

import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder
import org.springframework.security.crypto.password.PasswordEncoder
import spock.lang.Specification

class SecurityConfigSpec extends Specification {

    def "passwordEncoder bean should return a BCryptPasswordEncoder instance"() {
        given:
        def securityConfig = new SecurityConfig()

        when:
        PasswordEncoder passwordEncoder = securityConfig.passwordEncoder()

        then:
        passwordEncoder instanceof BCryptPasswordEncoder
    }

    def "BCryptPasswordEncoder should correctly encode and match passwords"() {
        given:
        def securityConfig = new SecurityConfig()
        def passwordEncoder = securityConfig.passwordEncoder()
        def rawPassword = "my_secure_password"

        when:
        def encodedPassword = passwordEncoder.encode(rawPassword)

        then:
        encodedPassword != rawPassword // The encoded password should be different from the raw password
        passwordEncoder.matches(rawPassword, encodedPassword) // The raw password should match the encoded password
    }

    def "BCryptPasswordEncoder should produce different encodings for the same password due to salting"() {
        given:
        def securityConfig = new SecurityConfig()
        def passwordEncoder = securityConfig.passwordEncoder()
        def rawPassword = "my_secure_password"

        when:
        def encodedPassword1 = passwordEncoder.encode(rawPassword)
        def encodedPassword2 = passwordEncoder.encode(rawPassword)

        then:
        encodedPassword1 != encodedPassword2 // BCrypt should produce different results for the same input due to salting
    }
}

