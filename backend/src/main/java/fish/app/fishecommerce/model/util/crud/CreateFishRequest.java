package fish.app.fishecommerce.model.util.crud;

public record CreateFishRequest(
        String name,
        Integer price,
        Double weightRangeFrom,
        Double weightRangeTo,
        Double amount,
        String description
) {
}
