package com.cars.a2.controllers.apis;

import com.cars.a2.models.Users;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
public interface UsersController {

    @PostMapping("/saveUser")
    ResponseEntity<Object> saveUser(@RequestBody Users users);

    @GetMapping("/getUser")
    ResponseEntity<Object> getUser(@RequestParam String filter, @RequestParam String filterType);

    @PutMapping("/updateUser")
    ResponseEntity<Object> updateUser(@RequestBody Users users);

    @DeleteMapping("/deleteUser/{id}")
    ResponseEntity<Object> deleteUser(@PathVariable long id);
}
