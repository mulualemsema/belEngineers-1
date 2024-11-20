package com.belengineers_tx.belengineers_tx.repository

import com.belengineers_tx.belengineers_tx.entity.UserMessage
import org.springframework.data.jpa.repository.JpaRepository
import org.springframework.stereotype.Repository

@Repository
interface MessageRepository extends JpaRepository<UserMessage, Long> {
}
