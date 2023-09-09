package com.morgan.restaurant.controller;

import com.morgan.restaurant.model.State;
import com.morgan.restaurant.service.StateService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@CrossOrigin("http://localhost:4200")
@RequestMapping("/api/")
public class StateController {
    private StateService stateService;
    @Autowired
    public StateController(StateService stateService) {
        this.stateService = stateService;
    }

    @GetMapping("states")
    public List<State> getAllStates() {
        return stateService.getAllStates();
    }

    @GetMapping("statecode")
    public List<State> getStatesByCountryCode(@RequestParam String code) {
        return stateService.getStatesByCountryCode(code);
    }

}
