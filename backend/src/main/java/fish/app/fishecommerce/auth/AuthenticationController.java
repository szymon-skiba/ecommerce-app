package fish.app.fishecommerce.auth;

import fish.app.fishecommerce.model.util.auth.AuthenticationRequest;
import fish.app.fishecommerce.model.util.auth.RegisterRequest;
import fish.app.fishecommerce.model.util.auth.AuthenticationResponse;
import fish.app.fishecommerce.model.util.auth.GoogleAuth;
import fish.app.fishecommerce.model.util.auth.GoogleRegister;
import lombok.RequiredArgsConstructor;

import java.util.Optional;

import org.json.JSONException;
import org.springframework.http.HttpHeaders;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/v1/auth")
@RequiredArgsConstructor
public class AuthenticationController {

    private final AuthenticationService service;

    @PostMapping("/register")
    public ResponseEntity<AuthenticationResponse> register(
            @RequestBody RegisterRequest request) {
        return ResponseEntity.ok(service.register(request));
    }

    @PostMapping("/authenticate")
    public ResponseEntity<AuthenticationResponse> authenticate(
            @RequestBody AuthenticationRequest request) {
        return ResponseEntity.ok(service.authenticate(request));
    }

    @PostMapping("/google/register")
    public ResponseEntity<AuthenticationResponse> register(
            @RequestBody GoogleRegister token) throws JSONException {
        return ResponseEntity.ok(service.registerGoogle(token.getCredential()));
    }

    @PostMapping("/google/authenticate")
    public ResponseEntity<AuthenticationResponse> authenticate(
            @RequestBody GoogleAuth token) throws JSONException {
        return ResponseEntity.ok(service.authenticateGoogle(token.getCredential()));
    }

}
