package fish.app.fishecommerce.model.util;

public record ServiceResponse<T>(
        T data,
        Boolean success,
        String message) {
}
