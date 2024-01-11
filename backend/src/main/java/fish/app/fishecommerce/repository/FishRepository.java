package fish.app.fishecommerce.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import fish.app.fishecommerce.model.entity.Fish;

@Repository
public interface FishRepository extends JpaRepository<Fish, Long> {

}
