package fish.app.fishecommerce.service;

import fish.app.fishecommerce.config.JwtService;
import fish.app.fishecommerce.exception.FishNotFoundException;
import fish.app.fishecommerce.model.util.PagedResult;
import fish.app.fishecommerce.model.util.user.UserDetails;
import fish.app.fishecommerce.model.entity.User;
import fish.app.fishecommerce.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class UserService {

    private final UserRepository userRepository;

    @Autowired
    private final JwtService jwtService;

    public UserService(UserRepository userRepository, JwtService jwtService) {
        this.jwtService = jwtService;
        this.userRepository = userRepository;
    }

    public PagedResult<UserDetails> findAll(int pageNo, int pageSize) {
        Pageable pageable = PageRequest.of(pageNo, pageSize);
        Page<User> page = userRepository.findAll(pageable);

        List<UserDetails> users = new ArrayList<>();
        for (User user : page.getContent()) {
            List<String> roles = user.getRoles().stream().map(role -> role.getName())
                    .collect(Collectors.toList());
            users.add(new UserDetails(user.getId(), user.getEmail(), roles));
        }
        return new PagedResult<UserDetails>(
                users,
                page.getTotalElements(),
                page.getNumber() + 1,
                page.getTotalPages(),
                page.isFirst(),
                page.isLast(),
                page.hasNext(),
                page.hasPrevious());
    }

    public UserDetails details(String token) {

        String jwt = token.substring(7);
        String email = jwtService.extractUsername(jwt);

        Optional<User> user = userRepository.findByEmail(email);

        if (user.isPresent()) {
            List<String> roles = user.get().getRoles().stream().map(role -> role.getName())
                    .collect(Collectors.toList());

            return new UserDetails(user.get().getId(), user.get().getEmail(), roles);

        } else {
            throw new RuntimeException("User not found");
        }
    }

    @Transactional
    public void delete(Long id) {
        User user = userRepository.findById(id)
                .orElseThrow(() -> FishNotFoundException.of(id));
        userRepository.delete(user);
    }
}
