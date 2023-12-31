package fish.app.fishecommerce.model.entity;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.Data;

@Data
@Entity
public class Fish {
    @Id
    @GeneratedValue(strategy=GenerationType.AUTO)
    private Long id;
    private String name;
    private Integer price;
    private Double weightRangeFrom;
    private Double weightRangeTo;
    private Double amount;

    @Column(columnDefinition="TEXT")
    private String description; 

}
