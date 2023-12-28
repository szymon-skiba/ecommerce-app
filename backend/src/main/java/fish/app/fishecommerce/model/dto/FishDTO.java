package fish.app.fishecommerce.model.dto;

import lombok.Data;

@Data
public class FishDTO {
    private Long id;
    private String name;
    private Integer price;
    private Double weightRangeFrom;
    private Double weightRangeTo;
    private Double amount;
    private String description;
}
