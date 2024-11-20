package com.belengineers_tx.belengineers_tx.api


import com.belengineers_tx.belengineers_tx.entity.UserMessage
import com.belengineers_tx.belengineers_tx.service.MessageService
import org.springframework.http.ResponseEntity
import org.springframework.web.bind.annotation.DeleteMapping
import org.springframework.web.bind.annotation.GetMapping
import org.springframework.web.bind.annotation.PathVariable
import org.springframework.web.bind.annotation.PostMapping
import org.springframework.web.bind.annotation.PutMapping
import org.springframework.web.bind.annotation.RequestBody
import org.springframework.web.bind.annotation.RequestMapping
import org.springframework.web.bind.annotation.RestController

@RestController
@RequestMapping("/api/messages")
class MessageController {

    private final MessageService messageService

    MessageController(MessageService messageService) {
        this.messageService = messageService
    }

    @PostMapping("/posting")
    ResponseEntity<UserMessage> saveMessage(@RequestBody UserMessage message) {
        ResponseEntity.ok(messageService.saveMessage(message))
    }

    @GetMapping("/{id}")
    ResponseEntity<UserMessage> getMessage(@PathVariable Long id) {
        ResponseEntity.ok(messageService.getMessageById(id))
    }

    @GetMapping("/reading")
    ResponseEntity<List<UserMessage>> getAllMessages() {
        ResponseEntity.ok(messageService.getAllMessages())
    }

    @PutMapping("/{id}")
    ResponseEntity<UserMessage> updateMessage(@PathVariable Long id, @RequestBody UserMessage message) {
        ResponseEntity.ok(messageService.updateMessage(id, message))
    }

    @DeleteMapping("/{id}")
    ResponseEntity<Void> deleteMessage(@PathVariable Long id) {
        messageService.deleteMessage(id)
        ResponseEntity.noContent().build()
    }
}
