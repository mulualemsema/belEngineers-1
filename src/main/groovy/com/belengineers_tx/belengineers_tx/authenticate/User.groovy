package com.belengineers_tx.belengineers_tx.authenticate

import jakarta.persistence.*

import java.time.LocalDateTime

@Entity
@Table(name = "users")
class User {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    Long id

    @Column(unique = true, nullable = false)
    String username

    @Column(nullable = false)
    String password

    @Column(name = "first_login", nullable = false)
    boolean firstLogin = true // Default to true for new users

    @Column(name = "created_at", nullable = false)
    LocalDateTime createdAt

    @Column(name = "updated_at", nullable = false)
    LocalDateTime updatedAt
}

