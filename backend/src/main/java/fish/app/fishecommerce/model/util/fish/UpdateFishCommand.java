package fish.app.fishecommerce.model.util.fish;

public record UpdateFishCommand(
        Long id,
        String name,
        Integer price,
        Double weightRangeFrom,
        Double weightRangeTo,
        Double amount,
        String description
) {
}
