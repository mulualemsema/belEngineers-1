package com.belengineers_tx.belengineers_tx.authenticate

import org.springframework.data.jpa.repository.JpaRepository
import org.springframework.stereotype.Repository

@Repository
interface UserRepository extends JpaRepository<User, Long> {

    Optional<User> findByUsername(String username)
}

