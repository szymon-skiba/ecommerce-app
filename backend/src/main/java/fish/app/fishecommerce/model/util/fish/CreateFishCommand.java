package fish.app.fishecommerce.model.util.fish;

public record CreateFishCommand(
        String name,
        Integer price,
        Double weightRangeFrom,
        Double weightRangeTo,
        Double amount,
        String description
) {
}
