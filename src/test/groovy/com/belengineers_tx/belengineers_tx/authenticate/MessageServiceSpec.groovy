package com.belengineers_tx.belengineers_tx.authenticate

import com.belengineers_tx.belengineers_tx.entity.UserMessage
import com.belengineers_tx.belengineers_tx.exception.MessageNotFoundException
import com.belengineers_tx.belengineers_tx.repository.MessageRepository
import com.belengineers_tx.belengineers_tx.service.MessageService
import spock.lang.Specification

import java.time.LocalDateTime


class MessageServiceSpec extends Specification {

    def messageRepository = Mock(MessageRepository)
    def messageService = new MessageService(messageRepository)

    def "saveMessage should save a UserMessage with current timestamp"() {
        given:
        def message = new UserMessage(
                userName: "John Doe",
                email: "john.doe@example.com",
                phone: "1234567890",
                message: "Test message"
        )

        when:
        def savedMessage = messageService.saveMessage(message)

        then:
        1 * messageRepository.save(_) >> { UserMessage msg ->
            assert msg.createTimestamp != null
            assert msg.createTimestamp.isBefore(LocalDateTime.now().plusSeconds(1))
            return msg
        }
        1 * messageRepository.flush()
        savedMessage == message
    }

    def "getMessageById should return the message if found"() {
        given:
        def message = new UserMessage(id: 1L, userName: "John Doe", email: "john.doe@example.com", message: "Test message")
        messageRepository.findById(1L) >> Optional.of(message)

        when:
        def result = messageService.getMessageById(1L)

        then:
        result == message
    }

    def "getMessageById should throw MessageNotFoundException if not found"() {
        given:
        messageRepository.findById(1L) >> Optional.empty()

        when:
        messageService.getMessageById(1L)

        then:
        thrown(MessageNotFoundException)
    }

    def "getAllMessages should return all messages"() {
        given:
        def messages = [
                new UserMessage(id: 1L, userName: "John Doe", email: "john.doe@example.com", message: "Message 1"),
                new UserMessage(id: 2L, userName: "Jane Smith", email: "jane.smith@example.com", message: "Message 2")
        ]
        messageRepository.findAllMessages() >> messages

        when:
        def result = messageService.getAllMessages()

        then:
        result == messages
    }

    def "updateMessage should update an existing message"() {
        given:
        def existingMessage = new UserMessage(id: 1L, userName: "John Doe", email: "john.doe@example.com", message: "Old message")
        def updatedMessage = new UserMessage(userName: "Jane Smith", email: "jane.smith@example.com", message: "Updated message")

        messageRepository.findById(1L) >> Optional.of(existingMessage)

        when:
        messageService.updateMessage(1L, updatedMessage)

        then:
        1 * messageRepository.save(_) >> { UserMessage msg ->
            assert msg.userName == "Jane Smith"
            assert msg.email == "jane.smith@example.com"
            assert msg.message == "Updated message"
            return msg
        }
    }

    def "deleteMessage should delete a message by id"() {
        when:
        messageService.deleteMessage(1L)

        then:
        1 * messageRepository.deleteById(1L)
    }
}

