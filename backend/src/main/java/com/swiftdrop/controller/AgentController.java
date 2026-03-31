package com.swiftdrop.controller;

import com.swiftdrop.entity.Agent;
import com.swiftdrop.repository.AgentRepository;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/api/agents")
public class AgentController {

    private final AgentRepository agentRepository;

    public AgentController(AgentRepository agentRepository) {
        this.agentRepository = agentRepository;
    }

    @GetMapping
    public ResponseEntity<List<Agent>> getAllAgents() {
        return ResponseEntity.ok(agentRepository.findAll());
    }

    @PutMapping("/{id}")
    public ResponseEntity<Agent> updateAgentStatus(@PathVariable Long id, @RequestBody Agent updatedAgent) {
        Agent agent = agentRepository.findById(id).orElseThrow();
        agent.setStatus(updatedAgent.getStatus());
        return ResponseEntity.ok(agentRepository.save(agent));
    }
}
