package com.belengineers_tx.belengineers_tx.entity

import jakarta.persistence.*
import java.time.LocalDateTime

@Entity
@Table(name = "customer_message")
class UserMessage {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id", nullable = false, unique = true)
    Long id

    @Column(name = "user_name")
    String userName
    @Column(name = "email")
    String email
    @Column(name = "phone")
    String phone
    @Column(name = "message")
    String message

    @Column(name = "create_timestamp", nullable = false)
    LocalDateTime createTimestamp
}
