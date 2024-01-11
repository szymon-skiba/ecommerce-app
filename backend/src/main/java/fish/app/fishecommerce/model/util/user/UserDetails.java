package fish.app.fishecommerce.model.util.user;

import java.util.List;

public record UserDetails(
                Long id,
                String email,
                List<String> roles) {
}