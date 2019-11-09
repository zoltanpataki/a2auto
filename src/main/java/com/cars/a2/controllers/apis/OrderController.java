package com.cars.a2.controllers.apis;

import com.cars.a2.models.Order;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
public interface OrderController {

    @PostMapping("/saveOrder")
    ResponseEntity<Object> saveOrder(@RequestBody Order order);

    @GetMapping("/getOrder")
    ResponseEntity<Object> getOrder(@RequestParam Long carId);

    @PutMapping("/updateOrder")
    ResponseEntity<Object> updateOrder(@RequestBody Order order);

    @DeleteMapping("/deleteOrder/{id}")
    ResponseEntity<Object> deleteOrder(@PathVariable Long id);
}
