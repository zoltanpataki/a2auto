package com.cars.a2.services;

import com.cars.a2.exceptions.EntityFailedToSaveException;
import com.cars.a2.exceptions.EntityNotFoundException;
import com.cars.a2.models.Orders;
import com.cars.a2.repositories.OrderRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

@Service
public class OrderService {

    private static final Logger logger = LoggerFactory.getLogger(OrderService.class);

    private OrderRepository orderRepository;

    public OrderService(OrderRepository orderRepository) {
        this.orderRepository = orderRepository;
    }

    public ResponseEntity<Object> saveNewOrder(Orders orders) {
        try {
            Orders savedOrder = orderRepository.saveAndFlush(orders);

            return new ResponseEntity<>(savedOrder, HttpStatus.OK);
        } catch (Exception e) {
            logger.info(e.getMessage());
            throw new EntityFailedToSaveException("Order couldn't be saved!");
        }
    }

    public ResponseEntity<Object> getSingleOrder(Long carId) {
        try {
            Orders orderByCarId = orderRepository.findByCarId(carId).orElseThrow(() -> new EntityNotFoundException("Order is not found by id!"));
            return new ResponseEntity<>(orderByCarId, HttpStatus.OK);
        } catch (Exception e) {
            throw new EntityNotFoundException("Order is not found by carId!");
        }
    }

    public ResponseEntity<Object> updateOrder(Orders orders) {
        try {
            Orders updatedOrder = orderRepository.saveAndFlush(orders);
            return new ResponseEntity<>(updatedOrder, HttpStatus.OK);
        } catch (Exception e) {
            logger.info(e.getMessage());
            throw new EntityFailedToSaveException("Order couldn't be updated!");
        }
    }

    public ResponseEntity<Object> deleteOrder(Long id) {
        try {
            orderRepository.deleteById(id);
            return new ResponseEntity<>("Order is deleted!", HttpStatus.OK);
        } catch (Exception e) {
            logger.info(e.getMessage());
            throw new EntityNotFoundException("Order couldn't be deleted!");
        }
    }
}
