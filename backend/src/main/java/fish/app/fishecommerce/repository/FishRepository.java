package fish.app.fishecommerce.repository;
import org.springframework.data.domain.Example;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import fish.app.fishecommerce.model.entity.Fish;

import java.util.List;

@Repository
public interface FishRepository extends JpaRepository<Fish,Long> {

}
