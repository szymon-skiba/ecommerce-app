package fish.app.fishecommerce.service;


import fish.app.fishecommerce.exception.FishNotFoundException;
import fish.app.fishecommerce.model.dto.FishDTO;
import fish.app.fishecommerce.model.entity.Fish;
import fish.app.fishecommerce.model.util.crud.CreateFishCommand;
import fish.app.fishecommerce.model.util.crud.FindFishQuery;
import fish.app.fishecommerce.model.util.PagedResult;
import fish.app.fishecommerce.model.util.crud.UpdateFishCommand;
import fish.app.fishecommerce.repository.FishRepository;

import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Optional;
import java.util.stream.Collectors;

@Service
@Transactional(readOnly = true)
public class FishService {

    @Autowired
    private ModelMapper modelMapper;
    private final FishRepository fishRepository;

    public FishService(FishRepository fishRepository){
        this.fishRepository = fishRepository;
    }

    public PagedResult<FishDTO> findAll(FindFishQuery query){
        Pageable pageable = PageRequest.of(query.pageNo(), query.pageSize());
        Page<Fish> page = fishRepository.findAll(pageable);
        return new PagedResult<FishDTO>(
                page.getContent().stream().map(res -> modelMapper.map(res,FishDTO.class)).collect(Collectors.toList()),
                page.getTotalElements(),
                page.getNumber()+1,
                page.getTotalPages(),
                page.isFirst(),
                page.isLast(),
                page.hasNext(),
                page.hasPrevious()
        );
    }

    @Transactional
    public FishDTO create(CreateFishCommand cmd){
        Fish fish = new Fish();
        fish.setName(cmd.name());
        fish.setPrice(cmd.price());
        fish.setAmount(cmd.amount());
        fish.setWeightRangeFrom(cmd.weightRangeFrom());
        fish.setWeightRangeTo(cmd.weightRangeTo());
        fish.setDescription(cmd.description());

        return modelMapper.map(fishRepository.save(fish),FishDTO.class);
    }

    @Transactional
    public void update(UpdateFishCommand cmd){
        Fish fish = fishRepository.findById(cmd.id()).orElseThrow(()-> FishNotFoundException.of(cmd.id()));
        fish.setName(cmd.name());
        fish.setPrice(cmd.price());
        fish.setAmount(cmd.amount());
        fish.setWeightRangeFrom(cmd.weightRangeFrom());
        fish.setWeightRangeTo(cmd.weightRangeTo());
        fish.setDescription(cmd.description());

        fishRepository.save(fish);
    }

    public Optional<FishDTO> findById(Long id) {
        return fishRepository.findById(id).map(fish -> modelMapper.map(fish, FishDTO.class));
    }


    @Transactional
    public void delete(Long id){
        Fish fish = fishRepository.findById(id)
                .orElseThrow(()-> FishNotFoundException.of(id));
        fishRepository.delete(fish);
    }
}
