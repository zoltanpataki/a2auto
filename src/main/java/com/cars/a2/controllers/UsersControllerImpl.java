package com.cars.a2.controllers;

import com.cars.a2.controllers.apis.UsersController;
import com.cars.a2.models.Users;
import com.cars.a2.services.UsersService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class UsersControllerImpl implements UsersController {

    private static final Logger LOGGER = LoggerFactory.getLogger(UsersControllerImpl.class);

    private UsersService usersService;

    public UsersControllerImpl(UsersService usersService) {
        this.usersService = usersService;
    }

    @Override
    public ResponseEntity<Object> saveUser(Users users) {
        return usersService.saveUser(users);
    }

    @Override
    public ResponseEntity<Object> getUser(String filter, String filterType) {
        return usersService.getUser(filter, filterType);
    }

    @Override
    public ResponseEntity<Object> updateUser(Users users) {
        return usersService.updateUser(users);
    }

    @Override
    public ResponseEntity<Object> deleteUser(long id) {
        return usersService.deleteUser(id);
    }
}
