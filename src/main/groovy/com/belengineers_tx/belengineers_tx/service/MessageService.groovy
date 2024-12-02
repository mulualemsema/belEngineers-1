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
        // Ensure createTimestamp is set to the current time
        message.setCreateTimestamp(LocalDateTime.now())

        // Save the message entity to the database
        UserMessage savedMessage = messageRepository.save(message)

        // Optional: Flush to ensure the data is immediately persisted
        messageRepository.flush()  // Ensures the transaction is written to the DB

        return savedMessage  // Return the saved message (optional, but useful)
    }

    UserMessage getMessageById(Long id) {
        messageRepository.findById(id)
                .orElseThrow { -> new MessageNotFoundException("UserMessage not found with id ${id}") }
    }

    List<UserMessage> getAllMessages() {
        messageRepository.findAllMessages()
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
