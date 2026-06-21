package com.foodieexpress.controller;

import com.foodieexpress.model.User;
import com.foodieexpress.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.Map;
import java.util.Optional;

@RestController
@RequestMapping("/api")
public class UserController {

    @Autowired
    private UserRepository userRepository;

    @PostMapping("/register")
    public ResponseEntity<?> registerUser(@RequestBody User user) {
        if (userRepository.findByEmail(user.getEmail()).isPresent()) {
            Map<String, String> response = new HashMap<>();
            response.put("message", "Email already registered!");
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(response);
        }
        if (user.getRole() == null || user.getRole().isEmpty()) {
            user.setRole("USER");
        }
        userRepository.save(user);
        Map<String, String> response = new HashMap<>();
        response.put("message", "User registered successfully!");
        return ResponseEntity.status(HttpStatus.CREATED).body(response);
    }

    @PostMapping("/login")
    public ResponseEntity<?> loginUser(@RequestBody User loginRequest) {
        Optional<User> userOptional = userRepository.findByEmail(loginRequest.getEmail());
        if (userOptional.isPresent()) {
            User user = userOptional.get();
            // In a real application, you should hash passwords and compare hashes
            if (user.getPassword().equals(loginRequest.getPassword())) {
                Map<String, Object> response = new HashMap<>();
                response.put("message", "Login successful!");
                response.put("user", user);
                return ResponseEntity.ok(response);
            }
        }
        Map<String, String> response = new HashMap<>();
        response.put("message", "Invalid email or password!");
        return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(response);
    }
}
