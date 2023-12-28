package fish.app.fishecommerce.controller;


import fish.app.fishecommerce.model.dto.FishDTO;
import fish.app.fishecommerce.model.util.crud.*;
import fish.app.fishecommerce.model.util.PagedResult;
import fish.app.fishecommerce.service.FishService;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

import java.net.URI;

@RestController
@RequestMapping("/api/v1/fish")
public class FishController {

    private final FishService fishService;

    public FishController(FishService fishService){
        this.fishService = fishService;
    }

    @GetMapping()
    public ResponseEntity<PagedResult<FishDTO>> findAll(
            @RequestParam(name = "page", defaultValue = "1") Integer pageNo,
            @RequestParam(name = "size", defaultValue = "10") Integer pageSize){
        FindFishQuery findFishQuery = new FindFishQuery(pageNo, pageSize);
        return ResponseEntity.ok().body(fishService.findAll(findFishQuery));
    }

    @PostMapping
    public ResponseEntity<FishDTO> create(@RequestBody @Validated CreateFishRequest request){
        CreateFishCommand cmd = new CreateFishCommand(
                request.name(),
                request.price(),
                request.weightRangeFrom(),
                request.weightRangeTo(),
                request.amount(),
                request.description()
        );

        FishDTO fish = fishService.create(cmd);

        URI location = ServletUriComponentsBuilder
                .fromCurrentRequest()
                .path("/api/v1/fish/{id}")
                .buildAndExpand(fish.getId()).toUri();

        return ResponseEntity.created(location).body(fish);
    }

    @PutMapping("/{id}")
    public void update(@PathVariable(name="id") Long id,
                @RequestBody @Validated UpdateFishRequest request){
        UpdateFishCommand cmd = new UpdateFishCommand(
                request.id(),
                request.name(),
                request.price(),
                request.weightRangeFrom(),
                request.weightRangeTo(),
                request.amount(),
                request.description()
        );
        fishService.update(cmd);
    }

    @GetMapping("/{id}")
    public ResponseEntity<FishDTO> findById(@PathVariable(name = "id") Long id){
        return fishService.findById(id)
                .map(ResponseEntity::ok)
                .orElseGet(()->ResponseEntity.notFound().build());
    }

    @DeleteMapping("/{id}")
    public void delete(@PathVariable(name = "id") Long id) {
        fishService.delete(id);
    }
}
