package com.cars.a2.services;

import com.cars.a2.exceptions.EntityFailedToSaveException;
import com.cars.a2.exceptions.EntityNotFoundException;
import com.cars.a2.models.Users;
import com.cars.a2.repositories.UsersRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.util.List;


@Service
public class UsersService {

    private static final Logger logger = LoggerFactory.getLogger(UsersService.class);

    private UsersRepository usersRepository;

    public UsersService(UsersRepository usersRepository) {
        this.usersRepository = usersRepository;
    }

    public ResponseEntity<Object> saveUser(Users users) {
        try {
            usersRepository.save(users);
            return new ResponseEntity<>("New user saved!", HttpStatus.OK);
        } catch (Exception e) {
            logger.info(e.getMessage());
            throw new EntityFailedToSaveException("User couldn't be saved!");
        }
    }

    public ResponseEntity<Object> getUser(String filter, String filterType) {
        switch (filterType) {
            case "name":
                List<Users> users = usersRepository.findByFullNameContaining(filter).orElseThrow(() -> new EntityNotFoundException("Users are not found by name!"));
                return new ResponseEntity<>(users, HttpStatus.OK);
            case "city":
                List<Users> usersByCity = usersRepository.findByCityContaining(filter).orElseThrow(() -> new EntityNotFoundException("Users are not found by city!"));
                return new ResponseEntity<>(usersByCity, HttpStatus.OK);
        }
        return null;
    }

    public ResponseEntity<Object> updateUser(Users users) {
        try {
            usersRepository.save(users);
            return new ResponseEntity<>("User is updated!", HttpStatus.OK);
        } catch (Exception e) {
            logger.info(e.getMessage());
            throw new EntityFailedToSaveException("User couldn't be updated!");
        }
    }

    public ResponseEntity<Object> deleteUser(long id) {
        try {
            usersRepository.deleteById(id);
            return new ResponseEntity<>("User is deleted!", HttpStatus.OK);
        } catch (Exception e) {
            logger.info(e.getMessage());
            throw new EntityNotFoundException("User coudn't be deleted!");
        }
    }

}
