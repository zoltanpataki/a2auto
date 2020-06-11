package com.cars.a2.controllers.apis;

import com.cars.a2.models.Orders;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
public interface OrderController {

    @PostMapping("/saveOrder")
    ResponseEntity<Object> saveOrder(@RequestBody Orders orders);

    @GetMapping("/getOrder")
    ResponseEntity<Object> getOrder(@RequestParam Long carId);

    @PutMapping("/updateOrder")
    ResponseEntity<Object> updateOrder(@RequestBody Orders orders);

    @DeleteMapping("/deleteOrder/{id}")
    ResponseEntity<Object> deleteOrder(@PathVariable Long id);
}
