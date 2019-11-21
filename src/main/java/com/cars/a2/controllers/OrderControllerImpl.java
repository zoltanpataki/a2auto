package com.cars.a2.controllers;

import com.cars.a2.controllers.apis.OrderController;
import com.cars.a2.models.Order;
import com.cars.a2.services.OrderService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class OrderControllerImpl implements OrderController {

    private static final Logger LOGGER = LoggerFactory.getLogger(OrderControllerImpl.class);

    private OrderService orderService;

    public OrderControllerImpl(OrderService orderService) {
        this.orderService = orderService;
    }

    @Override
    public ResponseEntity<Object> saveOrder(Order order) {
        System.out.println(order.toString());
        return orderService.saveNewOrder(order);
    }

    @Override
    public ResponseEntity<Object> getOrder(Long carId) {
        return orderService.getSingleOrder(carId);
    }

    @Override
    public ResponseEntity<Object> updateOrder(Order order) {
        return orderService.updateOrder(order);
    }

    @Override
    public ResponseEntity<Object> deleteOrder(Long id) {
        return orderService.deleteOrder(id);
    }
}
