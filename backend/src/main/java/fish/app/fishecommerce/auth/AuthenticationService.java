package fish.app.fishecommerce.auth;

import fish.app.fishecommerce.config.JwtService;
import fish.app.fishecommerce.model.entity.User;
import fish.app.fishecommerce.model.util.auth.AuthenticationRequest;
import fish.app.fishecommerce.model.util.auth.AuthenticationResponse;
import fish.app.fishecommerce.model.util.auth.RegisterRequest;
import fish.app.fishecommerce.repository.RoleRepository;
import fish.app.fishecommerce.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.json.JSONException;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.json.JSONObject;

import java.util.Base64;
import java.util.Collections;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class AuthenticationService {

        private final UserRepository userRepository;
        private final RoleRepository roleRepository;
        private final PasswordEncoder passwordEncoder;
        private final JwtService jwtService;
        private final AuthenticationManager authenticationManager;

        public AuthenticationResponse register(RegisterRequest request) {
                var user = User.builder()
                                .firstname(request.getFirstname())
                                .lastname(request.getLastname())
                                .email(request.getEmail())
                                .password(passwordEncoder.encode(request.getPassword()))
                                .roles(Collections.singletonList(roleRepository.findByName("ROLE_USER")))
                                .build();

                Optional<User> isUser = userRepository.findByEmail(request.getEmail());

                if (isUser.isPresent()) {
                        throw new RuntimeException("User already exists");
                }

                userRepository.save(user);

                var jwt = jwtService.generateToken(user);
                return AuthenticationResponse.builder()
                                .token(jwt)
                                .build();
        }

        public AuthenticationResponse authenticate(AuthenticationRequest request) {
                authenticationManager.authenticate(
                                new UsernamePasswordAuthenticationToken(
                                                request.getEmail(),
                                                request.getPassword()));

                var user = userRepository.findByEmail(request.getEmail()).orElseThrow();
                var jwt = jwtService.generateToken(user);

                return AuthenticationResponse.builder()
                                .token(jwt)
                                .build();
        }

        public AuthenticationResponse authenticateGoogle(String token) throws JSONException {
                String[] chunks = token.split("\\.");
                Base64.Decoder decoder = Base64.getUrlDecoder();
                String payload = new String(decoder.decode(chunks[1]));

                JSONObject payloadJson = new JSONObject(payload);
                String email = payloadJson.getString("email");

                return authenticate(new AuthenticationRequest(email, token));

        }

        public AuthenticationResponse registerGoogle(String token) throws JSONException {
                System.out.println(token);
                String[] chunks = token.split("\\.");
                Base64.Decoder decoder = Base64.getUrlDecoder();
                String payload = new String(decoder.decode(chunks[1]));

                JSONObject payloadJson = new JSONObject(payload);
                String email = payloadJson.getString("email");

                return register(new RegisterRequest(null, null, email, token));
        }
}
