package com.belengineers_tx.belengineers_tx.entity

import jakarta.persistence.*
import org.springframework.validation.annotation.Validated

import java.time.LocalDateTime

@Entity
@Table(name = "customer_message", schema = "public")
class UserMessage {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    Long id

    String userName
    String email
    String phone
    String message

    LocalDateTime createTimestamp
}
