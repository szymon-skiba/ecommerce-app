package fish.app.fishecommerce.model.util.crud;

public record UpdateFishRequest(
        Long id,
        String name,
        Integer price,
        Double weightRangeFrom,
        Double weightRangeTo,
        Double amount,
        String description
) {
}
