package fish.app.fishecommerce.model.util.crud;

public record CreateFishCommand(
        String name,
        Integer price,
        Double weightRangeFrom,
        Double weightRangeTo,
        Double amount,
        String description
) {
}
