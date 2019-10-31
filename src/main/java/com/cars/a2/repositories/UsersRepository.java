package com.cars.a2.repositories;

import com.cars.a2.models.Users;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface UsersRepository extends JpaRepository<Users, Long> {
    Optional<List<Users>> findByFullNameContaining(String name);
    Optional<List<Users>> findByCityContaining(String city);
}
