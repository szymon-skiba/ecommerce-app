package fish.app.fishecommerce.controller;

import fish.app.fishecommerce.model.dto.FishDTO;
import fish.app.fishecommerce.model.entity.User;
import fish.app.fishecommerce.model.util.PagedResult;
import fish.app.fishecommerce.model.util.fish.*;
import fish.app.fishecommerce.model.util.user.UserDetails;
import fish.app.fishecommerce.service.FishService;
import fish.app.fishecommerce.service.UserService;

import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

import java.net.URI;

@RestController
@RequestMapping("/api/v1/user")
public class UserController {

    private final UserService userService;

    public UserController(UserService userService) {
        this.userService = userService;
    }

    @GetMapping()
    public ResponseEntity<PagedResult<UserDetails>> findAll(
            @RequestParam(name = "page", defaultValue = "1") Integer pageNo,
            @RequestParam(name = "size", defaultValue = "10") Integer pageSize) {
        return ResponseEntity.ok().body(userService.findAll(pageNo - 1, pageSize));
    }

    @GetMapping("/details")
    public ResponseEntity<UserDetails> details(@RequestHeader(name = "Authorization") String token) {
        return ResponseEntity.ok().body(userService.details(token));

    }

    @DeleteMapping("/{id}")
    @PreAuthorize("hasRole('ADMIN')")
    public void delete(@PathVariable(name = "id") Long id) {
        userService.delete(id);
    }
}
