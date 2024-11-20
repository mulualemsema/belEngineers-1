package com.belengineers_tx.belengineers_tx.service


import com.belengineers_tx.belengineers_tx.entity.UserMessage
import com.belengineers_tx.belengineers_tx.exception.MessageNotFoundException
import com.belengineers_tx.belengineers_tx.repository.MessageRepository
import jakarta.transaction.Transactional
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.stereotype.Service

import java.time.LocalDateTime

@Service
class MessageService {

    @Autowired
    MessageRepository messageRepository

    MessageService(MessageRepository messageRepository) {
        this.messageRepository = messageRepository
    }

    @Transactional
    UserMessage saveMessage(UserMessage message) {
        message.createTimestamp = LocalDateTime.now()
        messageRepository.save(message)
    }

    UserMessage getMessageById(Long id) {
        messageRepository.findById(id)
                .orElseThrow { -> new MessageNotFoundException("UserMessage not found with id $id") }
    }

    List<UserMessage> getAllMessages() {
        messageRepository.findAll()
    }

    UserMessage updateMessage(Long id, UserMessage updatedMessage) {
        def existingMessage = getMessageById(id)
        existingMessage.userName = updatedMessage.userName
        existingMessage.email = updatedMessage.email
        existingMessage.phone = updatedMessage.phone
        existingMessage.message = updatedMessage.message
        messageRepository.save(existingMessage)
    }

    void deleteMessage(Long id) {
        messageRepository.deleteById(id)
    }
}
