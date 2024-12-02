package com.belengineers_tx.belengineers_tx.api

import com.belengineers_tx.belengineers_tx.entity.UserMessage
import com.belengineers_tx.belengineers_tx.service.MessageService
import org.springframework.test.web.servlet.MockMvc
import spock.lang.Specification
import java.time.LocalDateTime
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*
import static org.springframework.test.web.servlet.setup.MockMvcBuilders.standaloneSetup

class MessageControllerSpec extends Specification {

    private final MessageService messageService = Mock()
    private final MessageController messageController = new MessageController(
            messageService
    )
    private final MockMvc mockMvc = standaloneSetup(messageController).build()

    def "should save message successfully"() {
        given:
        // Create a sample UserMessage with mock data
        UserMessage message = new UserMessage(
                userName: "John Doe",
                email: "johndoe@example.com",
                phone: "1234567890",
                message: "Test message",
                createTimestamp: LocalDateTime.now()
        )

        // Mock the service call to return the same message
        messageService.saveMessage(message) >> message

        when:
        // Perform the POST request with the necessary JSON payload
        def response = mockMvc.perform(post("/api/messages/posting")
                .contentType("application/json")
                .content('{"userName":"John Doe","email":"johndoe@example.com","phone":"1234567890","message":"Test message","createTimestamp":"2024-12-02T12:34:56"}'))

        then:
        response.andExpect(status().isOk())
    }

    def "should get all messages"() {
        given:
        // Create some sample messages
        List<UserMessage> messages = [
                new UserMessage(id: 1L, userName: "Alice", email: "alice@example.com", phone: "5551234", message: "Message 1", createTimestamp: LocalDateTime.now()),
                new UserMessage(id: 2L, userName: "Bob", email: "bob@example.com", phone: "5555678", message: "Message 2", createTimestamp: LocalDateTime.now())
        ]
        // Mock the service to return the list of messages
        messageService.getAllMessages() >> messages

        when:
        def response = mockMvc.perform(get("/api/messages/reading"))

        then:
        // Verify that the response contains both messages and their details
        response.andExpect(status().isOk())
                .andExpect(jsonPath('$[0].userName').value("Alice"))
                .andExpect(jsonPath('$[0].message').value("Message 1"))
                .andExpect(jsonPath('$[1].userName').value("Bob"))
                .andExpect(jsonPath('$[1].message').value("Message 2"))
    }

}
